import { convertToValidSource } from '../../utils';
import Image from './Image';
import { OutputComponentContainer } from './styled';
import { OutputProps, ComplexOutputs } from './types';

function ComplexOutput({ type, data }: OutputProps) {
  function getComponent() {
    switch (type) {
      case ComplexOutputs.Image:
        return <Image data={convertToValidSource(data)} />;
    }
  }

  return <OutputComponentContainer>{getComponent()}</OutputComponentContainer>;
}

export default ComplexOutput;
