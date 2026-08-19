import React from 'react';
import type { Components } from 'react-markdown';
import type { MarkdownAstNode, MarkdownRendererProps } from './markdown/types';
import {
  extractTextFromMarkdownAst,
  extractTextFromReactNode,
  getDomProps,
  joinClassNames
} from './markdown/utils';
import {
  EchartsComponent,
  MermaidChart,
  normalizeMermaidSource
} from './markdown/renderers/charts';
import {
  FEISHU_MARKER_CLASS,
  feishuMarkdownRenderers,
  getFeishuAlignClass
} from './markdown/renderers/feishu';
import { mathMarkdownRenderers } from './markdown/renderers/math';
import { mediaMarkdownRenderers } from './markdown/renderers/media';
import { tableMarkdownRenderers } from './markdown/renderers/table';

const highlightStyles = {
  red: {
    container: 'not-prose bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/20 dark:to-red-900/10 border border-red-200 dark:border-red-900/50 p-4 my-4 rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none',
    icon: 'w-24 h-24 text-red-500/20 dark:text-red-500/5',
    content: 'relative z-10 m-0 text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-[1.8] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0',
    title: 'font-bold text-red-700 dark:text-red-400 text-sm'
  },
  orange: {
    container: 'not-prose bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-950/20 dark:to-orange-900/10 border border-orange-200 dark:border-orange-900/50 p-4 my-4 rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none',
    icon: 'w-24 h-24 text-orange-500/20 dark:text-orange-500/5',
    content: 'relative z-10 m-0 text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-[1.8] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0',
    title: 'font-bold text-orange-700 dark:text-orange-400 text-sm'
  },
  blue: {
    container: 'not-prose bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-900/50 p-4 my-4 rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none',
    icon: 'w-24 h-24 text-blue-500/20 dark:text-blue-500/5',
    content: 'relative z-10 m-0 text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-[1.8] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0',
    title: 'font-bold text-blue-700 dark:text-blue-400 text-sm'
  },
  green: {
    container: 'not-prose bg-gradient-to-r from-emerald-50 to-emerald-50/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-900/50 p-4 my-4 rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none',
    icon: 'w-24 h-24 text-emerald-500/20 dark:text-emerald-500/5',
    content: 'relative z-10 m-0 text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-[1.8] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0',
    title: 'font-bold text-emerald-700 dark:text-emerald-400 text-sm'
  },
  purple: {
    container: 'not-prose bg-gradient-to-r from-purple-50 to-purple-50/50 dark:from-purple-950/20 dark:to-purple-900/10 border border-purple-200 dark:border-purple-900/50 p-4 my-4 rounded-2xl relative overflow-hidden shadow-sm dark:shadow-none',
    icon: 'w-24 h-24 text-purple-500/20 dark:text-purple-500/5',
    content: 'relative z-10 m-0 text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-[1.8] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0',
    title: 'font-bold text-purple-700 dark:text-purple-400 text-sm'
  }
};

type HighlightType = keyof typeof highlightStyles;

const BLOCK_CHILD_TAGS = new Set([
  'img',
  'video',
  'iframe',
  'math-block',
  'attachment-file',
  'callout',
  'checkbox',
  'grid',
  'whiteboard',
  'base_ref',
  'bitable',
  'chat_card',
  'okr',
  'sheet',
  'source',
  'synced_reference',
  'synced_source',
  'task'
]);

