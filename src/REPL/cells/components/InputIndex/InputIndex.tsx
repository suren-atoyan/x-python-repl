import { useMemo } from 'react';

import CircularProgress from '../CircularProgress';

import { Box } from '../../../styled';
import { ColumnsContainer, Container, IndexRow, MultilineIndicatorRow } from './styled';
import { InputIndexProps } from './typed';

function InputIndex({ isLoading, index, value, containerStyles = {} }: InputIndexProps) {
  const linesToRender = useMemo(() => (value?.split('\n').length || 1) - 1, [value]);

  return (
    <Container style={containerStyles}>
      <ColumnsContainer>
        <IndexRow style={{ justifyContent: isLoading ? 'center' : 'space-between' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Box>In</Box>
              <Box>[{index}]:</Box>
            </>
          )}
        </IndexRow>
        {Array.from(Array(linesToRender)).map((_, lineIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <MultilineIndicatorRow key={lineIndex}>...:</MultilineIndicatorRow>
        ))}
      </ColumnsContainer>
    </Container>
  );
}

export default InputIndex;
