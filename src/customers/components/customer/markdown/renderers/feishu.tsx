import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import type { Components } from 'react-markdown';
import type { MarkdownRendererProps } from '../types';
import { extractTextFromReactNode, getStringProp, joinClassNames } from '../utils';
import { MermaidChart } from './charts';

export const FEISHU_MARKER_CLASS = 'marker:text-[#3370ff] dark:marker:text-[#5e8cfc]';

export function getFeishuAlignClass(align: unknown) {
  switch (getStringProp(align)) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return undefined;
  }
}

const feishuTextColorClasses: Record<string, string> = {
  red: 'text-red-700 dark:text-[#ff9c8f]',
  orange: 'text-orange-700 dark:text-[#f7b267]',
  yellow: 'text-yellow-700 dark:text-[#d8b84e]',
  green: 'text-emerald-700 dark:text-[#7bcf9a]',
  blue: 'text-blue-700 dark:text-[#8ab4f8]',
  purple: 'text-purple-700 dark:text-[#c8a7ff]',
  gray: 'text-slate-600 dark:text-[#b8bcc2]'
};

const feishuBackgroundColorClasses: Record<string, string> = {
  red: 'bg-red-100 dark:bg-[#4a2828]',
  orange: 'bg-orange-100 dark:bg-[#49321f]',
  yellow: 'bg-yellow-100 dark:bg-[#45391e]',
  green: 'bg-emerald-100 dark:bg-[#203f32]',
  blue: 'bg-blue-100 dark:bg-[#203652]',
  purple: 'bg-purple-100 dark:bg-[#3a2d52]',
  gray: 'bg-slate-100 dark:bg-[#2b2f36]',
  'light-red': 'bg-red-50 dark:bg-[#332629]',
  'light-orange': 'bg-orange-50 dark:bg-[#332a22]',
  'light-yellow': 'bg-yellow-50 dark:bg-[#302d22]',
  'light-green': 'bg-emerald-50 dark:bg-[#223029]',
  'light-blue': 'bg-blue-50 dark:bg-[#222c3a]',
  'light-purple': 'bg-purple-50 dark:bg-[#2b2637]',
  'light-gray': 'bg-slate-50 dark:bg-[#292d33]',
  'medium-red': 'bg-red-100 dark:bg-[#4a2828]',
  'medium-orange': 'bg-orange-100 dark:bg-[#49321f]',
  'medium-yellow': 'bg-yellow-100 dark:bg-[#45391e]',
  'medium-green': 'bg-emerald-100 dark:bg-[#203f32]',
  'medium-blue': 'bg-blue-100 dark:bg-[#203652]',
  'medium-purple': 'bg-purple-100 dark:bg-[#3a2d52]',
  'medium-gray': 'bg-slate-200 dark:bg-[#373c43]'
};

const feishuBorderColorClasses: Record<string, string> = {
  red: 'border-red-200 dark:border-[#7a3a35]',
  orange: 'border-orange-200 dark:border-[#76502b]',
  yellow: 'border-yellow-200 dark:border-[#6e5a2f]',
  green: 'border-emerald-200 dark:border-[#3d6b50]',
  blue: 'border-blue-200 dark:border-[#3d5f8e]',
  purple: 'border-purple-200 dark:border-[#67508f]',
  gray: 'border-slate-200 dark:border-[#4b525c]'
};

export function getFeishuTextColorClass(value: unknown) {
  return feishuTextColorClasses[getStringProp(value)] ?? undefined;
}

export function getFeishuBackgroundColorClass(value: unknown) {
  return feishuBackgroundColorClasses[getStringProp(value)] ?? undefined;
}

function getFeishuBorderColorClass(value: unknown) {
  return feishuBorderColorClasses[getStringProp(value)] ?? undefined;
}

export function getFeishuTableVerticalAlignClass(value: unknown) {
  switch (getStringProp(value)) {
    case 'top':
      return 'align-top';
    case 'bottom':
      return 'align-bottom';
    case 'middle':
      return 'align-middle';
    default:
      return undefined;
  }
}

export function formatFeishuTime(value: unknown) {
  const timestamp = Number(getStringProp(value));
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return '';
  }

  try {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  } catch {
    return '';
  }
}

const unsupportedFeishuResourceLabels: Record<string, string> = {
  base_ref: '多维表格引用',
  bitable: '多维表格',
  chat_card: '群聊卡片',
  okr: 'OKR',
  sheet: '电子表格',
  source: '飞书附件',
  synced_reference: '同步块',
  synced_source: '同步块源',
  task: '飞书任务'
};

function getFeishuResourceHref(props: MarkdownRendererProps) {
  return getStringProp(props.href) || getStringProp(props.src) || getStringProp(props.url);
}

