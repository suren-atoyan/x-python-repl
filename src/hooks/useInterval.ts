/* eslint-disable @typescript-eslint/ban-types */
import { noop } from 'lodash';
import { useEffect, useRef } from 'react';

function useInterval(callback: Function, delay?: number | null) {
  const savedCallback = useRef<Function>(noop);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
}

export default useInterval;
