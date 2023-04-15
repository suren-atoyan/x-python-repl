import styled from '@emotion/styled';

import { ContainerProps } from './types';

const Box = styled('div')({});

const FlexBox = styled(Box)({
  display: 'flex',
});

const Stack = styled(FlexBox)({
  flexDirection: 'column',
});

const Container = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== 'background',
})<ContainerProps>(({ background }) => ({
  width: 400,
  height: 400,
  padding: 16,
  flexDirection: 'column',
  borderRadius: 6,
  border: '1px solid black',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: background,
}));

export { Box, FlexBox, Stack, Container };
