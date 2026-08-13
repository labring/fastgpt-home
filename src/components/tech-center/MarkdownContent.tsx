import { createElement, type ElementType, type ReactNode } from 'react';
import Link from 'next/link';

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; lines: string[] }
  | { type: 'code'; language: string; value: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'rule' };

function isBlockStart(line: string) {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^```/.test(line) ||
    /^>\s?/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+[.)]\s+/.test(line) ||
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

function parseMarkdown(markdown: string, title: string): MarkdownBlock[] {
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

    const fence = line.match(/^```\s*([^\s]*)\s*$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index].trim())) {
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

    const unordered = /^[-*]\s+/.test(line);
    const ordered = /^\d+[.)]\s+/.test(line);
    if (unordered || ordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const listLine = lines[index].trim();
        const match = unordered
          ? listLine.match(/^[-*]\s+(.+)/)
          : listLine.match(/^\d+[.)]\s+(.+)/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      blocks.push({ type: 'list', ordered, items });
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

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(`[^`]+`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith('`')) {
      nodes.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else if (match[2] && match[3]) {
      const href = /^(https?:\/\/|mailto:|\/(?!\/))/.test(match[3]) ? match[3] : undefined;
      nodes.push(
        href?.startsWith('/') ? (
          <Link key={key++} href={href}>
            {match[2]}
          </Link>
        ) : href ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {match[2]}
          </a>
        ) : (
          match[2]
        )
      );
    } else if (match[4] || match[5]) {
      nodes.push(<strong key={key++}>{match[4] || match[5]}</strong>);
    } else {
      nodes.push(<em key={key++}>{match[6] || match[7]}</em>);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlockquote(lines: string[]) {
  const nodes: ReactNode[] = [];
  let items: string[] = [];
  let key = 0;

  const flushList = () => {
    if (!items.length) return;
    nodes.push(
      <ul key={key++}>
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    items = [];
  };

  for (const line of lines) {
    const item = line.match(/^[-*]\s+(.+)/);
    if (item) {
      items.push(item[1]);
      continue;
    }

    flushList();
    if (line) nodes.push(<p key={key++}>{renderInline(line)}</p>);
  }
  flushList();

  return nodes;
}

export default function MarkdownContent({ markdown, title }: { markdown: string; title: string }) {
  const blocks = parseMarkdown(markdown, title);

  return (
    <div className="tech-article-content">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Heading = `h${Math.min(block.level, 6)}` as ElementType;
          return createElement(Heading, { key: index }, renderInline(block.text));
        }
        if (block.type === 'paragraph') {
          return (
            <p key={index}>
              {block.lines.map((line, lineIndex) => (
                <span key={lineIndex}>
                  {lineIndex > 0 && ' '}
                  {renderInline(line)}
                </span>
              ))}
            </p>
          );
        }
        if (block.type === 'code') {
          return (
            <pre key={index} data-language={block.language}>
              <code>{block.value}</code>
            </pre>
          );
        }
        if (block.type === 'blockquote') {
          return <blockquote key={index}>{renderBlockquote(block.lines)}</blockquote>;
        }
        if (block.type === 'list') {
          const List = block.ordered ? 'ol' : 'ul';
          return (
            <List key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </List>
          );
        }
        if (block.type === 'table') {
          const [header, ...body] = block.rows;
          return (
            <div className="tech-article-table" key={index}>
              <table>
                <thead>
                  <tr>
                    {header.map((cell, cellIndex) => (
                      <th key={cellIndex}>{renderInline(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{renderInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return <hr key={index} />;
      })}
    </div>
  );
}
