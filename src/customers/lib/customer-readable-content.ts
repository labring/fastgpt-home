type ReadableContentOptions = {
  maxLength?: number;
};

const FRONTMATTER_PATTERN = /^---[\s\S]*?---\s*/;
const HTML_COMMENT_PATTERN = /<!--[\s\S]*?-->/g;
const HTML_TAG_PATTERN = /<\/?[^>]+>/g;
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const MARKDOWN_IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)]+)\)/g;

function normalizeWhitespace(value: string) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function markdownToReadableText(markdown: string, options: ReadableContentOptions = {}) {
  const maxLength = options.maxLength;
  let text = markdown || '';

  text = text.replace(FRONTMATTER_PATTERN, '');
  text = text.replace(HTML_COMMENT_PATTERN, '');
  text = text.replace(MARKDOWN_IMAGE_PATTERN, (_match, alt) => {
    const imageAlt = String(alt || '').trim();
    return imageAlt ? `图片：${imageAlt}` : '图片';
  });
  text = text.replace(MARKDOWN_LINK_PATTERN, '$1');
  text = text.replace(HTML_TAG_PATTERN, ' ');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/^\s*>\s?/gm, '');
  text = text.replace(/^\s*[-*+]\s+/gm, '- ');
  text = text.replace(/^\s*\d+\.\s+/gm, '- ');
  text = text.replace(/[*_~`]+/g, '');
  text = text.replace(/\|/g, ' | ');
  text = normalizeWhitespace(text);

  if (typeof maxLength === 'number' && maxLength > 0 && text.length > maxLength) {
    return `${text.slice(0, maxLength).trim()}...`;
  }

  return text;
}

export function markdownToReadableMarkdown(markdown: string) {
  let content = markdown || '';

  content = content.replace(FRONTMATTER_PATTERN, '');
  content = content.replace(HTML_COMMENT_PATTERN, '');
  content = normalizeWhitespace(content);

  return content;
}

export function createPlainTextResponse(content: string) {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
