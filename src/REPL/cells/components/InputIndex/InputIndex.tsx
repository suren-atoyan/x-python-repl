import { useMemo } from 'react';

import { ColumnsContainer, Container, MultilineIndicatorRow } from './styled';
import { InputIndexProps } from './typed';
import IndexNumber from './IndexNumber';

function InputIndex({ isLoading, index, value, containerStyles = {} }: InputIndexProps) {
  const linesToRender = useMemo(() => (value?.split('\n').length || 1) - 1, [value]);

  return (
    <Container style={containerStyles}>
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
