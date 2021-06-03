import { Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Logo from '../components/Logo';

export default function SidebarPage() {

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      width="100%"
      height="100%"
    >
      <Logo />
      <Sidebar />
    </Box>
  )
}
