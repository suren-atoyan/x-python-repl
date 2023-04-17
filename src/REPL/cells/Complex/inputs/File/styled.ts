import styled from '@emotion/styled';

const Label = styled('label')({
  margin: 0,
  height: 50,
  // TODO: fix this
  // color: theme.palette.text.secondary,
  justifyContent: 'space-between',
  flexDirection: 'row-reverse',
  width: '80%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export { Label };
