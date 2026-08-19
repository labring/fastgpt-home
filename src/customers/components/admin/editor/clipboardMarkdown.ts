export interface ConvertPastedContentInput {
  html?: string;
  text?: string;
}

interface ListContext {
  depth: number;
}

const BLOCK_TAGS = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'details',
  'div',
  'dl',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'tbody',
  'thead',
  'tr',
  'ul',
  'video',
  'iframe'
]);

const CONTAINER_TAGS = new Set([
  'article',
  'aside',
  'details',
  'div',
  'footer',
  'header',
  'main',
  'nav',
  'section'
]);

const INLINE_PASSTHROUGH_TAGS = new Set([
  'abbr',
  'cite',
  'label',
  'small',
  'span',
  'sub',
  'summary',
  'sup'
]);

function isElementNode(node: ChildNode): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

function isTextNode(node: ChildNode): boolean {
  return node.nodeType === Node.TEXT_NODE;
}

function escapeMarkdownText(text: string) {
  return text.replace(/\\/g, '\\\\');
}

function escapeInlineCode(text: string) {
  return text.replace(/`/g, '\\`');
}

function escapeHtmlAttribute(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getElementAttribute(element: HTMLElement, names: string[]) {
  for (const name of names) {
    const value = element.getAttribute(name)?.trim();
    if (value) {
      return value;
    }
  }

  return '';
}

function getMediaSource(element: HTMLElement) {
  const directSource = getElementAttribute(element, [
    'src',
    'data-src',
    'data-origin-src',
    'data-original-src'
  ]);

  if (directSource) {
    return directSource;
  }

  const sourceNode = element.querySelector('source');
  if (!(sourceNode instanceof HTMLElement)) {
    return '';
  }

  return getElementAttribute(sourceNode, [
    'src',
    'data-src',
    'data-origin-src',
    'data-original-src'
  ]);
}

function getElementCaption(element: HTMLElement, fallback = '') {
  return normalizeInlineText(
    getElementAttribute(element, [
      'data-markdown-caption',
      'title',
      'alt',
      'aria-label',
      'data-alt',
      'data-title'
    ]) || fallback
  );
}

function renderImage(element: HTMLElement, captionOverride = ''): string {
  const placeholder = element.getAttribute('data-markdown-placeholder')?.trim();
  if (placeholder) {
    return placeholder;
  }

  const src = getMediaSource(element);
  if (!src) {
    return '';
  }

  const alt = getNormalizedImageAltText(getElementCaption(element, captionOverride));
  return `![${escapeMarkdownText(alt)}](${src})`;
}

function renderVideo(element: HTMLElement, captionOverride = ''): string {
  const placeholder = element.getAttribute('data-markdown-placeholder')?.trim();
  if (placeholder) {
    return placeholder;
  }

  const src = getMediaSource(element);
  if (!src) {
    return '';
  }

  const title = getElementCaption(element, captionOverride);
  return title
    ? `<video src="${escapeHtmlAttribute(src)}" controls title="${escapeHtmlAttribute(title)}"></video>`
    : `<video src="${escapeHtmlAttribute(src)}" controls></video>`;
}

function renderIframe(element: HTMLElement, captionOverride = ''): string {
  const src = getMediaSource(element);
  if (!src) {
    return '';
  }

  const title = getElementCaption(element, captionOverride);
  return title
    ? `<iframe src="${escapeHtmlAttribute(src)}" title="${escapeHtmlAttribute(title)}"></iframe>`
    : `<iframe src="${escapeHtmlAttribute(src)}"></iframe>`;
}

function getMarkdownLineGroup(line: string): string | null {
  if (/^>/.test(line)) return 'blockquote';
  if (/^\|.*\|$/.test(line)) return 'table';
  if (/^[ \t]*[-*+]\s/.test(line)) return 'ulist';
  if (/^[ \t]*\d+\.\s/.test(line)) return 'olist';
  return null;
}

function collapseTightBlankLines(markdown: string): string {
  const lines = markdown.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === '' && result.length > 0 && i + 1 < lines.length) {
      const prevLine = result[result.length - 1];
      const nextLine = lines[i + 1];

      if (prevLine === '' || nextLine === '') {
        result.push(line);
        continue;
      }

      const prevGroup = getMarkdownLineGroup(prevLine);
      const nextGroup = getMarkdownLineGroup(nextLine);

      if (prevGroup && prevGroup === nextGroup) {
        continue;
      }
    }

    result.push(line);
  }

  return result.join('\n');
}

