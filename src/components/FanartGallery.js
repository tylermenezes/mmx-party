import { useReducer, useEffect } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import fetch from 'node-fetch';
import useSwr from 'swr';
import { Box } from '@chakra-ui/react';

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export default function FanartGallery({ duration, ...rest }) {
  const { data } = useSwr(
    '/api/fanart',
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, refreshInterval: 60000 },
  );

  const [image, nextImage] = useReducer(
    () => data ? data[Math.floor(Math.random() * data.length)] : {},
    {}
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(nextImage, duration);
    return () => clearInterval(interval);
  }, [typeof window, duration, nextImage]);

  if (!image?.images) return <></>; // TODO(@tylermenezes)

  return (
    <Box width="100%" height="100%" {...rest}>
      <TransitionGroup style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Transition key={image.images.preview} timeout={duration}>
          {(state) => (
            <Box
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              height="100%"
              width="100%"
              transition="opacity 1s ease-in-out"
              backgroundColor="black"
              {...transitionStyles[state]}
            >
              <Box
                position="relative"
                backgroundImage={`url(${image.images.preview})`}
                backgroundSize="contain"
                backgroundPosition="50% 50%"
                backgroundRepeat="no-repeat"
                width="100%"
                height="100%"
              >
                <Box
                  position="absolute"
                  bottom="calc(-2.1em + 1px)"
                  right="-4px"
                  fontSize="2vh"
                  color="white"
                  p={1}
                  textTransform="uppercase"
                >
                  By {image?.credit}
                </Box>
              </Box>
            </Box>
          )}
        </Transition>
      </TransitionGroup>
    </Box>
  );
}
