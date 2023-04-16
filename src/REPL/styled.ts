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
  shouldForwardProp: (prop) => !['background', 'widgetBackground', 'widgetBorder'].includes(prop),
})<ContainerProps>(({ background, widgetBackground, widgetBorder }) => ({
  width: 400,
  height: 400,
  padding: 16,
  flexDirection: 'column',
  borderRadius: 6,
  border: '1px solid black',
  overflowX: 'hidden',
  overflowY: 'auto',
  backgroundColor: background,
  position: 'relative',
  // there is a known issue
  // https://github.com/microsoft/monaco-editor/issues/2822
  '--vscode-editorSuggestWidget-background': widgetBackground,
  '--vscode-editorSuggestWidget-border': widgetBorder,
}));

const Loading = styled(Box)({
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 3,
});

export { Box, FlexBox, Stack, Container, Loading };
