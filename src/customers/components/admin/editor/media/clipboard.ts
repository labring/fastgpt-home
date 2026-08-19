export type SupportedContentKind = 'image' | 'video' | 'file';

export interface ClipboardUploadTask {
  file: File;
  placeholder: string;
  contentKind: Extract<SupportedContentKind, 'image' | 'video'>;
  contentLabel?: string;
}

export interface ParsedFrontmatter {
  name?: string;
  description?: string;
  body: string;
}

export function parseFrontmatter(text: string): ParsedFrontmatter | null {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith('---')) return null;

  const afterOpening = trimmed.slice(3);
  const closingIndex = afterOpening.indexOf('\n---');
  if (closingIndex === -1) return null;

  const frontmatterStr = afterOpening.slice(0, closingIndex).trim();
  const body = afterOpening.slice(closingIndex + 4);

  const nameMatch = frontmatterStr.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatterStr.match(/^description:\s*(.+)$/m);

  const name = nameMatch?.[1]?.trim();
  const description = descMatch?.[1]?.trim();

  if (!name && !description) return null;

  return { name, description, body };
}

export function buildUploadPlaceholder(contentKind: SupportedContentKind, randomId = Math.random().toString(36).substring(2, 9)) {
  if (contentKind === 'image') {
    return `![正在上传图片... ${randomId}]()`;
  }

  if (contentKind === 'video') {
    return `> [正在上传视频... ${randomId}]`;
  }

  return `[正在上传文件... ${randomId}]()`;
}

export function getClipboardFileItems(items: DataTransferItemList) {
  return Array.from(items)
    .map((item) => item.getAsFile())
    .filter((file): file is File => Boolean(file))
    .filter(
      (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
    );
}

export function mightContainFeishuRemoteMedia(html: string) {
  return /feishu\.cn|larksuite\.com|larksuitecdn\.com|feishucdn\.com/i.test(html);
}

export function getMediaSource(element: HTMLElement) {
  const directSource =
    element.getAttribute('src')?.trim() ||
    element.getAttribute('data-src')?.trim() ||
    element.getAttribute('data-origin-src')?.trim() ||
    element.getAttribute('data-original-src')?.trim();

  if (directSource) {
    return directSource;
  }

  const sourceNode = element.querySelector('source');
  if (!(sourceNode instanceof HTMLElement)) {
    return '';
  }

  return (
    sourceNode.getAttribute('src')?.trim() ||
    sourceNode.getAttribute('data-src')?.trim() ||
    sourceNode.getAttribute('data-origin-src')?.trim() ||
    sourceNode.getAttribute('data-original-src')?.trim() ||
    ''
  );
}

export function getMediaLabel(element: HTMLElement, fallback = '') {
  return (
    element.getAttribute('title')?.trim() ||
    element.getAttribute('alt')?.trim() ||
    element.getAttribute('aria-label')?.trim() ||
    element.getAttribute('data-alt')?.trim() ||
    element.getAttribute('data-title')?.trim() ||
    fallback
  ).trim();
}

function isResolvableMediaSource(source: string) {
  return /^https?:\/\//i.test(source) || source.startsWith('/');
}

export function isFeishuRemoteMediaSource(source: string) {
  if (!/^https?:\/\//i.test(source)) {
    return false;
  }

  try {
    const { hostname } = new URL(source);
    return [
      /(^|\.)feishu\.cn$/i,
      /(^|\.)larksuite\.com$/i,
      /(^|\.)larksuitecdn\.com$/i,
      /(^|\.)feishucdn\.com$/i
    ].some((pattern) => pattern.test(hostname));
  } catch {
    return false;
  }
}

export function getMediaFileStem(contentKind: 'image' | 'video', label: string, index: number) {
  const normalizedLabel = label
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalizedLabel || `feishu-${contentKind}-${index + 1}`;
}

export function setElementMediaSource(element: HTMLElement, nextSource: string) {
  element.setAttribute('src', nextSource);

  ['data-src', 'data-origin-src', 'data-original-src'].forEach((attributeName) => {
    if (element.hasAttribute(attributeName)) {
      element.setAttribute(attributeName, nextSource);
    }
  });

  const sourceNodes = Array.from(element.querySelectorAll('source'));
  sourceNodes.forEach((sourceNode) => {
    if (!(sourceNode instanceof HTMLElement)) {
      return;
    }

    sourceNode.setAttribute('src', nextSource);
    ['data-src', 'data-origin-src', 'data-original-src'].forEach((attributeName) => {
      if (sourceNode.hasAttribute(attributeName)) {
        sourceNode.setAttribute(attributeName, nextSource);
      }
    });
  });
}

export function decorateHtmlWithClipboardUploads(
  html: string,
  clipboardFiles: File[]
): { html: string; uploadTasks: ClipboardUploadTask[] } {
  if (!html.trim() || clipboardFiles.length === 0) {
    return {
      html,
      uploadTasks: []
    };
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');
  const mediaElements = Array.from(
    document.body.querySelectorAll<HTMLElement>('img, video')
  );
  const uploadTasks: ClipboardUploadTask[] = [];
  let nextFileIndex = 0;

  for (const element of mediaElements) {
    const contentKind = element.tagName.toLowerCase() === 'video' ? 'video' : 'image';
    const source = getMediaSource(element);

    if (isResolvableMediaSource(source)) {
      continue;
    }

    let matchedFile: File | undefined;

    for (let index = nextFileIndex; index < clipboardFiles.length; index += 1) {
      const candidate = clipboardFiles[index];
      const matchesKind =
        (contentKind === 'image' && candidate.type.startsWith('image/')) ||
        (contentKind === 'video' && candidate.type.startsWith('video/'));

      if (!matchesKind) {
        continue;
      }

      matchedFile = candidate;
      nextFileIndex = index + 1;
      break;
    }

    if (!matchedFile) {
      continue;
    }

    const placeholder = buildUploadPlaceholder(contentKind);
    const contentLabel = getMediaLabel(element);
    element.setAttribute('data-markdown-placeholder', placeholder);
    if (contentLabel) {
      element.setAttribute('data-markdown-caption', contentLabel);
    }

    uploadTasks.push({
      file: matchedFile,
      placeholder,
      contentKind,
      contentLabel
    });
  }

  return {
    html: document.body.innerHTML,
    uploadTasks
  };
}
