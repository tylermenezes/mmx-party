import DynamicStream from '../components/DynamicStream';

export default function OverlayPage() {

  return (
    <DynamicStream
      of="game"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
    />
  );
}
