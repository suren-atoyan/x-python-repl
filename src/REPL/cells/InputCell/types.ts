import { type MutableRefObject } from 'react';

import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

import { BaseCellProps } from '../types';

type InputCellProps = BaseCellProps & {
  editorRef: MutableRefObject<monacoType.editor.IStandaloneCodeEditor | undefined>;
};

export type { InputCellProps };
