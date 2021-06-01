import { Box } from '@chakra-ui/react';

export default function OverlayPage() {

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
    />
  )
}
