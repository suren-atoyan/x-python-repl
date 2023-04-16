import * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import { Monaco, loader } from '@monaco-editor/react';
import { CompleteResponse, complete } from '@x-python/core';
import type { CompletionResult, CompletionResults } from '@x-python/core';
import once from 'lodash/once';

import themes from '../themes';
import type { RegisteredCompletionItemProvider, RegisteredCompletionItemProviders } from './types';

/**
 * Some utility functions from this file were borrowed from
 * this -> https://github.com/nteract/nteract/blob/7a0ad1a1b8dfa337615ca8e9decb36da5aedc3ad/packages/monaco-editor/src/completions/completionItemProvider.ts
 * The code quality, naming convention, and coding style of these functions don't match
 * to our standards. There are still a couple of functions that remained untouched; so, we should update them.
 */

const unknownJupyterKind = '<unknown>';

const registeredCompletionItemProviders: RegisteredCompletionItemProviders = {};

function setupAutocompletion(
  monaco: Monaco,
  customCompletionItemsTriggerPredicate?: (code: string) => boolean,
  customCompletionItems?: monacoType.languages.CompletionItem[],
): RegisteredCompletionItemProvider {
  // TODO (Suren): fix this
  const completionItemProviderId = Math.random();
  const registeredCompletionItemProvider =
    registeredCompletionItemProviders[completionItemProviderId] ||
    monaco.languages.registerCompletionItemProvider(
      'python',
      getSuggestions(monaco, customCompletionItemsTriggerPredicate, customCompletionItems),
    );

  if (!registeredCompletionItemProviders[completionItemProviderId]) {
    registeredCompletionItemProviders[completionItemProviderId] = {
      disposable: registeredCompletionItemProvider,
      dispose() {
        this.disposable.dispose();
        delete registeredCompletionItemProviders[completionItemProviderId];
      },
    };
  }

  return registeredCompletionItemProviders[
    completionItemProviderId
  ] as RegisteredCompletionItemProvider;
}

function getSuggestions(
  monaco: Monaco,
  customCompletionItemsTriggerPredicate?: (code: string) => boolean,
  customCompletionItems?: monacoType.languages.CompletionItem[],
) {
  return {
    triggerCharacters: [' ', '<', '/', '.', '='],

    // generate autocompletion results
    async provideCompletionItems(
      model: monacoType.editor.ITextModel,
      position: monacoType.Position,
    ) {
      const code = model.getValue();

      let items: monacoType.languages.CompletionItem[] = [];

      if (customCompletionItemsTriggerPredicate?.(code) && customCompletionItems) {
        items = customCompletionItems;
      } else {
        try {
          const response = await completionRequest(code, position);
          items = adaptToMonacoCompletions(monaco, response.result, model, position) || [];
        } catch (error) {
          // TODO: implement error handling
          /* eslint-disable */
          console.error(error);
        }
      }

      return Promise.resolve<monacoType.languages.CompletionList>({
        suggestions: items,
        incomplete: false,
      });
    },
  };
}

/**
 * Converts Jupyter completion result to list of Monaco completion items.
 */
