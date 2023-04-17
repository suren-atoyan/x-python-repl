import delay from 'lodash/delay';
import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import { CellOutput } from '../types';
import { ComplexInputs } from './Complex/inputs/types';
import { ComplexOutputs } from './Complex/outputs/types';
import { StdErr, StdOut } from './styled';

function getResult(output: CellOutput | undefined) {
  if (output) {
    const { result, error, stdout, stderr } = output;

    if (error || stderr) {
      return <StdErr>{error || stderr}</StdErr>;
    }

    if (result || stdout) {
      return <StdOut>{result || stdout}</StdOut>;
    }
  }

  return null;
}

function convertToPyBase64ToJs(data: string) {
  return `data:image/png;base64,${data.slice(2, -1)}`;
}

function isComplexInput(code: string) {
  return Object.values(ComplexInputs).some((input) => input === code);
}

function isComplexOutput(code: string) {
  return Object.values(ComplexOutputs).some((output) => code.startsWith(output));
}

function convertToValidSource(data: string) {
  if (data.startsWith("b'") && data.endsWith("'")) return convertToPyBase64ToJs(data);
  if (data.startsWith("'") && data.endsWith("'")) return data.slice(1, -1);

  return data;
}

function showComplexInputs(editor: monacoType.editor.IStandaloneCodeEditor) {
  delay(() => {
    editor.setPosition({ lineNumber: 1, column: 2 });
    editor.trigger('', 'editor.action.triggerSuggest', {});
  }, 100);
}

function getTempVariablePrefix(type: ComplexInputs | null): string {
  switch (type) {
    case ComplexInputs.Camera:
      return 'temp_cam';
    case ComplexInputs.File:
      return 'temp_file';
    case ComplexInputs.Microphone:
      return 'temp_mic';
    default:
      return '';
  }
}

export {
  getResult,
  isComplexInput,
  isComplexOutput,
  convertToValidSource,
  convertToPyBase64ToJs,
  showComplexInputs,
  getTempVariablePrefix,
};