function cleanupMarkdown(markdown: string) {
  return collapseTightBlankLines(
    markdown
      .replace(/\r\n/g, '\n')
      .replace(/\u200b/g, '')
      .replace(/!\[image\]\(([^)\n]+)\)/gi, '![]($1)')
      .replace(/(!\[[^\]]*]\([^)]+\))(?:[ \t]*\n?[ \t]*)*(?=!\[[^\]]*]\([^)]+\))/g, '$1\n\n')
      .replace(/\n{3,}/g, '\n\n')
      .split('\n')
      .map((line) => line.replace(/[ \t]+$/g, ''))
      .join('\n')
  ).trim();
}

function getNormalizedImageAltText(alt: string) {
  return /^image$/i.test(alt.trim()) ? '' : alt;
}

function normalizeInlineText(text: string) {
  return text.replace(/\u200b/g, '').replace(/\s+/g, ' ');
}

function normalizeInlineOutput(text: string) {
  return text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ');
}

function normalizeTableCell(text: string) {
  return text.replace(/\|/g, '\\|').replace(/\n+/g, '<br />').trim();
}

function toMarkdownRow(cells: string[]) {
  return `| ${cells.join(' | ')} |`;
}

function padRow(cells: string[], expectedLength: number) {
  const normalized = [...cells];

  while (normalized.length < expectedLength) {
    normalized.push('');
  }

  return normalized.slice(0, expectedLength);
}

function hasBlockChildren(element: HTMLElement) {
  return Array.from(element.children).some((child) =>
    BLOCK_TAGS.has(child.tagName.toLowerCase())
  );
}

function renderInlineChildren(nodes: ChildNode[]) {
  return normalizeInlineOutput(nodes.map((node) => renderInline(node)).join(''));
}

function renderBlockChildren(nodes: ChildNode[], context: ListContext) {
  const blocks: string[] = [];

  for (const node of nodes) {
    const renderedBlocks = renderBlock(node, context);

    for (const block of renderedBlocks) {
      const normalized = block.trim();
      if (normalized) {
        blocks.push(normalized);
      }
    }
  }

  return blocks;
}

function renderFigure(element: HTMLElement, context: ListContext) {
  const directChildren = Array.from(element.childNodes);
  const figcaptionNode = directChildren.find(
    (child) => isElementNode(child) && child.tagName.toLowerCase() === 'figcaption'
  );
  const caption =
    figcaptionNode && isElementNode(figcaptionNode)
      ? renderInlineChildren(Array.from(figcaptionNode.childNodes)).trim()
      : '';

  const blocks: string[] = [];

  for (const child of directChildren) {
    if (child === figcaptionNode) {
      continue;
    }

    if (isElementNode(child)) {
      const tagName = child.tagName.toLowerCase();
      if (tagName === 'img') {
        const markdown = renderImage(child, caption);
        if (markdown) {
          blocks.push(markdown);
        }
        continue;
      }

      if (tagName === 'video') {
        const markdown = renderVideo(child, caption);
        if (markdown) {
          blocks.push(markdown);
        }
        continue;
      }

      if (tagName === 'iframe') {
        const markdown = renderIframe(child, caption);
        if (markdown) {
          blocks.push(markdown);
        }
        continue;
      }
    }

    blocks.push(...renderBlock(child, context));
  }

  if (blocks.length === 0 && caption) {
    blocks.push(caption);
  }

  return blocks;
}

function renderParagraph(element: HTMLElement, context: ListContext) {
  if (hasBlockChildren(element)) {
    return renderBlockChildren(Array.from(element.childNodes), context);
  }

  const content = renderInlineChildren(Array.from(element.childNodes));
  return content ? [content] : [];
}

