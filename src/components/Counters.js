import { useReducer, useMemo } from 'react';
import useSwr from 'swr';
import CountUp from 'react-countup';
import { Box } from '@chakra-ui/react';

export default function Counters({ ...rest }) {
  const [lastData, setLastData] = useReducer((prev, [k, v]) => ({ ...prev, [k]: v}), { washers: 0, wilsons: 0, marbles: 0 });
  const { data } = useSwr(
    '/api/counters',
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, refreshInterval: 5000 },
  );

  return useMemo(() => (
    <Box position="absolute" top="1vh" left="1vw" right="1vw" height="6vh" bg="blue.700" color="white" fontSize="3xl" {...rest}>
      <Box position="relative">
        <Box position="absolute" left={0}>
          Washers: {data?.washers ? <CountUp start={lastData.washers} end={data.washers} onEnd={() => setLastData(['washers', data.washers])} /> : '???'}
        </Box>
        <Box position="absolute" left="33.3vw">
          Wilsons: {data?.washers ? <CountUp start={lastData.wilsons} end={data.wilsons} onEnd={() => setLastData(['wilsons', data.wilsons])} /> : '???'}
        </Box>
        <Box position="absolute" left="66.6vw">
          Marbles: {data?.washers ? <CountUp start={lastData.marbles} end={data.marbles} onEnd={() => setLastData(['marbles', data.marbles])} /> : '???'}
        </Box>
      </Box>
    </Box>
  ), [data?.washers, data?.wilsons, data?.marbles]);
}
