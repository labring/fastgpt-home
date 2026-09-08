export type MarkdownListItem = {
  text: string;
  children: MarkdownListBlock[];
};

export type MarkdownListBlock = {
  type: 'list';
  ordered: boolean;
  items: MarkdownListItem[];
};

export type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; lines: string[] }
  | { type: 'code'; language: string; value: string }
  | { type: 'blockquote'; lines: string[] }
  | MarkdownListBlock
  | { type: 'table'; rows: string[][] }
  | { type: 'rule' };

export type MarkdownHeading = {
  level: number;
  text: string;
  id: string;
};

const INLINE_MARKDOWN_PATTERN =
  /(?:\x60([^\x60]+)\x60|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_)/g;

type MarkdownListMarker = {
  indent: number;
  ordered: boolean;
  text: string;
};

function countIndent(line: string) {
  let indent = 0;
  for (const character of line) {
    if (character === ' ') indent += 1;
    else if (character === '\t') indent += 4;
    else break;
  }
  return indent;
}

function parseListMarker(line: string): MarkdownListMarker | null {
  const match = line.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/);
  if (!match) return null;
  return {
    indent: countIndent(match[1]),
    ordered: /^\d/.test(match[2]),
    text: match[3].trim()
  };
}

function isBlockStart(line: string) {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^\x60\x60\x60/.test(line) ||
    /^>\s?/.test(line) ||
    parseListMarker(line) !== null ||
    /^---+$/.test(line) ||
    /^\|.*\|$/.test(line)
  );
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableDivider(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseList(
  lines: string[],
  startIndex: number,
  baseIndent: number
): { block: MarkdownListBlock; nextIndex: number } {
  const firstMarker = parseListMarker(lines[startIndex]);
  if (!firstMarker || firstMarker.indent !== baseIndent) {
    throw new Error('parseList requires a list marker at the requested indentation');
  }

  const items: MarkdownListItem[] = [];
  const ordered = firstMarker.ordered;
  let index = startIndex;

  while (index < lines.length) {
    const marker = parseListMarker(lines[index]);
    if (!marker || marker.indent !== baseIndent || marker.ordered !== ordered) break;

    const item: MarkdownListItem = { text: marker.text, children: [] };
    index += 1;

    while (index < lines.length) {
      const currentLine = lines[index];
      if (!currentLine.trim()) {
        const nextLine = lines[index + 1];
        const nextMarker = nextLine ? parseListMarker(nextLine) : null;
        if (nextMarker && nextMarker.indent >= baseIndent) {
          index += 1;
          continue;
        }
        break;
      }

      const nextMarker = parseListMarker(currentLine);
      if (nextMarker) {
        if (nextMarker.indent > baseIndent) {
          const nested = parseList(lines, index, nextMarker.indent);
          item.children.push(nested.block);
          index = nested.nextIndex;
          continue;
        }
        break;
      }

      if (countIndent(currentLine) > baseIndent) {
        item.text += ' ' + currentLine.trim();
        index += 1;
        continue;
      }

      break;
    }

    items.push(item);
  }

  return { block: { type: 'list', ordered, items }, nextIndex: index };
}

export function parseMarkdown(markdown: string, title: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;
  let skippedTitle = false;
  let contentHeadingBase: number | null = null;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^\x60\x60\x60\s*([^\s]*)\s*$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^\x60\x60\x60\s*$/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', language: fence[1] || 'text', value: codeLines.join('\n') });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const headingText = heading[2].trim();
      if (!skippedTitle && heading[1].length === 1 && headingText === title) {
        skippedTitle = true;
      } else {
        const sourceLevel = heading[1].length;
        contentHeadingBase ??= sourceLevel;
        const normalizedLevel = Math.min(Math.max(sourceLevel - contentHeadingBase + 2, 2), 6);
        blocks.push({ type: 'heading', level: normalizedLevel, text: headingText });
      }
      index += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: 'rule' });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push({ type: 'blockquote', lines: quoteLines });
      continue;
    }

    const listMarker = parseListMarker(line);
    if (listMarker) {
      const list = parseList(lines, index, listMarker.indent);
      blocks.push(list.block);
      index = list.nextIndex;
      continue;
    }

    if (index + 1 < lines.length && line.includes('|') && isTableDivider(lines[index + 1])) {
      const rows = [parseTableRow(line)];
      index += 2;
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: 'table', rows });
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: 'paragraph', lines: paragraphLines });
  }

  return blocks;
}

function slugifyHeading(text: string) {
  return (
    text
      .normalize('NFKC')
      .toLocaleLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
}

export function getMarkdownPlainText(text: string): string {
  return text.replace(
    INLINE_MARKDOWN_PATTERN,
    (_token, codeText, linkText, _href, strongText, strongTextAlt, emphasisText, emphasisTextAlt) =>
      getMarkdownPlainText(
        codeText ?? linkText ?? strongText ?? strongTextAlt ?? emphasisText ?? emphasisTextAlt
      )
  );
}

export function getMarkdownHeadings(
  blocks: MarkdownBlock[],
  prefix = 'section'
): MarkdownHeading[] {
  const counts = new Map<string, number>();

  return blocks
    .filter(
      (block): block is Extract<MarkdownBlock, { type: 'heading' }> => block.type === 'heading'
    )
    .map((block) => {
      const text = getMarkdownPlainText(block.text);
      const base = slugifyHeading(text);
      const count = (counts.get(base) || 0) + 1;
      counts.set(base, count);
      return {
        level: block.level,
        text,
        id: prefix + '-' + base + (count > 1 ? '-' + count : '')
      };
    });
}
