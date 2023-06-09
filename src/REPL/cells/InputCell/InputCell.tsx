import { useEffect, useRef, useState } from 'react';

import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import Editor, { Monaco } from '@monaco-editor/react';
import { exec, interrupt } from '@x-python/core';
import delay from 'lodash/delay';

import { RegisteredCompletionItemProvider } from '../../../monaco/types';
import { setupAutocompletion, setupMonaco } from '../../../monaco/utils';
import { useAddCell, useCells, useCleanScreen, useConfig, useTheme } from '../../../store/hooks';
import InputIndex from '../components/InputIndex';
import OutputIndex from '../components/OutputIndex';
import {
  CODE_CONTAINER_LINES_GAP,
  CODE_CONTAINER_MIN_HEIGHT,
  Container,
  EditorContainer,
  Input,
  Output,
  ResultContainer,
} from '../styled';
import { getResult, getTempVariablePrefix, isComplexInput, isComplexOutput } from '../utils';
import { InputCellProps } from './types';
import { CellOutput } from '../../types';
import { ComplexInputs } from '../Complex/inputs/types';
import { getInputParam } from './utils';
import ComplexInput from '../Complex/inputs/ComplexInput';
import { completionItems, complexInputPredicate } from '../../utils';

const UP_DOWN_ARROW_COMMAND_CONTEXT =
  'editorTextFocus && !suggestWidgetVisible && !renameInputVisible && !inSnippetMode && !quickFixWidgetVisible';
const EDITOR_OPTIONS: monacoType.editor.IStandaloneEditorConstructionOptions = {
  renderLineHighlight: 'none',
  minimap: { enabled: false },
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
    alwaysConsumeMouseWheel: false,
    handleMouseWheel: false,
  },
  cursorStyle: 'block',
  overviewRulerLanes: 0,
  lineNumbers: 'off',
  lineDecorationsWidth: 0,
  scrollBeyondLastLine: false,
  automaticLayout: false,
  hideCursorInOverviewRuler: true,
  fixedOverflowWidgets: true,
  overviewRulerBorder: false,
  renderWhitespace: 'boundary',
};

