import { useCallback } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import produce from 'immer';
import last from 'lodash/last';

import type { Config, Cell } from '../REPL/types';
import { getEmptyCell } from '../REPL/utils';
import { cellsState, configState } from './atoms';
import themes from '../themes';

function useConfig(): [Config, SetterOrUpdater<Config>] {
  const [config, setConfig] = useRecoilState(configState);

  return [config, setConfig];
}

function useTheme() {
  const [config] = useConfig();

  return themes[config.theme];
}

// NOTE: currently we do support only one console at the time
const DEFAULT_APP_ID = '1';
function useCells() {
  return useRecoilValue(cellsState(DEFAULT_APP_ID));
}

function useAddCell() {
  const setCells = useSetRecoilState(cellsState(DEFAULT_APP_ID));

  const addCell = useCallback(
    (cell: Cell) => {
      setCells((cells) =>
        produce(cells, (draft) => {
          const lastCell = last(draft) as Cell;

          lastCell.input = cell.input;
          lastCell.output = cell.output;

          draft.push(getEmptyCell());
        }),
      );
    },
    [setCells],
  );

  return addCell;
}

function useCleanScreen() {
  const setCells = useSetRecoilState(cellsState(DEFAULT_APP_ID));

  const cleanScreen = useCallback(() => {
    setCells((cells) => {
      const cellsToUpdate = [...cells];
      const lastCell = cellsToUpdate.pop();
      const modifiedCells = cellsToUpdate.map((cell) => ({ ...cell, hidden: true }));
      return [...modifiedCells, lastCell] as Cell[];
    });
  }, [setCells]);

  return cleanScreen;
}

export { useCells, useAddCell, useCleanScreen, useConfig, useTheme };
