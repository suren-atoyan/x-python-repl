import { useMemo } from 'react';

import { ColumnsContainer, Container, MultilineIndicatorRow } from './styled';
import { InputIndexProps } from './typed';
import IndexNumber from './IndexNumber';
import { useTheme } from '../../../../store/hooks';

function InputIndex({ isLoading = false, index, value, containerStyles = {} }: InputIndexProps) {
  const linesToRender = useMemo(() => (value?.split('\n').length || 1) - 1, [value]);
  const theme = useTheme();

  return (
    <Container style={{ ...containerStyles, color: theme.colors.indexIn }}>
      <ColumnsContainer>
        <IndexNumber index={index} isLoading={isLoading} />
        {Array.from(Array(linesToRender)).map((_, lineIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <MultilineIndicatorRow key={lineIndex}>...:</MultilineIndicatorRow>
        ))}
      </ColumnsContainer>
    </Container>
  );
}

export default InputIndex;