function adaptToMonacoCompletions(
  monaco: Monaco,
  results: CompletionResults,
  model: monacoType.editor.ITextModel,
  position: monacoType.Position,
) {
  let percentCount = 0;
  let matches = results.matches;

  // retrieve the text that is currently typed out which is used to determine completion
  const context = model.getValueInRange({
    startLineNumber: position.lineNumber,
    startColumn: position.column,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  return matches.map((match: CompletionResult, index: number) => {
    const text = sanitizeText(match.name, context);
    const filtered = getFilterText(text, context);
    const inserted = getInsertText(text, context, percentCount);

    return {
      kind: adaptToMonacoCompletionItemKind(monaco, match.type),
      label: text,
      insertText: inserted,
      filterText: filtered,
      documentation: match.description,
      detail: match.full_name,
      sortText: getSortText(index),
    } as monacoType.languages.CompletionItem;
  });
}

/**
 * Converts Jupyter completion item kind to Monaco completion item kind.
 * @param kind Jupyter completion item kind.
 */
function adaptToMonacoCompletionItemKind(monaco: Monaco, kind: string) {
  const jupyterToMonacoCompletionItemKind: {
    // @ts-ignore
    [key: string]: monaco.languages.CompletionItemKind;
  } = {
    [unknownJupyterKind]: monaco.languages.CompletionItemKind.Field,
    class: monaco.languages.CompletionItemKind.Class,
    function: monaco.languages.CompletionItemKind.Function,
    keyword: monaco.languages.CompletionItemKind.Keyword,
    instance: monaco.languages.CompletionItemKind.Variable,
    statement: monaco.languages.CompletionItemKind.Variable,
  };

  const result = jupyterToMonacoCompletionItemKind[kind];
  return result ? result : jupyterToMonacoCompletionItemKind[unknownJupyterKind];
}

/**
 * Removes problematic prefixes based on the context.
 *
 * Instead of showing "some/path" we should only show "path". For paths with white space, the kernel returns
 * ""some/path with spaces"" which we want to change to ""path with spaces"".
 *
 * Additionally, typing "[]." should not suggest ".append" since this results in "[]..append".
 *
 * @param text Text of Jupyter completion item
 */
function sanitizeText(text: string, context: string) {
  // Assumption: if the current context contains a "/" then we're currently typing a path
  const isPathCompletion = context.includes('/');
  if (isPathCompletion) {
    // If we have whitespace within a path, the completion for it is a string wrapped in double quotes
    // We should return only the last part of the path, wrapped in double quotes
    const completionIsPathWithWhitespace =
      text.startsWith('"') && text.endsWith('"') && text.length > 2; // sanity check: not empty string
    if (completionIsPathWithWhitespace && text.substr(1).startsWith(context)) {
      // sanity check: the context is part of the suggested path
      const toRemove = context.substr(0, context.lastIndexOf('/') + 1);
      return `"${text.substr(toRemove.length + 1)}`;
    }

    // Otherwise, display the most specific item in the path
    if (text.startsWith(context)) {
      // sanity check: the context is part of the suggested path
      const toRemove = context.substr(0, context.lastIndexOf('/') + 1);
      return text.substr(toRemove.length);
    }
  }

  // Handle "." after paths, since those might contain "." as well. Note that we deal with this somewhat
  // generically, but also take a somewhat conservative approach by ensuring that the completion starts with the
  // current context to ensure that we aren't applying this when we shouldn't
  const isMemberCompletion = context.endsWith('.');
  if (isMemberCompletion && text.startsWith(context)) {
    const toRemove = context.substr(0, context.lastIndexOf('.') + 1);
    return text.substr(toRemove.length);
  }

  // Handle taking only the suggestion content after the last dot. There are cases that a kernel when given
  // "suggestion1.itemA" text and typing "." that it will suggest the full path of "suggestion.itemA.itemB" instead of
  // just "itemB". The logic below handles these cases. This also handles the case where given "suggestion1.itemA.it"
  // text and typing "e" will suggest the full path of "suggestion.itemA.itemB" instead of "itemB".
  // This logic also covers that scenario.
  const index = text.lastIndexOf('.');
  if (index > -1 && index < text.length - 1) {
    return text.substring(index + 1);
  }

  return text;
}

/**
 * Get insertion text handling what to insert for the magics case depending on what
 * has already been typed. Also handles an edge case for file paths with "." in the name.
 * @param text Text of Jupyter completion item.
 * @param percentCount Number of percent characters to remove
 */
function getInsertText(text: string, context: string, percentCount: number = 0) {
  // There is an edge case for folders that have "." in the name. The default range for replacements is determined
  // by the "current word" but that doesn't allow "." in the string, so if you autocomplete "some." for a string
  // like "some.folder.name" you end up with "some.some.folder.name".
  const isPathCompletion = context.includes('/');
  const isPathWithPeriodInName = isPathCompletion && text.includes('.') && context.includes('.');
  if (isPathWithPeriodInName) {
    // The text in our sanitization step has already been filtered to only include the most specific path but
    // our context includes the full thing, so we need to determine the substring in the most specific path.
    // This is then used to figure out what we should actually insert.
    // example 1: context = "a/path/to/some." and text = "some.folder.name" should produce "folder.name"
    // example 2: context = "a/path/to/some.fo" and text = "some.folder.name" should still produce "folder.name"
    const completionContext = context.substr(context.lastIndexOf('/') + 1);
    if (text.startsWith(completionContext)) {
      // sanity check: the paths match
      return text.substr(completionContext.lastIndexOf('.') + 1);
    }
  }

  for (let i = 0; i < percentCount; i++) {
    text = text.replace('%', '');
  }
  return text;
}

/**
 * Remove magics all % characters as Monaco doesn't like them for the filtering text.
 * Without this, completion won't show magics match items.
 *
 * Also remove quotes from the filter of a path wrapped in quotes to make sure we have
 * a smooth auto-complete experience.
 *
 * @param text Text of Jupyter completion item.
 */
function getFilterText(text: string, context: string) {
  const isPathCompletion = context.includes('/');
  if (isPathCompletion) {
    const completionIsPathWithWhitespace =
      text.startsWith('"') && text.endsWith('"') && text.length > 2; // sanity check: not empty string
    if (completionIsPathWithWhitespace && text.substr(1).startsWith(context)) {
      // sanity check: the context is part of the suggested path
      return text.substr(1, text.length - 1);
    }
  }
  return text.replace(/%/g, '');
}

/**
 * Maps numbers to strings, such that if a>b numerically, f(a)>f(b) lexicograhically.
 * 1 -> "za", 26 -> "zz", 27 -> "zza", 28 -> "zzb", 52 -> "zzz", 53 ->"zzza"
 * @param order Number to be converted to a sorting-string. order >= 0.
 * @returns A string representing the order.
 */
function getSortText(order: number): string {
  order++;
  const numCharacters = 26; // "z" - "a" + 1;
  const div = Math.floor(order / numCharacters);

  let sortText = 'z';
  for (let i = 0; i < div; i++) {
    sortText += 'z';
  }

  const remainder = order % numCharacters;
  if (remainder > 0) {
    sortText += String.fromCharCode(96 + remainder);
  }
  return sortText;
}

export { setupAutocompletion };

async function completionRequest(
  code: string,
  position: monacoType.Position,
): Promise<CompleteResponse> {
  const data = await complete.repl({
    code,
    line: position.lineNumber,
    column: position.column - 1,
  });

  return data as unknown as CompleteResponse;
}

// there is open issue on 0.33.0 version
// https://github.com/microsoft/monaco-editor/issues/2947
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.31.0/min/vs' } });

const setupMonaco = once((monaco: Monaco) => {
  Object.entries(themes).forEach(([themeName, theme]) => {
    monaco.editor.defineTheme(themeName, theme.monaco as monacoType.editor.IStandaloneThemeData);
  });
});

export { completionRequest, setupMonaco };
