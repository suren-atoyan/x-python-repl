import { Stack, Box } from '../../../styled';

import styled from '@emotion/styled';

const InputComponentContainer = styled(Stack)({
  // TODO: fix this
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  minHeight: 50,
  width: '100%',
  paddingLeft: 8,
  paddingRight: 8,
});

const S3SubmitButton = styled(Box)({
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  flex: 1,
});

const Base64SubmitButton = styled(Box)({
  marginRight: 8,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  width: 20,
  height: '100%',
  padding: 0,
  paddingLeft: 3,
});

const SubmitButtonContainer = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  height: 40,
  minWidth: 70,
});

export { InputComponentContainer, S3SubmitButton, Base64SubmitButton, SubmitButtonContainer };
