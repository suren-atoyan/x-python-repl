import { Stack } from '../../../../styled';

import styled from '@emotion/styled';

const Container = styled(Stack)({
  '@keyframes record-animation': {
    '0%': {
      opacity: 1,
      transform: 'scale(1)',
    },

    '50%': {
      opacity: 0.8,
      transform: 'scale(1.2)',
    },

    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  height: 50,
});

const Audio = styled('audio')({
  height: '80%',
  width: '100%',

  '&::-webkit-media-controls-enclosure': {
    borderRadius: '6px',
    backgroundColor: 'red',
  },

  '&::-webkit-media-controls-current-time-display, &::-webkit-media-controls-time-remaining-display':
    {
      textShadow: 'none',
      color: 'black',
    },

  '&::-internal-track-segment-background': {
    backgroundColor: 'red',
  },

  '&::-internal-track-segment-highlight-before': {
    borderRadius: 0,
  },

  '&::-webkit-media-controls-play-button': {
    marginRight: 10,
    'div::-internal-media-controls-button-hover-background': {
      background: 'red !important',
    },
  },
});

export { Container, Audio };