function InputCell({ cell, index, ...props }: InputCellProps) {
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();
  const containerRef = useRef<HTMLDivElement>(null);
  const cells = useCells();
  const addCell = useAddCell();
  const cleanScreen = useCleanScreen();
  const cellsRef = useRef(cells);
  const currentValue = useRef(cell.input?.code);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [complexInput, setComplexInput] = useState<ComplexInputs | null>(null);
  const [height, setHeight] = useState(CODE_CONTAINER_MIN_HEIGHT);
  const [prevValueIndex, setPrevValueIndex] = useState(cells.length - 1);
  const [config] = useConfig();
  const isInitializedRef = useRef(props.isInitialized);

  const theme = useTheme();

  cellsRef.current = cells;
  isInitializedRef.current = props.isInitialized;

  function submitComplexOutput(code: string) {
    const [command, param] = getInputParam(code);

    console.log('command', command);
    console.log('param', param);
  }

  async function handleRun() {
    if (!isInitializedRef.current || isLoading) {
      return;
    }

    if (editorRef.current) {
      const code = editorRef.current.getValue();

      if (code) {
        if (isComplexInput(code)) {
          setComplexInput(code as ComplexInputs);
        } else if (isComplexOutput(code)) {
          submitComplexOutput(code);
        } else {
          // run actual code
          setIsLoading(true);

          try {
            const output = await exec({ code });
            addCell({ ...cell, input: { code }, output });
          } catch (error) {
            // TODO: get rid of casting
            const output = { error: error as string } as CellOutput;
            addCell({ ...cell, input: { code }, output });
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  }

  function handleEnter() {
    if (editorRef.current) {
      const position = editorRef.current.getPosition();
      const model = editorRef.current.getModel();

      if (position && model) {
        const currentLine = model.getLineContent(position.lineNumber);
        const lineCount = model.getLineCount();
        const nextLineNumber = position.lineNumber + 1;
        const nextLine =
          lineCount < nextLineNumber ? null : model.getLineContent(position.lineNumber + 1);

        if (!currentLine.trim().endsWith(':') && !nextLine) {
          if (lineCount > 1 && currentLine.trim() !== '') {
            applyEnter();
            return;
          }

          handleRun();
        } else {
          applyEnter();
        }
      }
    }
  }

  function applyEnter() {
    editorRef.current?.trigger('', 'editor.action.insertLineAfter', null);
  }

  function interruptCommand() {
    if (!isLoading && editorRef.current) {
      try {
        interrupt();
        setIsLoading(false);
      } finally {
        // set complex input to null
      }
    }
  }

  function setEditorHeight() {
    if (editorRef.current) {
      const lines = editorRef.current?.getValue().split('\n');
      setHeight(
        editorRef.current.getContentHeight() + (lines.length === 1 ? 0 : CODE_CONTAINER_LINES_GAP),
      );
    }
  }

  function adjustEditorHeight() {
    setEditorHeight();
    delay(() => editorRef.current?.layout(), 0);
  }

  function goToPrevValue() {
    if (editorRef.current) {
      if (editorRef.current.getPosition()?.lineNumber === 1) {
        setPrevValueIndex((currentPrevValueIndex) => {
          if (currentPrevValueIndex === 0) {
            return cellsRef.current.length - 1;
          }

          if (currentPrevValueIndex === 1) delay(adjustEditorHeight, 0);

          return currentPrevValueIndex - 1;
        });
      } else {
        currentValue.current = editorRef.current.getValue();
        // @ts-expect-error there is a _triggerCommand internal method
        editorRef.current._triggerCommand('cursorUp', { auto: true }); // eslint-disable-line
      }
    }
  }

  function goToNextValue() {
    const currentContent = editorRef.current?.getValue();
    const lines = currentContent?.split('\n');
    if (editorRef.current?.getPosition()?.lineNumber === lines?.length) {
      setPrevValueIndex((currentPrevValueIndex) => {
        if (currentPrevValueIndex === cellsRef.current.length - 1) {
          delay(adjustEditorHeight, 0);
          return 0;
        }

        return currentPrevValueIndex + 1;
      });
    } else {
      currentValue.current = currentContent;
      // @ts-expect-error there is a _triggerCommand internal method
      editorRef.current._triggerCommand('cursorDown', { auto: true }); // eslint-disable-line
    }
  }

  function submitComplexInput(base64: string) {
    editorRef.current?.setValue(
      `${getTempVariablePrefix(complexInput)}_${index + 1} = ${base64.replace(
        /^data:.+;base64,/,
        "b'",
      )}'`,
    );
    handleRun();
  }

  function handleEditorMount(editor: monacoType.editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor;
    props.editorRef.current = editor;
    monacoRef.current = monaco;
    setEditorHeight();

    containerRef.current?.scrollIntoView(false);

    setIsEditorReady(true);

    editor.addAction({
      id: 'run',
      label: 'Run the cell',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      ],
      run: handleRun,
    });

    editor.addCommand(monaco.KeyCode.UpArrow, goToPrevValue, UP_DOWN_ARROW_COMMAND_CONTEXT);
    editor.addCommand(monaco.KeyCode.DownArrow, goToNextValue, UP_DOWN_ARROW_COMMAND_CONTEXT);

    editor.addCommand(monaco.KeyCode.Enter, handleEnter, UP_DOWN_ARROW_COMMAND_CONTEXT);
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      handleRun,
      UP_DOWN_ARROW_COMMAND_CONTEXT,
    );
    editor.addAction({
      id: 'apply-enter',
      label: 'Apply enter',
      keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Enter],
      run: applyEnter,
    });

    editor.addAction({
      id: 'clear-line',
      label: 'Clear line',
      keybindings: [monaco.KeyMod.WinCtrl | monaco.KeyCode.KeyC],
      run: interruptCommand,
    });

    editor.addAction({
      id: 'clean-screen',
      label: 'Clean screen',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
      run: cleanScreen,
    });

    editor.addAction({
      id: 'clean-screen-ctrl',
      label: 'Clean screen',
      keybindings: [monaco.KeyMod.WinCtrl | monaco.KeyCode.KeyL],
      run: cleanScreen,
    });

    editor.onDidChangeModelContent(() => {
      adjustEditorHeight();
    });
  }

  useEffect(() => {
    if (isEditorReady) {
      editorRef.current?.layout();
      delay(() => editorRef.current?.focus(), 0, 0);
    }
  }, [isEditorReady]);

  useEffect(() => {
    let disposable: RegisteredCompletionItemProvider;
    if (isEditorReady && monacoRef.current) {
      disposable = setupAutocompletion(monacoRef.current, complexInputPredicate, completionItems);
    }

    return () => {
      disposable?.dispose();
    };
  }, [isEditorReady]);

  const editorValue =
    prevValueIndex === cells.length - 1
      ? currentValue.current
      : cells[prevValueIndex]?.input?.code ?? '';

  const result = getResult(cell.output);

  return (
    <Container ref={containerRef}>
      <Input>
        <InputIndex isLoading={isLoading} index={index + 1} value={editorRef.current?.getValue()} />

        <EditorContainer style={{ height }}>
          <Editor
            language="python"
            height="100%"
            theme={config.theme}
            onMount={handleEditorMount}
            beforeMount={setupMonaco}
            options={{
              ...EDITOR_OPTIONS,
              automaticLayout: !isEditorReady,
              readOnly: isLoading,
            }}
            value={editorValue}
            loading=""
          />
        </EditorContainer>
      </Input>
      {complexInput && <ComplexInput onSubmit={submitComplexInput} type={complexInput} />}
      {result && (
        <Output>
          <OutputIndex index={index + 1} />
          <ResultContainer style={{ color: theme.colors.text }}>{result}</ResultContainer>
        </Output>
      )}
    </Container>
  );
}

export default InputCell;
