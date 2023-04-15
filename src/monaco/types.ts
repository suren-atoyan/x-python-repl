import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import { CompletionResults } from '@x-python/core';

type RegisteredCompletionItemProvider = {
  disposable: monacoType.IDisposable;
  dispose: () => void;
};

type RegisteredCompletionItemProviders = {
  [key: string]: RegisteredCompletionItemProvider;
};

type Cell = unknown;

type Console = {
  sessionId: string;
  cells: Array<Cell>;
};

type ConsoleState = {
  data: Record<string, Console>;
  isLoading: boolean;
};

type RestartConsoleSessionReturnValue = {
  applicationId: string;
  sessionId: string;
};

type ConsoleCompletionResponse = {
  completions: CompletionResults;
};

type SetCellResultParams = {
  applicationId: string;
  sessionId: string;
  cellId: number;
  input: string;
  result: unknown;
};

type UseConsolesReturnValue = ConsoleState;

type UseConsoleReturnValue = {
  console: Console;
  setCellResult: (params: SetCellResultParams) => void;
  restartConsoleSession: () => void;
};

export type {
  Cell,
  Console,
  ConsoleState,
  SetCellResultParams,
  RestartConsoleSessionReturnValue,
  ConsoleCompletionResponse,
  UseConsolesReturnValue,
  UseConsoleReturnValue,
  RegisteredCompletionItemProvider,
  RegisteredCompletionItemProviders,
};