function getFeishuResourceTitle(tagName: string, props: MarkdownRendererProps, children: React.ReactNode) {
  const explicitTitle =
    getStringProp(props.title) ||
    getStringProp(props.name) ||
    extractTextFromReactNode(children).trim();

  if (explicitTitle) {
    return explicitTitle;
  }

  return `${unsupportedFeishuResourceLabels[tagName] || tagName}暂不可预览`;
}

function renderUnsupportedFeishuResource(
  tagName: keyof typeof unsupportedFeishuResourceLabels,
  props: MarkdownRendererProps
) {
  const { children } = props;
  const href = getFeishuResourceHref(props);
  const label = unsupportedFeishuResourceLabels[tagName];
  const title = getFeishuResourceTitle(tagName, props, children);
  const token = getStringProp(props.token);

  return (
    <div
      className={joinClassNames(
        'not-prose my-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-[#4b525c] dark:bg-[#292d33] dark:text-[#c9cdd4]',
        props.className
      )}
    >
      <div className="font-semibold text-slate-800 dark:text-[#f1f3f5]">
        {label}暂不可预览
      </div>
      <div className="mt-1 leading-6">
        {title}
        {token && <span className="ml-2 text-xs text-slate-400">token: {token}</span>}
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-sm font-medium text-[#3370ff] no-underline hover:underline dark:text-[#5e8cfc]"
        >
          打开资源
        </a>
      )}
    </div>
  );
}

const feishuSource = (props: { node?: unknown } & MarkdownRendererProps) =>
  renderUnsupportedFeishuResource('source', props);

