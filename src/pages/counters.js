import { Box } from '@chakra-ui/react';
import Counters from '../components/Counters';

export default function CountersPage() {

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
      <Counters />
    </Box>
  )
}
