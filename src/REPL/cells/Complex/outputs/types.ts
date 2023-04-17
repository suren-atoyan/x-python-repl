enum ComplexOutputs {
  Image = '/image',
}

type OutputProps = {
  type: ComplexOutputs;
  data: string;
};

type OutputComponentProps = {
  data: string;
};

export { ComplexOutputs, OutputProps, OutputComponentProps };
