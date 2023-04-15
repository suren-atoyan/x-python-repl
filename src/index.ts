import { useEffect } from 'react';

import REPL from './REPL';

export function Abc() {
  useEffect(() => {
    console.log('abc');
  }, []);

  return 23;
}

export default REPL;
