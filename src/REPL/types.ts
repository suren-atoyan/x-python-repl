import { ExecReturnValue } from '@x-python/core';

import { Themes } from '../themes/types';

type CellOutput = ExecReturnValue;

type CellInput = {
  short?: string;
  code: string;
};

type Cell = {
  id: string;
  hidden: boolean;
  output?: CellOutput;
  input?: CellInput;
};

type Config = {
  theme: Themes;
};

type ContainerProps = {
  background: string;
};

export type { Cell, CellOutput, CellInput, Config, ContainerProps };
