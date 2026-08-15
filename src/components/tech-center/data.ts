import entries from './entries.json';

export type TechCategoryKey =
  | 'all'
  | 'tutorial'
  | 'deploy'
  | 'troubleshoot'
  | 'dataset'
  | 'node'
  | 'integration'
  | 'api';

export type TechCategory = Exclude<TechCategoryKey, 'all'>;
export type TechSource = '官方文档' | 'GitHub issue' | '深度场景内容';

export type TechEntry = {
  title: string;
  slug: string;
  category: TechCategory;
  categoryLabel: string;
  source?: string;
  sourceType: TechSource;
  summary: string;
  minutes: number;
};

export type CategoryMeta = {
  key: TechCategory;
  label: string;
  icon: string;
  count: number;
};

export const TECH_ENTRIES = entries as TechEntry[];

export function getTechEntryPath(entry: Pick<TechEntry, 'slug'>) {
  return entry.slug.replace(/^\/zh(?=\/)/, '');
}

export const FEATURED_ENTRY =
  TECH_ENTRIES.find((entry) => entry.slug === '/zh/api/fastgpt-chat-api-guide') || TECH_ENTRIES[0]!;

export const CATEGORY_META: CategoryMeta[] = [
  { key: 'tutorial', label: '教程', icon: '◎', count: 86 },
  { key: 'deploy', label: '部署与升级', icon: '▰', count: 306 },
  { key: 'troubleshoot', label: '故障排查', icon: '◇', count: 196 },
  { key: 'dataset', label: '知识库', icon: '◉', count: 10 },
  { key: 'node', label: '工作流节点', icon: '⌘', count: 40 },
  { key: 'integration', label: '集成', icon: '↗', count: 26 },
  { key: 'api', label: 'API', icon: '{ }', count: 8 }
];

export const COMMON_TOPICS = [
  'Docker',
  '版本升级',
  '私有部署',
  '工作流',
  '知识库',
  'RAG',
  'API',
  'MCP',
  '插件',
  '模型配置'
];

export const PAGE_SIZE = 12;