function extractHighlightData(children: React.ReactNode): {
  type: HighlightType | null;
  title: React.ReactNode[] | null;
  newChildren: React.ReactNode;
} {
  let type: HighlightType | null = null;
  let titleNodes: React.ReactNode[] = [];
  let state: 'search' | 'title' | 'done' = 'search';
  let markerFound = false;
  let titleClosed = false;

  const processChildren = (childs: React.ReactNode): React.ReactNode => {
    return React.Children.map(childs, (child) => {
      if (state === 'done') {
        return child;
      }

      if (typeof child === 'string') {
        if (state === 'search') {
          const match = child.match(
            /^\s*\[!(red|orange|blue|green|purple)\](?: (.*?))?(?=\n|$)/
          );
          if (!match) {
            return child;
          }
          type = match[1] as HighlightType;
          markerFound = true;
          const capturedTitle = match[2] ?? '';
          const rest = child.slice(match[0].length);
          const newlineIndex = rest.indexOf('\n');
          if (newlineIndex >= 0) {
            titleNodes.push(capturedTitle);
            state = 'done';
            titleClosed = true;
            return rest.slice(newlineIndex + 1);
          }
          titleNodes.push(capturedTitle + rest);
          state = 'title';
          return '';
        }

        // state === 'title'：继续收集第一行内容，直到换行
        const newlineIndex = child.indexOf('\n');
        if (newlineIndex >= 0) {
          titleNodes.push(child.slice(0, newlineIndex));
          state = 'done';
          titleClosed = true;
          return child.slice(newlineIndex + 1);
        }
        titleNodes.push(child);
        return '';
      }

      if (React.isValidElement(child)) {
        const props = child.props as { children?: React.ReactNode; [key: string]: unknown };
        if (state === 'title') {
          titleNodes.push(child);
          return null;
        }
        if (props?.children) {
          const newChild = React.cloneElement(child, {
            ...props,
            children: processChildren(props.children)
          } as React.Attributes);
          // 标记出现在该元素内部且第一行未换行：元素结束即段落结束，停止收集标题
          if (markerFound && !titleClosed) {
            state = 'done';
          }
          return newChild;
        }
        return child;
      }

      return child;
    });
  };

  const newChildren = processChildren(children);

  if (titleNodes.length > 0) {
    const first = titleNodes[0];
    if (typeof first === 'string') {
      titleNodes[0] = first.trimStart();
    }
    const last = titleNodes[titleNodes.length - 1];
    if (typeof last === 'string') {
      titleNodes[titleNodes.length - 1] = last.trimEnd();
    }
    titleNodes = titleNodes.filter((node) => node !== '');
  }

  return { type, title: titleNodes.length > 0 ? titleNodes : null, newChildren };
}

function extractText(node: unknown): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (
    node &&
    typeof node === 'object' &&
    'props' in node &&
    node.props &&
    typeof node.props === 'object' &&
    'children' in node.props
  ) {
    return extractText(node.props.children);
  }
  return '';
}

