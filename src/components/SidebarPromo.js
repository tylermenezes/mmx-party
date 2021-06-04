import { useReducer, useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
export default function SidebarPromo({ displayed }) {
  const promos = [
    (
      <>
        <Text fontSize="3xl" lineHeight={2}>Join the party @</Text>
        <Text fontSize="3xl">discord.gg/wintergatan</Text>
      </>
    ),
    (
      <>
        <Text fontSize="lg" lineHeight={2} mt={8} color="white">Help fill in the wiki while you watch!</Text>
        <Text fontSize="3xl" color="white">tinyurl.com/ MMXPartyWiki</Text>
      </>
    ),
    (
      <>
        <Text fontSize="2xl" lineHeight={2}>See a marble on the floor?</Text>
        <Text fontSize="3xl">tinyurl.com/ MMXPartyWiki</Text>
      </>
    ),
    (
      <>
        <Text fontSize="2xl" lineHeight={2}>For best quality watch @</Text>
        <Text fontSize="2xl">twitch.tv/ wintergatan_community</Text>
      </>
    )
  ]
  const [promo, randomPromo] = useReducer(() => promos[Math.floor(Math.random() * promos.length)], promos[0]);

  useEffect(() => {
    if (typeof window === 'undefined' || !displayed) return;
    randomPromo();
  }, [typeof window, displayed]);

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
      fontFamily="sans-serif"
      fontWeight="bold"
    >
      {promo}
      <Image mt={16} src="/machine.png" w="100%" />
    </Box>
  )
}
