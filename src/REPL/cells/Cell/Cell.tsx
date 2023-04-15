import { useConfig } from '../../../store/hooks';
import themes from '../../../themes';
import { Themes } from '../../../themes/types';
import CodeHighlighter from '../components/CodeHighlighter';
import InputIndex from '../components/InputIndex';
import OutputIndex from '../components/OutputIndex';
import { Container, EditorContainer, Input, Output, ResultContainer } from '../styled';
import { BaseCellProps } from '../types';
import { getResult } from '../utils';

function Cell({ index, cell }: BaseCellProps) {
  const result = getResult(cell.output);
  const [config] = useConfig();
  const theme = themes[config.theme];

  return (
    <Container>
      <Input>
        <InputIndex index={index + 1} value={cell.input?.code} />

        <EditorContainer>
          <CodeHighlighter code={cell.input?.code} />
        </EditorContainer>
      </Input>
      {result && (
        <Output>
          <OutputIndex index={index + 1} />

          <ResultContainer style={{ color: theme.colors.text }}>{result}</ResultContainer>
        </Output>
      )}
    </Container>
  );
}

export default Cell;