export const markdownComponents: Components & Record<string, unknown> = {
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className={joinClassNames(
        'list-disc pl-6 text-slate-900 dark:text-[#dfe1e5] [&_ul]:list-disc',
        FEISHU_MARKER_CLASS,
        props.className
      )}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className={joinClassNames(
        'list-decimal pl-6 text-slate-900 dark:text-[#dfe1e5]',
        FEISHU_MARKER_CLASS,
        props.className
      )}
    >
      {children}
    </ol>
  ),
  p: ({ node, children, ...props }) => {
    const hasBlockChild = node?.children?.some(
      (child) =>
        child.type === 'element' &&
        typeof child.tagName === 'string' &&
        BLOCK_CHILD_TAGS.has(child.tagName)
    );

    if (hasBlockChild) {
      return <div className="my-5" {...props}>{children}</div>;
    }

    return (
      <p {...props} className={joinClassNames(props.className)}>
        {children}
      </p>
    );
  },
  title: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    const titleText = extractTextFromReactNode(children).trim();
    if (!titleText) {
      return null;
    }

    return (
      <h1
        className={joinClassNames(
          'text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-[#f1f3f5]',
          getFeishuAlignClass(markdownProps.align),
          markdownProps.className
        )}
      >
        {children}
      </h1>
    );
  },
  blockquote: ({ children, ...props }) => {
    const domProps = getDomProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>>(props);
    const { type, title, newChildren } = extractHighlightData(children);

    if (type) {
      const style = highlightStyles[type];

      return (
        <div className={style.container}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className={style.icon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.714 4.02-8.623 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.714 4.02-8.623 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z"></path>
            </svg>
          </div>
          <div className={style.content}>
            {title && (
              <div className={`not-prose font-bold mb-2 text-base md:text-lg ${style.title.split(' ').filter((c) => c.startsWith('text-') && !c.includes('text-sm')).join(' ')}`}>
                {title}
              </div>
            )}
            {newChildren}
          </div>
        </div>
      );
    }

    return <blockquote className="not-prose border-l-4 border-slate-300 dark:border-[#4b525c] bg-slate-50 dark:bg-[#292d33] px-5 py-4 my-4 rounded-r-lg text-slate-700 dark:text-[#c9cdd4] text-[15px] sm:text-base leading-[1.8]" {...domProps}>{children}</blockquote>;
  },
  pre: ({ children, ...props }) => {
    const domProps = getDomProps<React.HTMLAttributes<HTMLPreElement>>(props);
    const childrenArray = React.Children.toArray(children);
    let isChart = false;
    let language = '';
    let codeContent = '';

    for (const child of childrenArray) {
      if (!React.isValidElement(child)) {
        continue;
      }

      const childProps = child.props as MarkdownRendererProps & {
        node?: MarkdownAstNode;
      };
      const className = childProps?.className || '';
      const match = /language-(\w+)/.exec(className);

      if (!match) {
        continue;
      }

      language = match[1];
      if (language === 'mermaid' || language === 'echarts') {
        isChart = true;
        codeContent =
          extractTextFromMarkdownAst(childProps?.node as MarkdownAstNode | undefined) ||
          extractText(childProps?.children || '');

        if (language === 'mermaid') {
          codeContent = normalizeMermaidSource(codeContent);
        }
        break;
      }
    }

    if (isChart) {
      if (language === 'mermaid') {
        return <div className="not-prose my-6 w-full flex justify-center"><MermaidChart chart={codeContent.replace(/\n$/, '')} /></div>;
      }
      if (language === 'echarts') {
        return <div className="not-prose my-6 w-full flex justify-center"><EchartsComponent optionsStr={codeContent} /></div>;
      }
    }

    return (
      <div className="relative my-6 overflow-hidden rounded-xl bg-[#202124] shadow-xl ring-1 ring-black/10 dark:ring-white/10">
        <div className="flex items-center px-4 py-2.5 bg-[#2b2f36]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
        </div>
        <div className="overflow-x-auto p-4">
          <pre className="m-0 bg-transparent p-0 text-[13px] sm:text-sm leading-[1.7] text-[#f1f3f5] font-mono [&_code]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!text-inherit [&_code]:!text-[inherit]" {...domProps}>
            {children}
          </pre>
        </div>
      </div>
    );
  },
  code: ({ className, children, ...props }) => {
    const domProps = getDomProps<React.HTMLAttributes<HTMLElement>>(props);
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="not-prose bg-slate-100 dark:bg-[#2b2f36] text-[#d83931] dark:text-[#ff9c8f] px-[0.3em] py-[0.1em] mx-[0.1em] rounded-[4px] font-mono text-[0.85em] border border-slate-200 dark:border-[#4b525c]"
          {...domProps}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={joinClassNames(
          className,
          'border-0 bg-transparent p-0 text-inherit'
        )}
        {...domProps}
      >
        {children}
      </code>
    );
  },
  u: ({ children, ...props }) => (
    <u className="underline underline-offset-4 decoration-slate-400 dark:decoration-slate-500" {...props}>
      {children}
    </u>
  ),
  ...feishuMarkdownRenderers,
  ...mediaMarkdownRenderers,
  a: ({ children, ...props }) => (
    <a
      className="text-[#3370ff] dark:text-[#5e8cfc] no-underline hover:underline underline-offset-4 font-medium transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props) => (
    <hr className="my-5 sm:my-6 border-0 border-b border-slate-200 dark:border-[#373c43]" {...props} />
  ),
  ...tableMarkdownRenderers,
  kbd: ({ children, ...props }) => (
    <kbd className="not-prose inline-flex items-center justify-center px-[0.3em] py-[0.1em] mx-[0.1em] text-[0.85em] font-sans font-medium text-slate-700 dark:text-[#dfe1e5] bg-white dark:bg-[#2b2f36] border border-slate-200 dark:border-[#4b525c] rounded-[4px] shadow-sm" {...props}>
      {children}
    </kbd>
  ),
  mark: ({ children, ...props }) => (
    <mark
      {...getDomProps<React.HTMLAttributes<HTMLElement>>(props)}
      className={joinClassNames('bg-yellow-100 dark:bg-[#45391e] px-1 rounded-[2px] text-inherit', (props as { className?: string }).className)}
    >
      {children}
    </mark>
  ),
  strong: ({ children, ...props }) => (
    <strong {...getDomProps<React.HTMLAttributes<HTMLElement>>(props)} className={joinClassNames('font-bold', (props as { className?: string }).className)}>
      {children}
    </strong>
  ),
  li: ({ className, children, ...props }) => {
    const isTaskListItem = className === 'task-list-item';
    return (
      <li
        className={joinClassNames(
          className,
          isTaskListItem ? 'flex items-start list-none ml-[-1.5em] [&>input]:mt-[0.4rem] [&>input]:mr-2' : undefined
        )}
        {...props}
      >
        {children}
      </li>
    );
  },
  ...mathMarkdownRenderers
};
