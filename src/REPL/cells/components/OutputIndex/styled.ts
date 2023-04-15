import styled from '@emotion/styled';

import { Container as BaseContainer, IndexRow } from '../InputIndex/styled';

const Container = styled(BaseContainer)({
  // TODO: use theme
  color: 'purple',
});

const OutRow = styled(IndexRow)({});

export { Container, OutRow };
