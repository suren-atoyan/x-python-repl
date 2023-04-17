import { Box, Stack } from '../../../../styled';
import styled from '@emotion/styled';

const IMAGE_DEFAULT_WIDTH = 400;

const Placeholder = styled(Box)({
  width: IMAGE_DEFAULT_WIDTH,
  height: IMAGE_DEFAULT_WIDTH - 100,
});

const Img = styled('img')({
  width: IMAGE_DEFAULT_WIDTH,
  objectFit: 'contain',
  borderRadius: `6px`,
});

Img.defaultProps = {
  alt: 'image',
};

const EmptyState = styled(Stack)({
  width: 250,
  height: 120,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  // TODO: fix this
  border: '1px dashed #e0e0e0',
  borderRadius: '6px',
});

export { Img, Placeholder, EmptyState };
