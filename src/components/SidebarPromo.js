import { Box, Image } from '@chakra-ui/react';
export default function SidebarPromo() {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      right={0}
      left={0}
      color="white"
      fontSize="5xl"
      textAlign="center"
    >
      <Image src="/wikihelp.png" w="100%" />
    </Box>
  )
}
