'use client';

export type UploadContentKind = 'image' | 'video' | 'file';

const ATTACHMENT_FILE_TAG_PREFIX = '<attachment-file';

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildUploadContentMarkdown(
  kind: UploadContentKind,
  label: string,
  fileUrl: string,
  fileSize: number
) {
  if (kind === 'image') {
    return `![${label || 'image'}](${fileUrl})`;
  }

  if (kind === 'video') {
    return label
      ? `<video controls src="${fileUrl}" title="${escapeHtmlAttribute(label)}"></video>`
      : `<video controls src="${fileUrl}"></video>`;
  }

  const fileName = label || fileUrl;
  return `<attachment-file href="${escapeHtmlAttribute(fileUrl)}" name="${escapeHtmlAttribute(fileName)}" size="${fileSize}"></attachment-file>`;
}

export function replaceUploadPlaceholder(
  content: string,
  placeholder: string,
  replacement: string
) {
  const placeholderIndex = content.indexOf(placeholder);
  if (placeholderIndex === -1) {
    return content;
  }

  const placeholderEndIndex = placeholderIndex + placeholder.length;

  if (!replacement.trimStart().startsWith(ATTACHMENT_FILE_TAG_PREFIX)) {
    return content.slice(0, placeholderIndex) + replacement + content.slice(placeholderEndIndex);
  }

  const before = content.slice(0, placeholderIndex);
  const after = content.slice(placeholderEndIndex);

  const trimmedBefore = before.trimEnd();
  const trimmedAfter = after.trimStart();

  const normalizedBefore = trimmedBefore.length === 0 ? '' : `${trimmedBefore}\n`;
  const normalizedAfter = trimmedAfter.length === 0 ? '\n' : `\n${trimmedAfter}`;

  return `${normalizedBefore}${replacement}${normalizedAfter}`;
}

export function removeUploadPlaceholder(content: string, placeholder: string) {
  const placeholderIndex = content.indexOf(placeholder);
  if (placeholderIndex === -1) {
    return content;
  }

  let removeStart = placeholderIndex;
  let removeEnd = placeholderIndex + placeholder.length;

  if (content.slice(removeEnd, removeEnd + 1) === '\n') {
    removeEnd += 1;
  }

  if (removeStart > 0 && content.slice(removeStart - 1, removeStart) === '\n') {
    removeStart -= 1;
  }

  return `${content.slice(0, removeStart)}${content.slice(removeEnd)}`;
}
