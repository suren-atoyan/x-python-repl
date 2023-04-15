import React from 'react';
import { RecoilRoot } from 'recoil';

import REPL from '../../dist';

function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;
