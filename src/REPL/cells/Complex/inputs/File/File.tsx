import { ChangeEvent, useState } from 'react';

import first from 'lodash/first';

import { Box } from '../../../../styled';

import { InputComponentContainer } from '../styled';
import { InputComponentProps } from '../types';
import { Label } from './styled';

function File({ onReady }: InputComponentProps) {
  const [selectedFile, setSelectedFile] = useState<File>();

  function handleFileUpload(ev: ChangeEvent<HTMLInputElement>) {
    const currentSelectedFile = first(ev.target.files);
    setSelectedFile(currentSelectedFile);

    // TODO: fix this
    onReady?.(URL.createObjectURL(currentSelectedFile as File));
  }

  return (
    <InputComponentContainer>
      <Label title={selectedFile?.name ?? 'Choose file...'}>
        <input type="file" hidden multiple={false} onChange={handleFileUpload} />
        {/* TODO: fix icon */}
        <Box>upload</Box>
      </Label>
    </InputComponentContainer>
  );
}

export default File;
