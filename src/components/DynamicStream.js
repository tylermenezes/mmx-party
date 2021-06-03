import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import ObsNinja from './ObsNinja';

export default function CadStream({ of, ...rest }) {
  const { query } = useRouter();
  const [lastGoodConfig, setLastGoodConfig] = useState(null);
  const { data } = useSwr(
    `/api/streams?key=${query?.key || ''}`,
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, refreshInterval: 60000 },
  );

  useEffect(() => {
    if (data && of in data) {
      setLastGoodConfig(data[of]);
    }
  }, [data, of]);

  if (!lastGoodConfig) return <></>;

  return (
    <ObsNinja
      {...lastGoodConfig}
      {...rest}
    />
  );
}
