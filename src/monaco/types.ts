import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

type RegisteredCompletionItemProvider = {
  disposable: monacoType.IDisposable;
  dispose: () => void;
};

type RegisteredCompletionItemProviders = {
  [key: string]: RegisteredCompletionItemProvider;
};

export type { RegisteredCompletionItemProvider, RegisteredCompletionItemProviders };
