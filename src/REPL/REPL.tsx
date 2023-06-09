import { type MouseEvent, useEffect, useRef, useState } from 'react';

import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import { init } from '@x-python/core';

import { useCells, useTheme } from '../store/hooks';
import Cell from './cells/Cell';
import InputCell from './cells/InputCell';
import { Loading, Container } from './styled';
import CircularProgress from './cells/components/CircularProgress';

function REPL() {
  const [isInitialized, setIsInitialized] = useState(false);
  const cells = useCells();
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor>();
  const theme = useTheme();

  useEffect(() => {
    init().then(() => setIsInitialized(true));
  }, []);

  function handleContainerClick(ev: MouseEvent<HTMLElement>) {
    if (ev.currentTarget === ev.target) {
      editorRef.current?.focus();
    }
  }

  function getContent() {
    return cells
      .filter((cell) => !cell.hidden)
      .map((cell, index, cellsToRender) => {
        const isLastIndex = index + 1 === cellsToRender.length;

        if (isLastIndex) {
          return (
            <InputCell
              isInitialized={isInitialized}
              key={cell.id}
              index={index}
              cell={cell}
              editorRef={editorRef}
            />
          );
        }

        return <Cell key={cell.id} index={index} cell={cell} />;
      });
  }

  return (
    <Container
      onClick={handleContainerClick}
      background={theme.monaco.colors['editor.background']}
      widgetBackground={theme.monaco.colors['editorSuggestWidget.background']}
      widgetBorder={theme.monaco.colors['editorSuggestWidget.border']}
    >
      {!isInitialized && (
        <Loading>
          <CircularProgress />
        </Loading>
      )}
      {getContent()}
    </Container>
  );
}

export default REPL;
