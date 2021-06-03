import { useReducer, useMemo } from 'react';
import useSwr from 'swr';
import CountUp from 'react-countup';
import { Box, Image } from '@chakra-ui/react';

export default function Counters({ ...rest }) {
  const [lastData, setLastData] = useReducer((prev, [k, v]) => ({ ...prev, [k]: v}), { washers: 0, wilsons: 0, marbles: 0 });
  const { data } = useSwr(
    '/api/counters',
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, refreshInterval: 15000 },
  );

  return useMemo(() => (
    <Box
      top={0}
      right={0}
      bottom={0}
      left={0}
      backgroundImage="/tape.png"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="50% 50%"
      width="100%"
      height="100%"
    >
      <Box position="absolute" bottom="5vh" left="1vw" right="1vw" pt="0.5vh" height="4vh" fontSize="5vh" {...rest}>
        <Box position="relative">
          <Box position="absolute" left="15vw" width="13vw" textAlign="center">
            {data?.washers ? <CountUp start={lastData.washers} end={data.washers} onEnd={() => setLastData(['washers', data.washers])} /> : '???'}
          </Box>
          <Box position="absolute" marginTop="-0.5vh" left="45vw" width="10vw" textAlign="center">
            {data?.washers ? <CountUp start={lastData.wilsons} end={data.wilsons} onEnd={() => setLastData(['wilsons', data.wilsons])} /> : '???'}
          </Box>
          <Box position="absolute" left="81vw" width="11vw" textAlign="center">
            {data?.washers ? <CountUp start={lastData.marbles} end={data.marbles} onEnd={() => setLastData(['marbles', data.marbles])} /> : '???'}
          </Box>
        </Box>
      </Box>
    </Box>
  ), [data?.washers, data?.wilsons, data?.marbles]);
}
