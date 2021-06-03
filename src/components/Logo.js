import { useEffect, useState } from 'react';
import { Box, Image } from "@chakra-ui/react";

export default function Logo({ ...rest }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timeout = setTimeout(() => setIsAnimating(!isAnimating), isAnimating ? 3000 : 20000);
    return () => clearTimeout(timeout);
  }, [typeof window, isAnimating]);

  return (
    <Box position="absolute" top={0} left="3.2vw" height="11vh" textAlign="center" {...rest}>
      <Image src={isAnimating ? `/logo.gif` : `/logo_static.gif`} height="100%" d="inline-block" />
    </Box>
  );
}
