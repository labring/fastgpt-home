import type { Components } from 'react-markdown';
import { lazy, Suspense } from 'react';
import type { MarkdownRendererProps } from '../types';
import { extractTextFromReactNode, joinClassNames } from '../utils';

// KaTeX（约 270KB 含 CSS）仅在正文出现数学公式时按需加载，
// 避免把渲染器静态打进每个详情页首包。模块级 Promise 保证多次调用共享一次加载。
let katexPromise: Promise<typeof import('katex')> | null = null;

function loadKatex() {
  if (!katexPromise) {
    katexPromise = Promise.all([
      import('katex/dist/katex.min.css'),
      import('katex')
    ]).then(([, mod]) => mod);
  }
  return katexPromise;
}

/** 异步渲染 KaTeX 公式；失败时返回空串（调用方回退为原文展示）。 */
export async function renderMathFormula(formula: string, displayMode: boolean) {
  try {
    const katex = await loadKatex();
    return katex.default.renderToString(formula, {
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

const MathFormula = lazy(async () => {
  const katex = await loadKatex();

  return {
    default: function MathFormula({
      formula,
      displayMode,
      block = false,
      className
    }: {
      formula: string;
      displayMode: boolean;
      block?: boolean;
      className?: string;
    }) {
      let html = '';
      try {
        html = katex.default.renderToString(formula, {
          displayMode,
          throwOnError: false,
          output: 'htmlAndMathml',
          strict: 'ignore'
        });
      } catch (error) {
        console.error('KaTeX render failed', error);
      }

      if (!html) {
        return block ? (
          <pre className="not-prose my-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm dark:bg-[#2b2f36]">
            {formula}
          </pre>
        ) : (
          <code>{formula}</code>
        );
      }

      if (block) {
        return (
          <div
            className="not-prose scrollbar-hidden my-6 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-5 dark:border-[#373c43] dark:bg-[#292d33]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      return (
        <span
          className={joinClassNames(
            'not-prose scrollbar-hidden inline-flex max-w-full overflow-x-auto align-middle',
            className
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  };
});

export const mathMarkdownRenderers: Components & Record<string, unknown> = {
  latex: ({ children, ...props }: MarkdownRendererProps) => {
    const formula = extractTextFromReactNode(children).trim();
    return (
      <Suspense fallback={<code>{formula}</code>}>
        <MathFormula formula={formula} displayMode={false} className={props.className} />
      </Suspense>
    );
  },
  'math-inline': (props: { node?: unknown } & MarkdownRendererProps) => {
    const formula = String(props['data-formula'] || '');
    return (
      <Suspense fallback={<code>{formula}</code>}>
        <MathFormula
          formula={formula}
          displayMode={props['data-display'] === 'true'}
        />
      </Suspense>
    );
  },
  'math-block': (props: { node?: unknown } & MarkdownRendererProps) => {
    const formula = String(props['data-formula'] || '');
    return (
      <Suspense
        fallback={
          <pre className="not-prose my-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-sm dark:bg-[#2b2f36]">
            {formula}
          </pre>
        }
      >
        <MathFormula formula={formula} displayMode={true} block />
      </Suspense>
    );
  }
};
