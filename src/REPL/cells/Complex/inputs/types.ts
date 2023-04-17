enum ComplexInputs {
  Microphone = '/microphone',
  File = '/file',
  Camera = '/camera',
}

type InputProps = {
  type: ComplexInputs;
  onSubmit: (base64: string) => void;
};

type InputComponentProps = {
  onReady?: (base64: string | null) => void;
};

export { ComplexInputs, InputProps, InputComponentProps };
