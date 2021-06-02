import useSwr from 'swr';
import ObsNinja from './ObsNinja';

export default function CadStream({ ...rest }) {
  const { data } = useSwr(
    '/api/cadstream',
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, refreshInterval: 60000 },
  );

  return (
    <ObsNinja
      streamId={data?.cadTeamId || 'RuyZpKN'}
      {...rest}
    />
  );
}
