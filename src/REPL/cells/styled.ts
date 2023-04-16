import styled from '@emotion/styled';

import { Box, FlexBox } from '../styled';

const CODE_CONTAINER_MIN_HEIGHT = 18;
const CODE_CONTAINER_LINES_GAP = 16;

const Container = styled(FlexBox)({
  marginBottom: 8,
  flexDirection: 'column',
  width: '100%',
});

const Input = styled(FlexBox)({
  alignItems: 'flex-start',
  flexDirection: 'row',
  marginBottom: 8,
});

const Output = styled(Input)({});

const EditorContainer = styled(FlexBox)({
  flexDirection: 'column',
  flexGrow: 1,
  width: '90%',
  overflowX: 'auto',
  '.cigra, .cigr': {
    boxShadow: 'none !important',
  },
  '.core-guide.core-guide-indent-active, .core-guide.core-guide-indent': {
    display: 'none',
  },
});

const ResultContainer = styled(Box)({
  width: '100%',
  marginLeft: 15,
  lineHeight: `${CODE_CONTAINER_MIN_HEIGHT}px`,
});

const Pre = styled('pre')({
  margin: 0,
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: 'pre-line',
  overflowWrap: 'break-word',
});

const StdOut = styled(Pre)({});
const StdErr = styled(Pre)({ color: 'red' });

export {
  Container,
  EditorContainer,
  ResultContainer,
  Input,
  Output,
  StdOut,
  StdErr,
  CODE_CONTAINER_MIN_HEIGHT,
  CODE_CONTAINER_LINES_GAP,
};
