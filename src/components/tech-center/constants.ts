import type { TechCategory, TechSource } from './types';

export const CATEGORY_DEFINITIONS: ReadonlyArray<{
  key: TechCategory;
  icon: string;
}> = [
  { key: 'tutorial', icon: '◎' },
  { key: 'deploy', icon: '▰' },
  { key: 'troubleshoot', icon: '◇' },
  { key: 'dataset', icon: '◉' },
  { key: 'node', icon: '⌘' },
  { key: 'integration', icon: '↗' },
  { key: 'api', icon: '{ }' },
  { key: 'reference', icon: '⌁' },
  { key: 'model', icon: '◌' },
  { key: 'glossary', icon: '▤' }
];

export const SOURCE_DEFINITIONS: ReadonlyArray<{
  value: TechSource;
  label: string;
}> = [
  { value: '官方文档', label: '官方文档' },
  { value: 'GitHub issue', label: 'GitHub Issue' },
  { value: '深度场景内容', label: '深度场景内容' }
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
