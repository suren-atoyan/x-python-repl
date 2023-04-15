import styled from '@emotion/styled';

import { Box } from '../../../styled';
import { CODE_CONTAINER_MIN_HEIGHT } from '../../styled';

const Container = styled(Box)({
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  fontSize: 12,
  paddingLeft: 15.8,
  whiteSpace: 'pre-wrap',
  display: 'block',

  '> span': {
    lineHeight: `${CODE_CONTAINER_MIN_HEIGHT}px`,
  },
});

export { Container };
