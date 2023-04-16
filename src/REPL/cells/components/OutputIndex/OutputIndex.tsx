import { useTheme } from '../../../../store/hooks';
import { Box } from '../../../styled';
import { Container, OutRow } from './styled';
import { OutputIndexProps } from './typed';

function OutputIndex({ index, containerStyle = {} }: OutputIndexProps) {
  const theme = useTheme();

  return (
    <Container style={{ ...containerStyle, color: theme.colors.indexOut }}>
      <OutRow>
        <Box>Out</Box>
        <Box>[{index}]:</Box>
      </OutRow>
    </Container>
  );
}

export default OutputIndex;