export const feishuMarkdownRenderers: Components & Record<string, unknown> = {
  span: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    const backgroundClass = getFeishuBackgroundColorClass(markdownProps['background-color']);
    const textClass = getFeishuTextColorClass(markdownProps['text-color']);
    const hasFeishuStyle = Boolean(backgroundClass || textClass);

    return (
      <span
        className={joinClassNames(
          textClass,
          backgroundClass,
          hasFeishuStyle ? 'rounded-[4px] px-1 py-0.5' : undefined,
          markdownProps.className
        )}
      >
        {children}
      </span>
    );
  },
  callout: ({ children, ...props }: MarkdownRendererProps) => {
    const emoji = getStringProp(props.emoji) || '💡';
    const backgroundClass =
      getFeishuBackgroundColorClass(props['background-color']) ||
      getFeishuBackgroundColorClass('light-blue');
    const borderClass =
      getFeishuBorderColorClass(props['border-color']) ||
      getFeishuBorderColorClass('blue');
    const textClass = getFeishuTextColorClass(props['text-color']);

    return (
      <div
        className={joinClassNames(
          'not-prose my-5 flex gap-3 rounded-2xl border p-4 shadow-sm',
          backgroundClass,
          borderClass,
          textClass,
          props.className
        )}
      >
        <span className="mt-0.5 shrink-0 text-xl leading-none" aria-hidden="true">
          {emoji}
        </span>
        <div className="min-w-0 flex-1 text-[15px] leading-[1.8] text-slate-900 dark:text-[#dfe1e5] [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2">
          {children}
        </div>
      </div>
    );
  },
  checkbox: ({ children, ...props }: MarkdownRendererProps) => {
    const done = getStringProp(props.done).toLowerCase() === 'true';

    return (
      <div
        className={joinClassNames(
          'not-prose my-2 flex items-start gap-2 text-[15px] leading-[1.75] text-slate-900 dark:text-[#dfe1e5]',
          getFeishuAlignClass(props.align),
          props.className
        )}
      >
        <span
          className={joinClassNames(
            'mt-[0.35rem] flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold',
            done
              ? 'border-[#3370ff] bg-[#3370ff] text-white dark:border-[#5e8cfc] dark:bg-[#5e8cfc] dark:text-[#202124]'
              : 'border-slate-300 bg-white text-transparent dark:border-[#4b525c] dark:bg-[#202124]'
          )}
          aria-hidden="true"
        >
          ✓
        </span>
        <span className={done ? 'text-slate-500 line-through decoration-slate-400 dark:text-slate-400' : undefined}>
          {children}
        </span>
      </div>
    );
  },
  button: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    const src = getStringProp(markdownProps.src || markdownProps.href);
    const action = getStringProp(markdownProps.action) || 'OpenLink';
    const backgroundClass =
      getFeishuBackgroundColorClass(markdownProps['background-color']) ||
      getFeishuBackgroundColorClass('light-blue');
    const label = children || (src ? '打开链接' : action);

    if (!src) {
      return (
        <span
          className={joinClassNames(
            'not-prose my-2 inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300',
            backgroundClass,
            markdownProps.className
          )}
        >
          {label}
        </span>
      );
    }

    return (
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className={joinClassNames(
          'not-prose my-2 inline-flex items-center rounded-lg border border-[#3370ff]/20 px-3 py-1.5 text-sm font-semibold text-[#3370ff] no-underline transition-colors hover:border-[#3370ff]/40 hover:bg-blue-50 dark:border-[#5e8cfc]/30 dark:text-[#5e8cfc] dark:hover:bg-blue-950/30',
          backgroundClass,
          markdownProps.className
        )}
      >
        {label}
      </a>
    );
  },
  time: ({ children, ...props }) => {
    const markdownProps = props as MarkdownRendererProps;
    const expireText = formatFeishuTime(markdownProps['expire-time']);
    const notifyText = formatFeishuTime(markdownProps['notify-time']);
    const shouldNotify = getStringProp(markdownProps['should-notify']).toLowerCase() === 'true';

    return (
      <span
        className={joinClassNames(
          'not-prose inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-[#4b525c] dark:bg-[#292d33] dark:text-[#c9cdd4]',
          markdownProps.className
        )}
      >
        <span>{children || expireText || '时间'}</span>
        {expireText && children && <span className="text-slate-400">· {expireText}</span>}
        {notifyText && shouldNotify && <span className="text-slate-400">提醒 {notifyText}</span>}
      </span>
    );
  },
  bookmark: ({ children, ...props }: MarkdownRendererProps) => {
    const href = getStringProp(props.href || props.url || props.src);
    const label =
      extractTextFromReactNode(children).trim() ||
      getStringProp(props.name) ||
      getStringProp(props.title) ||
      href ||
      '书签';
    const content = (
      <>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3370ff]/10 text-[#3370ff] dark:bg-[#5e8cfc]/15 dark:text-[#8ab4f8]">
          ↗
        </span>
        <span className="min-w-0 flex-1 truncate text-[15px] font-medium">
          {label}
        </span>
      </>
    );

    if (!href) {
      return (
        <span
          className={joinClassNames(
            'not-prose my-3 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 dark:border-[#373c43] dark:bg-[#292d33] dark:text-[#dfe1e5]',
            props.className
          )}
        >
          {content}
        </span>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={joinClassNames(
          'not-prose my-3 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 no-underline shadow-sm transition-colors hover:border-[#3370ff]/40 hover:bg-blue-50 dark:border-[#373c43] dark:bg-[#292d33] dark:text-[#f1f3f5] dark:hover:border-[#5e8cfc]/40 dark:hover:bg-[#30343b]',
          props.className
        )}
      >
        {content}
      </a>
    );
  },
  grid: ({ children, ...props }: MarkdownRendererProps) => (
    <div
      className={joinClassNames(
        'not-prose my-6 grid gap-4 md:grid-flow-col md:auto-cols-fr',
        props.className
      )}
    >
      {children}
    </div>
  ),
  column: ({ children, ...props }: MarkdownRendererProps) => {
    const widthRatio = Number(getStringProp(props['width-ratio']));
    const style = Number.isFinite(widthRatio) && widthRatio > 0
      ? { flex: `${widthRatio} 1 0%` }
      : undefined;

    return (
      <div
        style={style}
        className={joinClassNames(
          'min-w-0 p-0 text-slate-900 dark:text-[#dfe1e5]',
          props.className
        )}
      >
        {children}
      </div>
    );
  },
  whiteboard: ({ children, ...props }: MarkdownRendererProps) => {
    const type = getStringProp(props.type) || 'blank';
    const content = extractTextFromReactNode(children).trim();

    if (type === 'mermaid') {
      return (
        <div className="not-prose my-8 w-full flex justify-center">
          <MermaidChart chart={content} />
        </div>
      );
    }

    if (type === 'svg') {
      // 飞书画板导出的 SVG 属不可信内容：用 DOMPurify 白名单净化，
      // 仅保留 SVG 标签并剥离所有 on* 事件属性与脚本，防止存储型 XSS。
      const sanitizedSvg = DOMPurify.sanitize(content, {
        USE_PROFILES: { svg: true, svgFilters: true }
      });
      return (
        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#373c43] dark:bg-[#202124]">
          <div
            className="[&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{
              __html: sanitizedSvg
            }}
          />
        </div>
      );
    }

    return (
      <div className="not-prose my-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-[#4b525c] dark:bg-[#292d33] dark:text-[#aeb4bc]">
        {type === 'blank' ? '空白画板暂不可预览。' : `${type} 画板暂不可预览。`}
      </div>
    );
  },
  source: feishuSource as Components['source'],
  sheet: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('sheet', props),
  bitable: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('bitable', props),
  base_ref: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('base_ref', props),
  task: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('task', props),
  chat_card: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('chat_card', props),
  synced_reference: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('synced_reference', props),
  synced_source: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('synced_source', props),
  okr: (props: { node?: unknown } & MarkdownRendererProps) =>
    renderUnsupportedFeishuResource('okr', props)
};
