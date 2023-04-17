import { RecordAudioReturnValue } from './types';

async function recordAudio(): RecordAudioReturnValue {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks: Blob[] = [];

  function collectAudioChunks(event: BlobEvent) {
    audioChunks.push(event.data);
  }

  mediaRecorder.addEventListener('dataavailable', collectAudioChunks);

  function start() {
    mediaRecorder.start();
  }

  function stop(): Promise<Blob> {
    return new Promise((resolve) => {
      mediaRecorder.addEventListener(
        'stop',
        () => {
          const blob = new Blob(audioChunks, { type: 'audio/mpeg' });
          resolve(blob);
          mediaRecorder.removeEventListener('dataavailable', collectAudioChunks);
          stream.getAudioTracks().forEach((track) => {
            stream.removeTrack(track);
            track.stop();
          });
        },
        { once: true },
      );

      mediaRecorder.stop();
    });
  }

  return { start, stop, stream };
}

export { recordAudio };
