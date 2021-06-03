import { Box } from '@chakra-ui/react';
import Logo from '../components/Logo';
import Counters from '../components/Counters';
import Sidebar from '../components/Sidebar';

export default function IndexPage() {

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      backgroundImage="/streamoverlay.png"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="50% 50%"
      width="100%"
      height="100%"
    >
      <Logo />
      <Counters />
      <Sidebar />
    </Box>
  )
}
