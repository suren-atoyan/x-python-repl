import { atom, atomFamily } from 'recoil';

import type { Cell, Config } from '../REPL/types';
import { getEmptyCell } from '../REPL/utils';
import { Themes } from '../themes/types';

const INITIAL_CONFIG = {
  theme: Themes.Dark,
};

const cellsState = atomFamily<Cell[], string>({
  key: 'repl-state',
  default: [getEmptyCell()],
});

const configState = atom<Config>({
  key: 'config-state',
  default: INITIAL_CONFIG,
});

export { cellsState, configState };
