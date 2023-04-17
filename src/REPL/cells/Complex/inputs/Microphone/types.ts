type RecordAudioReturnValue =
  | Promise<{
      start: () => void;
      stop: () => Promise<Blob>;
      stream: MediaStream;
    }>
  | never;

export { RecordAudioReturnValue };
