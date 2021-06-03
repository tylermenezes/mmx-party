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
    <Box position="absolute" top="1vh" left="1vw" right="1vw" pt="0.5vh" height="4vh" color="white" fontSize="4xl" {...rest}>
      <Box position="relative">
        <Box position="absolute" left={0}>
          <Image h="1em" mr={4} d="inline-block" src="/washers.png" />
          {data?.washers ? <CountUp start={lastData.washers} end={data.washers} onEnd={() => setLastData(['washers', data.washers])} /> : '???'}
        </Box>
        <Box position="absolute" left="33.3vw">
          <Image h="1em" mr={4} d="inline-block" src="/wilsons.png" />
          {data?.washers ? <CountUp start={lastData.wilsons} end={data.wilsons} onEnd={() => setLastData(['wilsons', data.wilsons])} /> : '???'}
        </Box>
        <Box position="absolute" left="66.6vw">
          <Image h="1em" mr={4} d="inline-block" src="/floormarbles.png" />
          {data?.washers ? <CountUp start={lastData.marbles} end={data.marbles} onEnd={() => setLastData(['marbles', data.marbles])} /> : '???'}
        </Box>
      </Box>
    </Box>
  ), [data?.washers, data?.wilsons, data?.marbles]);
}
