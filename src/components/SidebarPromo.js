import { Box, Image, Text } from '@chakra-ui/react';
export default function SidebarPromo() {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      right={0}
      left={0}
      color="white"
      fontSize="xl"
      textAlign="center"
    >
      <Text fontSize="3xl" lineHeight={2}>join the party @</Text>
      <Text fontSize="4xl">discord.gg/wintergatan</Text>
      <Image mt={16} src="/machine.png" w="100%" />
    </Box>
  )
}
