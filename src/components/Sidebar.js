import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Logo from './Logo';
import FanartGallery from './FanartGallery';
import SidebarPromo from './SidebarPromo';
import CadStream from './CadStream';

export default function Sidebar({ ...rest }) {
  const [displayed, setDisplayed] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (displayed === 'cad') return;
    setDisplayed('promo');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setTransitioning(true);
    setTimeout(() => setTransitioning(false), 1000);
  }, [typeof window, setTransitioning, displayed]);

  useEffect(() => {
    if (typeof window === 'undefined' || !['promo', 'fanart'].includes(displayed)) return;
    const next = () => setDisplayed(displayed === 'promo' ? 'fanart' : 'promo');
    const timeout = setTimeout(next, displayed === 'promo' ? 20000 : 30000);
    return () => clearTimeout(timeout);
  }, [typeof window, setDisplayed, displayed]);

  return (
    <Box position="absolute" top="7vh" left="77vw" right="2vw" bottom="2vh" {...rest}>
      <Logo mb="3vh" />
      <Box position="relative">
        <Box
          transition="opacity 1s ease-in-out"
          opacity={displayed === 'cad' && !transitioning ? 1 : 0}
          width="100%"
          position="absolute"
          top={0}
          height="40vh"
        >
          <Box fontSize="4xl" color="white">CAD MODEL</Box>
          <Box
            borderWidth={4}
            borderColor="rgba(255, 255, 255, 0.7)"
          >
            <Box bg="black" height="40vh">
              <CadStream
                onStreamStarted={() => setDisplayed('cad')}
                onStreamStopped={() => setDisplayed('promo')}
                height="40vh"
              />
            </Box>
          </Box>
        </Box>

        <Box
          transition="opacity 1s ease-in-out"
          opacity={displayed === 'fanart' && !transitioning ? 1 : 0}
          width="100%"
          position="absolute"
          top={0}
        >
          <Box fontSize="4xl" color="white">FAN ART</Box>
          <Box
            borderWidth={4}
            borderColor="rgba(255, 255, 255, 0.7)"
          >
            <FanartGallery height="30vh" bg="white" duration={5000} />
          </Box>
        </Box>

        <Box
          transition="opacity 1s ease-in-out"
          opacity={displayed === 'promo' && !transitioning ? 1 : 0}
        >
          <SidebarPromo />
        </Box>
      </Box>
    </Box>
  );
}
