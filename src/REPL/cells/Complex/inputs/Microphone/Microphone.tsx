import { useRef, useState } from 'react';

import { Box } from '../../../../styled';

import AudioVisualizer from './AudioVisualizer';
import Timer from './Timer';

import { recordAudio } from './utils';
import { convertBlobToBase64 } from '../utils';
import { InputComponentContainer } from '../styled';
import { InputComponentProps } from '../types';
import { Audio, Container } from './styled';

function Microphone({ onReady }: InputComponentProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [base64, setBase64] = useState<string>();
  const stopRecordingRef = useRef<() => Promise<Blob>>();
  const audioSteamRef = useRef<MediaStream>();

  async function startRecording() {
    try {
      const { start, stop, stream } = await recordAudio();
      stopRecordingRef.current = stop;
      audioSteamRef.current = stream;
      start();
      setIsRecording(true);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    const currentAudioBlob = await stopRecordingRef.current?.();

    if (currentAudioBlob) {
      convertBlobToBase64(currentAudioBlob, (currentBase64: string) => {
        setBase64(currentBase64);
        onReady?.(URL.createObjectURL(currentAudioBlob));
      });
    }
  }

  const isProcessing = isRecording;

  function getContent() {
    if (isRecording) {
      return (
        <>
          {/* TODO: Fix this */}
          {isRecording && <AudioVisualizer stream={audioSteamRef.current as MediaStream} />}
          <Timer isRecording={isRecording} />
        </>
      );
    }

    if (base64) {
      return <Audio controls controlsList="nodownload" src={base64} />;
    }

    return null;
  }

  const recordButtonWidth = isProcessing || (!isProcessing && base64) ? 50 : '100%';

  return (
    <InputComponentContainer>
      <Container>
        <Box style={{ width: recordButtonWidth }}>
          <Box
            style={{ width: !isProcessing && !base64 ? '100%' : 'inherit' }}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isProcessing ? (
              <Box
                style={{ animation: isRecording ? 'record-animation 1s linear infinite' : 'none' }}
                color="error"
              >
                stop
              </Box>
            ) : (
              // TODO: Fix this
              <Box style={{ color: 'green' }}>record</Box>
            )}
          </Box>
        </Box>
        {getContent()}
      </Container>
    </InputComponentContainer>
  );
}

export default Microphone;
