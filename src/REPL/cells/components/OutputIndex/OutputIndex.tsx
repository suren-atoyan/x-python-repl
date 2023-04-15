import { Box } from '../../../styled';
import { Container, OutRow } from './styled';
import { OutputIndexProps } from './typed';

function OutputIndex({ index, containerStyle = {} }: OutputIndexProps) {
  return (
    <Container style={containerStyle}>
      <OutRow>
        <Box>Out</Box>
        <Box>[{index}]:</Box>
      </OutRow>
    </Container>
  );
}

export default OutputIndex;
