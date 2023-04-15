import { Monaco, loader } from '@monaco-editor/react';
import DOMPurify from 'dompurify';
import uniqueId from 'lodash/uniqueId';

import type { Cell } from './types';

function getEmptyCell(): Cell {
  return {
    id: uniqueId(),
    hidden: false,
    output: undefined,
    input: undefined,
  };
}

async function getColorizedInput(input: string, language: string, monaco?: Monaco) {
  const monacoInstance = monaco ?? (await loader.init());
  const colorized = await monacoInstance.editor.colorize(input, language, {});
  return DOMPurify.sanitize(colorized);
}

export { getEmptyCell, getColorizedInput };
