export interface MarkdownImageMatch {
  alt: string;
  src: string;
  markdown: string;
  start: number;
  end: number;
  altStart: number;
  altEnd: number;
  lineStart: number;
  lineEnd: number;
}

const IMAGE_MARKDOWN_PATTERN = /!\[([^\]]*)\]\(([^)\n]+)\)/g;

function getLineRange(content: string, position: number) {
  const safePosition = Math.max(0, Math.min(position, content.length));
  const lineStart = content.lastIndexOf('\n', Math.max(0, safePosition - 1)) + 1;
  const nextNewLine = content.indexOf('\n', safePosition);
  const lineEnd = nextNewLine === -1 ? content.length : nextNewLine;

  return {
    lineStart,
    lineEnd
  };
}

const HTML_IMG_PATTERN_GLOBAL = /<img\b[^>]*\/?>/gi;

function extractHtmlImgAttrs(
  tag: string
): { alt: string; src: string; altStart: number; altEnd: number } {
  const srcMatch = /\bsrc\s*=\s*"([^"]*)"/i.exec(tag) || /\bsrc\s*=\s*'([^']*)'/i.exec(tag);
  const altMatch = /\balt\s*=\s*"([^"]*)"/i.exec(tag) || /\balt\s*=\s*'([^']*)'/i.exec(tag);

  const src = srcMatch?.[1] ?? '';
  const alt = altMatch?.[1] ?? '';

  let altStart = 5;
  let altEnd = 5;
  if (altMatch) {
    const attrStart = tag.indexOf(altMatch[0]);
    const valueStart = tag.indexOf(altMatch[1], attrStart);
    altStart = valueStart;
    altEnd = valueStart + alt.length;
  }

  return { alt, src, altStart, altEnd };
}

function collectMarkdownImages(content: string, offset = 0): MarkdownImageMatch[] {
  const matches: MarkdownImageMatch[] = [];

  // 标准 Markdown 图片语法: ![alt](url)
  for (const match of content.matchAll(IMAGE_MARKDOWN_PATTERN)) {
    const rawMarkdown = match[0];
    const alt = match[1] ?? '';
    const src = match[2] ?? '';
    const localStart = match.index ?? 0;
    const start = offset + localStart;
    const end = start + rawMarkdown.length;
    const altStart = start + 2;
    const altEnd = altStart + alt.length;
    const { lineStart, lineEnd } = getLineRange(content, localStart);

    matches.push({
      alt,
      src,
      markdown: rawMarkdown,
      start,
      end,
      altStart,
      altEnd,
      lineStart: offset + lineStart,
      lineEnd: offset + lineEnd
    });
  }

  // HTML <img> 标签 (缩放后产生的格式)
  for (const match of content.matchAll(HTML_IMG_PATTERN_GLOBAL)) {
    const rawMarkdown = match[0];
    const localStart = match.index ?? 0;
    const start = offset + localStart;
    const end = start + rawMarkdown.length;
    const { alt, src, altStart: relAltStart, altEnd: relAltEnd } = extractHtmlImgAttrs(rawMarkdown);
    const { lineStart, lineEnd } = getLineRange(content, localStart);

    matches.push({
      alt,
      src,
      markdown: rawMarkdown,
      start,
      end,
      altStart: start + relAltStart,
      altEnd: start + relAltEnd,
      lineStart: offset + lineStart,
      lineEnd: offset + lineEnd
    });
  }

  return matches;
}

export function getMarkdownImages(content: string) {
  return collectMarkdownImages(content);
}

function intersectsSelection(
  image: Pick<MarkdownImageMatch, 'start' | 'end'>,
  selectionStart: number,
  selectionEnd: number
) {
  return selectionStart <= image.end && selectionEnd >= image.start;
}

export function findImageAtSelection(
  content: string,
  selectionStart: number,
  selectionEnd = selectionStart
) {
  const lineRange = getLineRange(content, selectionStart);
  const lineImages = collectMarkdownImages(
    content.slice(lineRange.lineStart, lineRange.lineEnd),
    lineRange.lineStart
  );

  if (lineImages.length === 1) {
    return lineImages[0];
  }

  const imageOnCurrentLine = lineImages.find((image) =>
    intersectsSelection(image, selectionStart, selectionEnd)
  );
  if (imageOnCurrentLine) {
    return imageOnCurrentLine;
  }

  return collectMarkdownImages(content).find((image) =>
    intersectsSelection(image, selectionStart, selectionEnd)
  ) ?? null;
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const HTML_IMG_PATTERN = /^<img\b[^>]*\/?>/i;

export function replaceImageWithWidth(
  content: string,
  image: Pick<MarkdownImageMatch, 'start' | 'end' | 'alt' | 'src'>,
  width: string
): string {
  const segment = content.slice(image.start, image.end);

  if (HTML_IMG_PATTERN.test(segment)) {
    // 已经是 HTML <img> 标签——更新或添加 width 属性
    const widthRegex = /\bwidth\s*=\s*["'][^"']*["']/i;
    if (widthRegex.test(segment)) {
      return (
        content.slice(0, image.start) +
        segment.replace(widthRegex, `width="${width}"`) +
        content.slice(image.end)
      );
    }
    return (
      content.slice(0, image.start) +
      segment.replace(/<img\b/i, `<img width="${width}"`) +
      content.slice(image.end)
    );
  }

  // 标准 Markdown 图片语法 → 转为 HTML <img>
  const escapedAlt = escapeAttr(image.alt);
  const escapedSrc = escapeAttr(image.src);

  return (
    content.slice(0, image.start) +
    `<img src="${escapedSrc}" alt="${escapedAlt}" width="${width}" />` +
    content.slice(image.end)
  );
}
