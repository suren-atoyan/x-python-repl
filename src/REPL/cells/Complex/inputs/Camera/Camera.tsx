import { useRef, useState } from 'react';

import { convertBase64ToBlob } from '../utils';
import { InputComponentContainer } from '../styled';
import { InputComponentProps } from '../types';
import { Button, Capture, Container, Img, WebCamera } from './styled';
import { Box } from '../../../../styled';

function Camera({ onReady }: InputComponentProps) {
  const webcamRef = useRef<typeof WebCamera>(null);
  const [capture, setCapture] = useState(null);

  const isCaptured = Boolean(capture);

  async function captureScreenshot() {
    const base64 = webcamRef.current?.getScreenshot();

    setCapture(base64);

    const blob = await convertBase64ToBlob(base64);

    onReady?.(blob);
  }

  function resetCapture() {
    setCapture(null);
    onReady?.(null);
  }

  return (
    <InputComponentContainer style={{ width: 'fit-content' }}>
      <Container>
        <Capture>
          <Button onClick={isCaptured ? resetCapture : captureScreenshot}>
            {isCaptured ? <Box>restart</Box> : <Box>Camera</Box>}
          </Button>
          {isCaptured && <Img src={capture} />}
          <WebCamera
            ref={webcamRef}
            forceScreenshotSourceSize
            audio={false}
            width="100%"
            height="100%"
            screenshotFormat="image/jpeg"
          />
        </Capture>
      </Container>
    </InputComponentContainer>
  );
}

export default Camera;
