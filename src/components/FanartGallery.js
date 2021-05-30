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
    (url) => fetch(url).then((res) => res.json())
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
              {...transitionStyles[state]}
            >
              <Box
                position="relative"
                backgroundImage={`url(${image.images.preview})`}
                backgroundSize="cover"
                backgroundPosition="50% 50%"
                backgroundRepeat="no-repeat"
                width="100%"
                height="100%"
              >
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  fontSize="2vh"
                  backgroundColor="black"
                  color="white"
                  p={1}
                  textTransform="uppercase"
                >
                  {image?.credit}
                </Box>
              </Box>
            </Box>
          )}
        </Transition>
      </TransitionGroup>
    </Box>
  );
}
