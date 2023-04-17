import { useMemo, useState } from 'react';

import useInterval from '../../../../../../hooks/useInterval';

import { Container } from './styled';
import { TimerProps } from './types';

const TIMER_INITIAL_VALUE = '0.0';

function Timer({ isRecording, isUploading }: TimerProps) {
  const [progress, setProgress] = useState(TIMER_INITIAL_VALUE);

  const startTime = useMemo(() => Date.now(), []);

  useInterval(
    () => {
      const elapsedTime = Date.now() - startTime;
      setProgress((elapsedTime / 1000).toFixed(1));
    },
    !isRecording && isUploading ? null : 100,
  );

  return <Container>{progress}s</Container>;
}

export default Timer;
