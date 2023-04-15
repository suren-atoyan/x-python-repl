import styled from '@emotion/styled';

import { FlexBox, Stack } from '../../../styled';
import { CODE_CONTAINER_MIN_HEIGHT } from '../../styled';

const Container = styled(FlexBox)({
  fontWeight: 600,
  alignSelf: 'baseline',
  minWidth: 60,
  width: 60,
  minHeight: CODE_CONTAINER_MIN_HEIGHT,
  fontFamily: ['IBM Plex Mono', 'monaco', 'monospace'].join(','),
  overflow: 'hidden',
  fontSize: 11,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  // TODO: use theme
  color: 'green',
  zIndex: 1,
});

const ColumnsContainer = styled(Stack)({
  width: '100%',
});

const IndexRow = styled(Stack)({
  lineHeight: `${CODE_CONTAINER_MIN_HEIGHT}px`,
  minHeight: CODE_CONTAINER_MIN_HEIGHT,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

const MultilineIndicatorRow = styled(IndexRow)({
  justifyContent: 'end',
});

export { Container, ColumnsContainer, IndexRow, MultilineIndicatorRow };
