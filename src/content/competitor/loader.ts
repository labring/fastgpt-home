import fs from 'node:fs';
import path from 'node:path';
import type {
  ComparisonPage,
  ComparisonSection,
  ComparisonTable,
  ComparisonTableKind,
  MarkdownBlock
} from './types';

const SOURCE_ROOT = path.join(process.cwd(), 'content', 'competitors');

function cleanInline(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function cellsFromTableRow(line: string) {
  const value = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return value.split('|').map((cell) => cleanInline(cell));
}

function tableKind(title: string | undefined, fallbackText = ''): ComparisonTableKind {
  const value = `${title || ''} ${fallbackText}`;
  if (/能力|产品重心|实现路径|长期工作|工作组|capability|product focus|implementation path|long-term work|work group/i.test(value)) {
    return 'capability';
  }
  if (/POC|验证|测量|怎么自己|必测|poc|validation|measurement|same-condition|must test/i.test(value)) {
    return 'poc';
  }
  if (/TCO|成本|采购形态|许可证|许可|公开边界|买断|tco|cost|procurement|license|licensing|boundary|buyout/i.test(value)) {
    return 'tco';
  }
  if (/选型建议|第一成败因素|第一约束|selection|criteria|recommendation|decision/i.test(value)) {
    return 'selection';
  }
  return 'generic';
}

function evidenceStatus(text: string) {
  if (/待合同|合同确认|合同验收|contract required|contract confirmation|to be confirmed in contract/i.test(text)) {
    return 'contract-required' as const;
  }
  if (/待 POC|待POC|POC|自行验证|同条件|poc required|same-condition|requires pOC|requires POC/i.test(text)) {
    return 'poc-required' as const;
  }
  if (/未列出|未证明|未固化|未说明|未公开|公开资料未|not publicly listed|not publicly disclosed|not official/i.test(text)) {
    return 'not-publicly-listed' as const;
  }
  return 'official-public' as const;
}

function parseTable(lines: string[], start: number, title: string | undefined) {
  const header = cellsFromTableRow(lines[start]);
  const rows = [];
  let cursor = start + 2;
  while (cursor < lines.length && /^\s*\|/.test(lines[cursor])) {
    const cells = cellsFromTableRow(lines[cursor]);
    if (cells.some(Boolean)) rows.push(cells);
    cursor += 1;
  }
  const tableText = [title, ...header, ...rows.flat()].filter(Boolean).join(' ');
  const table: ComparisonTable = {
    id: `table-${start + 1}`,
    title,
    kind: tableKind(title, tableText),
    columns: header,
    rows: rows.map((cells, index) => ({
      id: `row-${start + 1}-${index + 1}`,
      cells,
      sourceIds: ['draft-body'],
      evidenceStatus: evidenceStatus(cells.join(' '))
    }))
  };
  return { table, next: cursor };
}

function parseDocument(markdown: string) {
  const withoutMeta = markdown.replace(/^<!--[\s\S]*?-->\s*/, '');
  const lines = withoutMeta.replace(/\r/g, '').split('\n');
  const blocks: MarkdownBlock[] = [];
  let cursor = 0;
  let currentHeading: string | undefined;
  while (cursor < lines.length) {
    const line = lines[cursor].trim();
    if (!line) {
      cursor += 1;
      continue;
    }
    if (/^> \*\*(事实来源|Sources?|Source)\*\*/.test(line)) break;
    if (/^---+$/.test(line)) {
      if (/^> \*\*(事实来源|Sources?|Source)\*\*/.test(lines[cursor + 1]?.trim() || '')) break;
      cursor += 1;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = cleanInline(heading[2]);
      blocks.push({ type: 'heading', level, text });
      currentHeading = text;
      cursor += 1;
      continue;
    }
    if (/^\|/.test(line) && cursor + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[cursor + 1])) {
      const parsed = parseTable(lines, cursor, currentHeading);
      blocks.push({ type: 'table', table: parsed.table });
      cursor = parsed.next;
      continue;
    }
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (cursor < lines.length && /^\s*[-*+]\s+/.test(lines[cursor])) {
        items.push(cleanInline(lines[cursor].replace(/^\s*[-*+]\s+/, '')));
        cursor += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (cursor < lines.length && /^>\s?/.test(lines[cursor])) {
        quote.push(cleanInline(lines[cursor].replace(/^>\s?/, '')));
        cursor += 1;
      }
      blocks.push({ type: 'quote', text: quote.join(' ') });
      continue;
    }
    const paragraph: string[] = [];
    while (
      cursor < lines.length &&
      lines[cursor].trim() &&
      !/^#{1,3}\s+/.test(lines[cursor].trim()) &&
      !/^\s*\|/.test(lines[cursor]) &&
      !/^\s*[-*+]\s+/.test(lines[cursor]) &&
      !/^>\s?/.test(lines[cursor])
    ) {
      paragraph.push(cleanInline(lines[cursor]));
      cursor += 1;
    }
    if (paragraph.length) blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  const sectionBlocks = blocks.filter((block) => !(block.type === 'heading' && block.level === 1));
  const sections: ComparisonSection[] = [];
  let section: ComparisonSection | undefined;
  const intro: MarkdownBlock[] = [];
  for (const block of sectionBlocks) {
    if (block.type === 'heading' && block.level === 2) {
      section = {
        id: `section-${sections.length + 1}`,
        title: block.text || `Section ${sections.length + 1}`,
        blocks: []
      };
      sections.push(section);
      continue;
    }
    if (!section) {
      intro.push(block);
      continue;
    }
    section.blocks.push(block);
  }
  return { intro, sections };
}

interface PageInput extends Omit<ComparisonPage, 'intro' | 'sections'> {
  sourceFile: string;
}

export function createComparisonPage(input: PageInput): ComparisonPage {
  const { sourceFile, ...pageInput } = input;
  const sourcePath = path.join(SOURCE_ROOT, sourceFile);
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const parsed = parseDocument(markdown);
  return {
    ...pageInput,
    intro: parsed.intro,
    sections: parsed.sections
  };
}
