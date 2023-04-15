import { useEffect, useState } from 'react';

import { getColorizedInput } from '../../../utils';
import { Container } from './styled';
import { CodeHighlighterProps } from './types';

function CodeHighlighter({ code = '', language = 'python' }: CodeHighlighterProps) {
  const [colorizedCode, setColorizedCode] = useState('');

  useEffect(() => {
    if (code) {
      getColorizedInput(code, language).then((res) => {
        setColorizedCode(res);
      });
    }
  }, [code, language]);

  return (
    <Container
      style={{ whiteSpace: 'pre-wrap', display: 'block' }}
      dangerouslySetInnerHTML={{ __html: colorizedCode || code }}
    />
  );
}

export default CodeHighlighter;