function renderContainer(element: HTMLElement, context: ListContext) {
  if (hasBlockChildren(element)) {
    return renderBlockChildren(Array.from(element.childNodes), context);
  }

  const content = renderInlineChildren(Array.from(element.childNodes));
  return content ? [content] : [];
}

function renderQuote(element: HTMLElement, context: ListContext) {
  const content = renderBlockChildren(Array.from(element.childNodes), context).join('\n\n');
  if (!content.trim()) {
    return [];
  }

  return [
    content
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n')
  ];
}

function findTaskCheckbox(nodes: ChildNode[]): HTMLInputElement | null {
  for (const node of nodes) {
    if (!isElementNode(node)) {
      continue;
    }

    const tagName = node.tagName.toLowerCase();
    if (tagName === 'ul' || tagName === 'ol') {
      continue;
    }

    if (node instanceof HTMLInputElement && node.type === 'checkbox') {
      return node;
    }

    const checkbox = node.querySelector('input[type="checkbox"]');
    if (checkbox instanceof HTMLInputElement) {
      return checkbox;
    }
  }

  return null;
}

function renderListItem(
  element: HTMLElement,
  ordered: boolean,
  index: number,
  context: ListContext
): string {
  const indent = '  '.repeat(context.depth);
  const childNodes = Array.from(element.childNodes);
  const nestedLists = childNodes.filter(
    (child): child is HTMLElement =>
      isElementNode(child) && ['ul', 'ol'].includes(child.tagName.toLowerCase())
  );
  const contentNodes = childNodes.filter((child) => !nestedLists.includes(child as HTMLElement));
  const taskCheckbox = findTaskCheckbox(contentNodes);
  const marker = taskCheckbox
    ? `- [${taskCheckbox.checked ? 'x' : ' '}] `
    : ordered
      ? `${index + 1}. `
      : '- ';
  const content = renderInlineChildren(contentNodes).trim() || ' ';
  const contentLines = content.split('\n');
  const head = contentLines
    .map((line, lineIndex) =>
      lineIndex === 0 ? `${indent}${marker}${line}` : `${indent}  ${line}`
    )
    .join('\n');
  const nested: string = nestedLists
    .map((list) =>
      renderList(list, list.tagName.toLowerCase() === 'ol', {
        depth: context.depth + 1
      })
    )
    .filter(Boolean)
    .join('\n');

  return nested ? `${head}\n${nested}` : head;
}

function renderList(
  element: HTMLElement,
  ordered: boolean,
  context: ListContext
): string {
  const items = Array.from(element.children).filter(
    (child): child is HTMLElement => child.tagName.toLowerCase() === 'li'
  );

  return items
    .map((item, index) => renderListItem(item, ordered, index, context))
    .filter(Boolean)
    .join('\n');
}

function renderCodeBlock(element: HTMLElement): string {
  const codeElement = element.querySelector('code');
  const languageClass = codeElement?.className
    .split(/\s+/)
    .find((className) => className.startsWith('language-'))
    ?.replace('language-', '');
  const explicitLanguage = getElementAttribute(element, [
    'data-language',
    'data-code-language'
  ]);
  const language = explicitLanguage || languageClass || '';
  const content = (codeElement?.textContent ?? element.textContent ?? '')
    .replace(/\u200b/g, '')
    .trimEnd();

  return `\`\`\`${language}\n${content}\n\`\`\``;
}

function renderTable(element: HTMLElement): string {
  const rows = Array.from(element.querySelectorAll('tr')).map((row) =>
    Array.from(row.children).map((cell) =>
      normalizeTableCell(renderInlineChildren(Array.from(cell.childNodes)))
    )
  );

  if (rows.length === 0) {
    return '';
  }

  const columnCount = Math.max(...rows.map((row) => row.length), 1);
  const header = padRow(rows[0], columnCount);
  const body = rows.slice(1).map((row) => padRow(row, columnCount));
  const separator = header.map(() => '---');

  return [toMarkdownRow(header), toMarkdownRow(separator), ...body.map(toMarkdownRow)].join('\n');
}

