import { useState } from 'react';

import { Stack } from '../../../styled';

import File from './File';
import Microphone from './Microphone';
import Camera from './Camera';
import { Base64SubmitButton, SubmitButtonContainer } from './styled';
import { InputProps, ComplexInputs } from './types';

function ComplexInput({ type, onSubmit }: InputProps) {
  const [blob, setBlob] = useState<string | null>(null);

  function handleSetBlob(base64: string | null) {
    setBlob(base64);
  }

  function getComponent() {
    switch (type) {
      case ComplexInputs.Microphone:
        return <Microphone onReady={handleSetBlob} />;
      case ComplexInputs.File:
        return <File onReady={handleSetBlob} />;
      case ComplexInputs.Camera:
        return <Camera onReady={handleSetBlob} />;
    }
  }

  return (
    <Stack style={{ marginTop: 8, flexDirection: 'row', alignItems: 'flex-start' }}>
      <SubmitButtonContainer>
        <Base64SubmitButton>submit</Base64SubmitButton>
      </SubmitButtonContainer>
      {getComponent()}
    </Stack>
  );
}

export default ComplexInput;
