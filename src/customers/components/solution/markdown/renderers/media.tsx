import type { Components } from 'react-markdown';
import type { MarkdownRendererProps } from '../types';
import { withBasePath } from '@customers/lib/base-path';

const FILE_ICON_BASE_PATH = '/文件类型icon';
const FILE_ICON_BY_EXTENSION: Record<string, string> = {
  csv: 'csv.svg',
  doc: 'docx.svg',
  docx: 'docx.svg',
  htm: 'html.svg',
  html: 'html.svg',
  jpeg: 'jpeg.svg',
  jpg: 'jpg.svg',
  md: 'md.png',
  markdown: 'md.png',
  pdf: 'pdf.svg',
  png: 'png.svg',
  ppt: 'pptx.svg',
  pptx: 'pptx.svg',
  text: 'txt.svg',
  txt: 'txt.svg',
  xls: 'xlsx.svg',
  xlsx: 'xlsx.svg'
};

export function getAttachmentFileName(href: string, explicitName?: string) {
  if (explicitName?.trim()) {
    return explicitName.trim();
  }

  try {
    const url = new URL(href, 'https://fastgpt.local');
    const encodedSegment = url.pathname.split('/').filter(Boolean).pop();
    return encodedSegment ? decodeURIComponent(encodedSegment) : href;
  } catch {
    const segments = href.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment ? decodeURIComponent(lastSegment) : href;
  }
}

export function getAttachmentExtension(fileName: string) {
  const match = /\.([a-z0-9]+)$/i.exec(fileName.trim());
  return match ? match[1].toLowerCase() : '';
}

export function getAttachmentIconPath(fileName: string) {
  const extension = getAttachmentExtension(fileName);
  const iconName = FILE_ICON_BY_EXTENSION[extension] || 'fastgpt-withtext.svg';
  return withBasePath(`${FILE_ICON_BASE_PATH}/${iconName}`);
}

export function formatAttachmentFileSize(sizeValue: string) {
  const size = Number(sizeValue);
  if (!Number.isFinite(size) || size < 0) {
    return '未知大小';
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(size >= 10 * 1024 ? 0 : 1)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  }

  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export const mediaMarkdownRenderers: Components & Record<string, unknown> = {
  'attachment-file': (props: { node?: unknown } & MarkdownRendererProps) => {
    const href = String(props.href || '').trim();
    if (!href) {
      return null;
    }

    const fileName = getAttachmentFileName(href, String(props.name || ''));
    const extension = getAttachmentExtension(fileName);
    const iconPath = getAttachmentIconPath(fileName);
    const fileSize = formatAttachmentFileSize(String(props.size || ''));

    return (
      <a
        href={withBasePath(href)}
        target="_blank"
        rel="noreferrer"
        download={fileName}
        className="group not-prose my-4 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 no-underline shadow-sm transition-colors hover:border-[#3370ff]/30 hover:bg-blue-50/70    "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconPath}
          alt={extension ? `${extension} file icon` : 'file icon'}
          className="h-11 w-11 shrink-0 object-contain"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium text-slate-900 ">{fileName}</span>
          <span className="mt-1 block text-xs tracking-wide text-[#3370ff] ">{fileSize}</span>
        </span>
        <span className="shrink-0 rounded-lg bg-[#3370ff] px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-[#245bdb]   ">
          下载
        </span>
      </a>
    );
  },
  img: (props) => {
    const imageSrc = typeof props.src === 'string' ? withBasePath(props.src.trim()) : '';
    const imageAlt = props.alt || '';

    if (!imageSrc) {
      return (
        <span className="flex flex-col items-center justify-center my-0! w-full bg-transparent">
          <span className="flex w-full max-w-3xl items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500   ">
            {imageAlt || '图片地址为空，暂不渲染预览'}
          </span>
        </span>
      );
    }

    const rawWidth = props.width;
    const isPercentWidth = typeof rawWidth === 'string' && rawWidth.endsWith('%');
    const isPixelWidth =
      (typeof rawWidth === 'string' && !rawWidth.endsWith('%')) || typeof rawWidth === 'number';
    const hasCustomWidth = isPercentWidth || isPixelWidth;
    const spanClass = isPercentWidth
      ? 'block relative overflow-hidden rounded-2xl bg-transparent w-full max-w-3xl'
      : isPixelWidth
      ? 'block relative overflow-hidden rounded-2xl bg-transparent mx-auto'
      : 'block relative overflow-hidden rounded-2xl bg-transparent w-full max-w-3xl';
    const imgClass = 'm-0! my-0! h-auto object-contain bg-transparent w-full';

    return (
      <span className="flex flex-col items-center justify-center my-0! w-full bg-transparent">
        <span
          className={spanClass}
          style={hasCustomWidth ? { width: rawWidth as string } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={imgClass} {...props} src={imageSrc} alt={imageAlt} loading="lazy" />
        </span>
        {imageAlt && (
          <span className="mt-2 text-[13px] sm:text-sm text-gray-500  font-medium text-center">
            {imageAlt}
          </span>
        )}
      </span>
    );
  },
  video: (props) => (
    <span className="flex flex-col items-center justify-center my-0! w-full bg-transparent">
      <span className="block relative overflow-hidden w-full max-w-3xl rounded-2xl bg-transparent">
        <video
          className="m-0! my-0! w-full h-auto object-contain bg-transparent"
          {...props}
          controls
        />
      </span>
      {props.title && (
        <span className="mt-2 text-[13px] sm:text-sm text-gray-500  font-medium text-center">
          {props.title}
        </span>
      )}
    </span>
  )
};
