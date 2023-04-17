import { Monaco, loader } from '@monaco-editor/react';
import DOMPurify from 'dompurify';
import uniqueId from 'lodash/uniqueId';

import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';

import { ComplexInputs } from './cells/Complex/inputs/types';
import { ComplexOutputs } from './cells/Complex/outputs/types';

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

const COMPLEX_INPUT_TRIGGER = '/';

const completionItems = [
  {
    kind: monacoType.languages.CompletionItemKind.Event,
    detail: 'Record audio',
    documentation:
      "Microphone is a special input. You can use it to record an audio file using your device's default microphone.",
    label: ComplexInputs.Microphone,
    insertText: 'microphone',
    sortText: '1',
  },
  {
    kind: monacoType.languages.CompletionItemKind.Event,
    detail: 'Upload a file',
    documentation:
      'File is a special input. You can use it to upload any type of file from your device file system.',
    label: ComplexInputs.File,
    insertText: 'file',
    sortText: '2',
  },
  {
    kind: monacoType.languages.CompletionItemKind.Event,
    documentation:
      "Camera is a special input. You can use it to take a photo using your device's default camera input.",
    detail: 'Take a photo',
    label: ComplexInputs.Camera,
    insertText: 'camera',
    sortText: '3',
  },
  {
    kind: monacoType.languages.CompletionItemKind.Value,
    documentation:
      'Image is a special output. You can use it to render an image inside the console. As a required argument, you should provide a valid source for the image; it can be either base64 or a URL.',
    detail: 'Show an image',
    label: ComplexOutputs.Image,
    insertText: 'image',
    sortText: '4',
  },
] as monacoType.languages.CompletionItem[];

function complexInputPredicate(code: string) {
  return code === COMPLEX_INPUT_TRIGGER;
}

export {
  getEmptyCell,
  getColorizedInput,
  completionItems,
  complexInputPredicate,
  COMPLEX_INPUT_TRIGGER,
};
