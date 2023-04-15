import { CellOutput } from '../types';
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

export { getResult };
