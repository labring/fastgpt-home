import type { Components } from 'react-markdown';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import type { MarkdownRendererProps } from '../types';
import { extractTextFromReactNode, joinClassNames } from '../utils';

export function renderMathFormula(formula: string, displayMode: boolean) {
  try {
    return katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: 'ignore'
    });
  } catch (error) {
    console.error('KaTeX render failed', error);
    return '';
  }
}

export const mathMarkdownRenderers: Components & Record<string, unknown> = {
  latex: ({ children, ...props }: MarkdownRendererProps) => {
    const formula = extractTextFromReactNode(children).trim();
    const html = renderMathFormula(formula, false);

    if (!html) {
      return <code>{formula}</code>;
    }

    return (
      <span
        className={joinClassNames(
          'not-prose scrollbar-hidden inline-flex max-w-full overflow-x-auto align-middle',
          props.className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  },
  'math-inline': (props: { node?: unknown } & MarkdownRendererProps) => {
    const formula = String(props['data-formula'] || '');
    const html = renderMathFormula(
      formula,
      props['data-display'] === 'true'
    );

    if (!html) {
      return <code>{formula}</code>;
    }

    return (
      <span
        className="not-prose scrollbar-hidden inline-flex max-w-full overflow-x-auto align-middle"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  },
  'math-block': (props: { node?: unknown } & MarkdownRendererProps) => {
    const formula = String(props['data-formula'] || '');
    const html = renderMathFormula(formula, true);

    if (!html) {
      return (
        <pre className="not-prose my-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm dark:bg-[#2b2f36]">
          {formula}
        </pre>
      );
    }

    return (
      <div
        className="not-prose scrollbar-hidden my-6 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-5 dark:border-[#373c43] dark:bg-[#292d33]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
};