function renderInline(node: ChildNode): string {
  if (isTextNode(node)) {
    return normalizeInlineText(node.textContent ?? '');
  }

  if (!isElementNode(node)) {
    return '';
  }

  const tagName = node.tagName.toLowerCase();

  if (tagName === 'script' || tagName === 'style') {
    return '';
  }

  const content = renderInlineChildren(Array.from(node.childNodes));

  switch (tagName) {
    case 'strong':
    case 'b':
      return content ? `**${content}**` : '';
    case 'em':
    case 'i':
      return content ? `*${content}*` : '';
    case 'del':
    case 's':
    case 'strike':
      return content ? `~~${content}~~` : '';
    case 'mark':
      return content ? `<mark>${content}</mark>` : '';
    case 'kbd':
      return content ? `<kbd>${content}</kbd>` : '';
    case 'u':
      return content ? `<u>${content}</u>` : '';
    case 'sub':
      return content ? `<sub>${content}</sub>` : '';
    case 'sup':
      return content ? `<sup>${content}</sup>` : '';
    case 'code':
      return content ? `\`${escapeInlineCode(content)}\`` : '';
    case 'a': {
      const href = getElementAttribute(node, ['href', 'data-href']);
      if (!href) {
        return content;
      }

      const label = content || href;
      return `[${escapeMarkdownText(label)}](${href})`;
    }
    case 'br':
      return '\n';
    case 'img':
      return renderImage(node);
    case 'video':
      return renderVideo(node);
    case 'iframe':
      return renderIframe(node);
    case 'input':
      return '';
    default:
      if (INLINE_PASSTHROUGH_TAGS.has(tagName)) {
        return content;
      }

      if (CONTAINER_TAGS.has(tagName) || BLOCK_TAGS.has(tagName)) {
        return content;
      }

      return content;
  }
}

function renderBlock(node: ChildNode, context: ListContext): string[] {
  if (isTextNode(node)) {
    const content = normalizeInlineText(node.textContent ?? '');
    return content ? [content] : [];
  }

  if (!isElementNode(node)) {
    return [];
  }

  const tagName = node.tagName.toLowerCase();

  switch (tagName) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const level = Number(tagName.slice(1));
      const content = renderInlineChildren(Array.from(node.childNodes)).trim();
      return content ? [`${'#'.repeat(level)} ${content}`] : [];
    }
    case 'p':
      return renderParagraph(node, context);
    case 'figure':
      return renderFigure(node, context);
    case 'figcaption': {
      const content = renderInlineChildren(Array.from(node.childNodes));
      return content ? [content] : [];
    }
    case 'blockquote':
      return renderQuote(node, context);
    case 'ul':
      return [renderList(node, false, context)];
    case 'ol':
      return [renderList(node, true, context)];
    case 'pre':
      return [renderCodeBlock(node)];
    case 'table': {
      const table = renderTable(node);
      return table ? [table] : [];
    }
    case 'hr':
      return ['---'];
    case 'img': {
      const image = renderImage(node);
      return image ? [image] : [];
    }
    case 'video': {
      const video = renderVideo(node);
      return video ? [video] : [];
    }
    case 'iframe': {
      const iframe = renderIframe(node);
      return iframe ? [iframe] : [];
    }
    default:
      if (CONTAINER_TAGS.has(tagName)) {
        return renderContainer(node, context);
      }

      if (hasBlockChildren(node)) {
        return renderBlockChildren(Array.from(node.childNodes), context);
      }

      const content = renderInlineChildren(Array.from(node.childNodes));
      return content ? [content] : [];
  }
}

function convertHtmlToMarkdown(html: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');
  const blocks = renderBlockChildren(Array.from(document.body.childNodes), {
    depth: 0
  });

  return blocks.join('\n\n');
}

export function convertPastedContentToMarkdown({
  html,
  text
}: ConvertPastedContentInput) {
  if (html?.trim()) {
    return cleanupMarkdown(convertHtmlToMarkdown(html));
  }

  return cleanupMarkdown(text ?? '');
}
