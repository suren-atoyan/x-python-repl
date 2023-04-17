import WebCameraBase from 'react-webcam';

import { Box, Stack } from '../../../../styled';

import styled from '@emotion/styled';
import { FC } from 'react';

const CAPTURE_DEFAULT_WIDTH = 400;
const CAPTURE_DEFAULT_HEIGHT = 300;

const Container = styled(Stack)({
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

const Capture = styled(Box)({
  position: 'relative',
  width: CAPTURE_DEFAULT_WIDTH,
  height: CAPTURE_DEFAULT_HEIGHT,
  marginTop: 8,
  marginBottom: 8,
});

const WebCamera = styled(WebCameraBase as unknown as FC<HTMLVideoElement>)({
  borderRadius: `6px`,
  marginBottom: -4,
  objectFit: 'cover',
});

const Button = styled(Box)({
  position: 'absolute',
  zIndex: 1,
  bottom: 0,
});

const Img = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: `6px`,
  objectFit: 'cover',
});

Img.defaultProps = {
  alt: 'webcam-capture',
};

const OptionsContainer = styled(Stack)({
  width: 200,
});

const Options = styled(Stack)({
  width: '100%',
});

export {
  Container,
  Capture,
  WebCamera,
  Button,
  Img,
  OptionsContainer,
  Options,
  CAPTURE_DEFAULT_HEIGHT,
  CAPTURE_DEFAULT_WIDTH,
};
