/**
 * 首页「AI 可读目录」的纯函数构建器。
 *
 * 职责：
 * - 把全量已发布内容拆分为「客户案例」与「解决方案」两层；
 * - 生成面向 AI 抓取与 GEO 的语义化案例锚文本（标题 + 客户名 + 核心指标）；
 * - 对 B/C 级与脱敏案例做公开口径清洗（内部备注绝不进入页面 HTML）；
 * - 构建首页 ItemList 结构化数据。
 *
 * 本文件不依赖 Next.js / MongoDB，便于单测覆盖。
 */

export type AiDirectoryEntry = {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  title: string;
  description: string;
  contentType: 'solution' | 'case';
  caseOrg?: string;
  clearanceLevel?: 'A' | 'B' | 'C' | '';
  caseNo?: number;
  citedNumbers?: string;
};

/**
 * 内部对账备注标记：命中任一即视为「仅内部使用」，不进入公开目录。
 * 覆盖 `_cited_numbers` 中的「（KB 未给量化值）」「（B 级：…）」「按客户 … 脱敏要求」等口径备注。
 */
const INTERNAL_NOTE_MARKERS = /(KB|量化值|B 级|C 级|脱敏|不进页面|见《|按客户)/;

export function isPublicCitedNumbers(value: string): boolean {
  return Boolean(value.trim()) && !INTERNAL_NOTE_MARKERS.test(value);
}

/**
 * C 级案例的 caseOrg 含内部备注（真实主体、清单行号等），公开时只保留第一个「（」之前的部分，
 * 例如「某制药企业（C 级匿名化，真实主体见《…》第 27 行，不进页面）」→「某制药企业」。
 */
export function toPublicCaseOrg(
  entry: Pick<AiDirectoryEntry, 'caseOrg' | 'clearanceLevel'>
): string {
  const org = entry.caseOrg || '';
  if (!org.trim()) {
    return '';
  }
  if (entry.clearanceLevel === 'C') {
    return org.split('（')[0].trim();
  }
  return org.trim();
}

/**
 * 案例锚文本：`案例标题（客户名）：核心指标`。
 * 核心指标仅当为公开口径（无内部备注）时才拼接，避免泄漏 B/C 级与脱敏注释。
 */
export function formatCaseName(entry: AiDirectoryEntry): string {
  const org = toPublicCaseOrg(entry);
  const base = org ? `${entry.title}（${org}）` : entry.title;
  const citedNumbers = entry.citedNumbers || '';
  if (isPublicCitedNumbers(citedNumbers)) {
    return `${base}：${citedNumbers}`;
  }
  return base;
}

/**
 * 把全量已发布内容拆分为「客户案例」（按 caseNo 升序，语义稳定）与「解决方案」。
 */
export function splitDirectoryEntries(entries: AiDirectoryEntry[]) {
  const cases = entries
    .filter((entry) => entry.contentType === 'case')
    .sort((a, b) => (a.caseNo || 0) - (b.caseNo || 0));
  const solutions = entries.filter((entry) => entry.contentType !== 'case');
  return { cases, solutions };
}

/**
 * 构建首页 ItemList 结构化数据：
 * - 客户案例 ItemList（锚文本 = formatCaseName，强化「案例 ↔ 客户 ↔ 指标」实体关联）；
 * - 解决方案 ItemList。
 * 全部使用语义 slug 绝对 URL。无任何条目时返回 null，调用方不输出 script。
 */
export function buildHomeDirectoryJsonLd(options: {
  cases: AiDirectoryEntry[];
  solutions: AiDirectoryEntry[];
  absoluteUrlOf: (entry: AiDirectoryEntry) => string;
}) {
  const caseItems = options.cases.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: formatCaseName(entry),
    url: options.absoluteUrlOf(entry)
  }));
  const solutionItems = options.solutions.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.title,
    url: options.absoluteUrlOf(entry)
  }));

  const graph: unknown[] = [];
  if (caseItems.length > 0) {
    graph.push({
      '@type': 'ItemList',
      name: 'FastGPT 客户案例',
      itemListElement: caseItems
    });
  }
  if (solutionItems.length > 0) {
    graph.push({
      '@type': 'ItemList',
      name: 'FastGPT 解决方案',
      itemListElement: solutionItems
    });
  }

  if (graph.length === 0) {
    return null;
  }
  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}
