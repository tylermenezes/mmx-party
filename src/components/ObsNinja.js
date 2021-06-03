import { useState, useEffect, useRef, useMemo } from 'react';
import { Box } from '@chakra-ui/react';

function encodeUriAttributes(obj) {
  if (!obj) return '';
  return Object.keys(obj)
    .filter((k) => typeof obj[k] !== 'undefined' && obj[k] !== null && obj[k] !== false)
    .map((k) => `${encodeURIComponent(k)}${obj[k] !== true ? `=${encodeURIComponent(obj[k])}` : ''}`)
    .join('&');
}

export default function ObsNinja({ streamId, roomId, roomPassword, streamAttributes, onStreamStarted, onStreamStopped, ...rest }) {
  const [streamStarted, setStreamStarted] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (typeof window === 'undefined' || !ref?.current) return;

    const getStats = () => ref.current.contentWindow.postMessage({ getStats: true }, '*');
    const onMessageRecieved = ({ source, data }) => {
      if (source !== ref.current.contentWindow) return;

      if (data?.action === 'new-view-connection') getStats();
      else if ('stats' in data) {
        const streamStartedNow = data.stats.total_inbound_connections > 0;
        if (streamStartedNow !== streamStarted) {
          if (streamStartedNow) onStreamStarted && onStreamStarted();
          else onStreamStopped && onStreamStopped();
          setStreamStarted(streamStartedNow);
        }
      }
    }
    getStats();
    const interval = setInterval(getStats, 3000);

    window.addEventListener('message', onMessageRecieved);
    return () => {
      window.removeEventListener('message', onMessageRecieved);
      window.clearInterval(interval);
    }
  }, [typeof window, ref, streamStarted]);

  return useMemo(() => (
    <Box
      as="iframe"
      src={`https://obs.ninja/?${encodeUriAttributes({
        cleanoutput: true,
        transparent: true,
        ...(roomId ? {
          scene: true,
          room: roomId,
          password: roomPassword || false,
        } : {
          view: streamId
        }),
        ...streamAttributes
      })}`}
      ref={ref}
      width="100%"
      height="100%"
      allowtransparency="true"
      allow="autoplay;camera;microphone"
      {...rest}
    />
  ), [ streamId, roomId, roomPassword, streamAttributes]);
}
