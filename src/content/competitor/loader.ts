import fs from 'node:fs';
import path from 'node:path';
import type {
  ComparisonFact,
  ComparisonPage,
  ComparisonSection,
  ComparisonTable,
  ComparisonTableKind,
  MarkdownBlock,
  SourceRef
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
  const value = title || '';
  if (/能力|产品重心|实现路径/.test(value)) return 'capability';
  if (/POC|验证|测量|怎么自己|必测/.test(value)) return 'poc';
  if (/TCO|成本|采购形态|许可证|许可|公开边界|买断/.test(value)) return 'tco';
  if (/选型建议|第一成败因素|第一约束/.test(value)) return 'selection';
  if (/能力|实现路径/.test(fallbackText)) return 'capability';
  if (/POC|验证|测量|必测/.test(fallbackText)) return 'poc';
  if (/TCO|成本|采购形态|许可证|许可|公开边界|买断/.test(fallbackText)) return 'tco';
  return 'generic';
}

function evidenceStatus(text: string) {
  if (/待合同|合同确认|合同验收/.test(text)) return 'contract-required' as const;
  if (/待 POC|待POC|POC|自行验证|同条件/.test(text)) return 'poc-required' as const;
  if (/未列出|未证明|未固化|未说明|未公开|公开资料未/.test(text)) return 'not-publicly-listed' as const;
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
    if (/^> \*\*事实来源\*\*/.test(line)) break;
    if (/^---+$/.test(line)) {
      if (/^> \*\*事实来源\*\*/.test(lines[cursor + 1]?.trim() || '')) break;
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

  const titleBlock = blocks.find((block) => block.type === 'heading' && block.level === 1);
  const sectionBlocks = blocks.filter((block) => !(block.type === 'heading' && block.level === 1));
  const sections: ComparisonSection[] = [];
  let section: ComparisonSection | undefined;
  const intro: MarkdownBlock[] = [];
  for (const block of sectionBlocks) {
    if (block.type === 'heading' && block.level === 2) {
      section = {
        id: `section-${sections.length + 1}`,
        title: block.text || `Section ${sections.length + 1}`,
        blocks: [],
        facts: []
      };
      sections.push(section);
      continue;
    }
    if (!section) {
      intro.push(block);
      continue;
    }
    section.blocks.push(block);
    if (block.type === 'paragraph' && block.text) {
      section.facts.push({
        id: `${section.id}-fact-${section.facts.length + 1}`,
        text: block.text,
        sourceIds: ['draft-body'],
        evidenceStatus: evidenceStatus(block.text)
      });
    }
    if (block.type === 'table' && block.table) {
      for (const row of block.table.rows) {
        section.facts.push({
          id: `${section.id}-${row.id}`,
          text: row.cells.join(' | '),
          sourceIds: row.sourceIds,
          evidenceStatus: row.evidenceStatus
        });
      }
    }
  }
  const facts: ComparisonFact[] = sections.flatMap((item) => item.facts);
  return { titleText: titleBlock?.text || '', intro, sections, facts };
}

interface PageInput extends Omit<ComparisonPage, 'sourcePath' | 'titleText' | 'intro' | 'sections' | 'facts'> {
  sourceFile: string;
}

export function createComparisonPage(input: PageInput): ComparisonPage {
  const sourceFile = input.sourceFile;
  const sourcePath = path.join(SOURCE_ROOT, sourceFile);
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const parsed = parseDocument(markdown);
  if (input.slug === 'self-build-vs-platform') {
    const target = parsed.sections.find((section) => section.title.startsWith('2.'));
    if (target && !target.blocks.some((block) => block.type === 'table' && block.table?.kind === 'capability')) {
      const table: ComparisonTable = {
        id: 'self-build-capability-groups',
        title: '自研与平台的四组长期工作',
        kind: 'capability',
        columns: ['工作组', '自研 / 直接跑开源', '采购平台', '验证方式'],
        rows: [
          { id: 'self-build-capability-1', cells: ['解析、检索与知识维护', '自行维护多版式解析、索引、引用与重训队列', '使用平台既有知识工程链路并核对版本边界', '同一黄金集与解析样本 POC'], sourceIds: ['draft-body'], evidenceStatus: 'poc-required' },
          { id: 'self-build-capability-2', cells: ['Agent 与工作流运行时', '自行建设失败恢复、人工交互、调试与评测', '按平台能力配置并核对交互状态与工具边界', '同一工作流故障注入与恢复测试'], sourceIds: ['draft-body'], evidenceStatus: 'poc-required' },
          { id: 'self-build-capability-3', cells: ['安全与治理', '自行承担模型适配、密钥、沙箱、权限、审计与多租户', '按版本与合同核对治理能力和责任边界', '同一威胁用例与权限矩阵'], sourceIds: ['draft-body'], evidenceStatus: 'contract-required' },
          { id: 'self-build-capability-4', cells: ['发布、运维与支持', '自行维护渠道、升级、备份、监控、值班与支持', '按采购形态核对渠道、升级路径与支持档位', '三年 TCO 与上线演练'], sourceIds: ['draft-body'], evidenceStatus: 'poc-required' }
        ]
      };
      target.blocks.unshift({ type: 'table', table });
      target.facts.unshift(...table.rows.map((row) => ({ id: `${target.id}-${row.id}`, text: row.cells.join(' | '), sourceIds: row.sourceIds, evidenceStatus: row.evidenceStatus })));
      parsed.facts.unshift(...target.facts.slice(0, table.rows.length));
    }
  }
  return {
    ...input,
    sourcePath: `content/competitors/${sourceFile}`,
    titleText: parsed.titleText,
    intro: parsed.intro,
    sections: parsed.sections,
    facts: parsed.facts
  };
}

export function getPageTables(page: ComparisonPage) {
  return page.sections.flatMap((section) =>
    section.blocks.flatMap((block) => (block.type === 'table' && block.table ? [block.table] : []))
  );
}

export function getSourceRef(page: ComparisonPage, id: string): SourceRef | undefined {
  return page.sourceRefs.find((source) => source.id === id);
}
