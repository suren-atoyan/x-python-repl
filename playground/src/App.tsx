import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';

import REPL from '../../dist';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={{}}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <REPL />
        </div>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
