import { createElement, type ElementType, type ReactNode } from 'react';
import Link from 'next/link';

import {
  getMarkdownHeadings,
  parseMarkdown,
  type MarkdownBlock,
  type MarkdownHeading,
  type MarkdownListBlock
} from '@/lib/markdownParser';

export { getMarkdownHeadings } from '@/lib/markdownParser';

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
            {renderInline(match[2])}
          </Link>
        ) : href ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {renderInline(match[2])}
          </a>
        ) : (
          renderInline(match[2])
        )
      );
    } else if (match[4] || match[5]) {
      nodes.push(<strong key={key++}>{renderInline(match[4] || match[5])}</strong>);
    } else {
      nodes.push(<em key={key++}>{renderInline(match[6] || match[7])}</em>);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlockquote(lines: string[]) {
  const nodes: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    const List = list.ordered ? 'ol' : 'ul';
    nodes.push(
      <List key={key++}>
        {list.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item)}</li>
        ))}
      </List>
    );
    list = null;
  };

  for (const line of lines) {
    const marker = line.match(/^(?:([-+*])|(\d+[.)]))\s+(.+)$/);
    if (marker) {
      const ordered = Boolean(marker[2]);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(marker[3]);
      continue;
    }

    flushList();
    if (line) nodes.push(<p key={key++}>{renderInline(line)}</p>);
  }
  flushList();

  return nodes;
}

function renderList(block: MarkdownListBlock, key: string): ReactNode {
  const List = block.ordered ? 'ol' : 'ul';

  return (
    <List key={key}>
      {block.items.map((item, itemIndex) => (
        <li key={itemIndex}>
          {renderInline(item.text)}
          {item.children.map((child, childIndex) =>
            renderList(child, key + '-' + itemIndex + '-' + childIndex)
          )}
        </li>
      ))}
    </List>
  );
}

function renderBlock(
  block: MarkdownBlock,
  key: string,
  headingState: { headings: MarkdownHeading[]; index: number } | null
): ReactNode {
  if (block.type === 'heading') {
    const Heading = ('h' + Math.min(block.level, 6)) as ElementType;
    const heading = headingState?.headings[headingState.index++];
    return createElement(Heading, { key, id: heading?.id }, renderInline(block.text));
  }
  if (block.type === 'paragraph') {
    return (
      <p key={key}>
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
      <pre key={key} data-language={block.language}>
        <code>{block.value}</code>
      </pre>
    );
  }
  if (block.type === 'blockquote') {
    return <blockquote key={key}>{renderBlockquote(block.lines)}</blockquote>;
  }
  if (block.type === 'list') return renderList(block, key);
  if (block.type === 'table') {
    const [header, ...body] = block.rows;
    return (
      <div className="tech-article-table" key={key}>
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
  return <hr key={key} />;
}

export default function MarkdownContent({
  markdown,
  title,
  blocks,
  headingIdPrefix = 'article-section'
}: {
  markdown: string;
  title: string;
  blocks?: MarkdownBlock[];
  headingIdPrefix?: string;
}) {
  const parsedBlocks = blocks ?? parseMarkdown(markdown, title);
  const headingState = {
    headings: getMarkdownHeadings(parsedBlocks, headingIdPrefix),
    index: 0
  };

  return (
    <div className="tech-article-content">
      {parsedBlocks.map((block, index) => renderBlock(block, String(index), headingState))}
    </div>
  );
}
