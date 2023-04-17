import { useEffect, useRef } from 'react';

import { Canvas } from './styled';
import { AudioVisualizerProps } from './types';
import { visualize } from './utils';

function AudioVisualizer({ stream }: AudioVisualizerProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // TODO: Fix this
    const stop = visualize(stream, canvasRef.current as unknown as HTMLCanvasElement);

    return stop;
  }, [stream]);

  return <Canvas ref={canvasRef} />;
}

export default AudioVisualizer;
