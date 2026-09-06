import entries from './entries.json';
import policy from '@/lib/technical-content-policy.json';
import { CATEGORY_DEFINITIONS } from './constants';
import {
  getTechnicalPageIdentity,
  type CategoryMeta,
  type TechCategory,
  type TechEntry,
  type TechSource
} from './types';

const EN_CATEGORY_LABELS = {
  api: 'API',
  dataset: 'Knowledge bases',
  deploy: 'Deployment and upgrades',
  integration: 'Integrations',
  node: 'Workflow nodes',
  reference: 'Technical reference',
  model: 'Model guides',
  glossary: 'Glossary',
  troubleshoot: 'Troubleshooting',
  tutorial: 'Tutorials'
} as const;

const EN_SOURCE_LABELS: Record<TechSource, string> = {
  官方文档: 'Official documentation',
  'GitHub issue': 'GitHub issue',
  深度场景内容: 'In-depth scenario content'
};

export function getTechCategoryLabelForLocale(category: TechCategory, locale: string) {
  return locale === 'zh' ? policy.categories[category] : EN_CATEGORY_LABELS[category];
}

export function getTechSourceLabelForLocale(source: TechSource, locale: string) {
  return locale === 'zh' ? source : EN_SOURCE_LABELS[source];
}

export type {
  CategoryMeta,
  TechCategory,
  TechCategoryKey,
  TechEntry,
  TechSearchEntry,
  TechSource,
  TechnicalPageIdentity
} from './types';
export { COMMON_TOPICS, PAGE_SIZE } from './constants';

export const TECH_ENTRIES = entries as TechEntry[];

export function getTechEntriesForLocale(locale: string) {
  return TECH_ENTRIES.filter((entry) => getTechnicalPageIdentity(entry).locale === locale);
}

export { getTechEntryPath, getTechnicalPageIdentity } from './types';

export const CATEGORY_META: CategoryMeta[] = CATEGORY_DEFINITIONS.map(({ key, icon }) => ({
  key,
  label: policy.categories[key],
  icon,
  count: TECH_ENTRIES.filter((entry) => entry.category === key).length
}));

export function getCategoryMetaForLocale(locale: string): CategoryMeta[] {
  const localeEntries = getTechEntriesForLocale(locale);
  return CATEGORY_DEFINITIONS.map(({ key, icon }) => ({
    key,
    label: getTechCategoryLabelForLocale(key, locale),
    icon,
    count: localeEntries.filter((entry) => entry.category === key).length
  }));
}

export function getFeaturedEntryForLocale(locale: string) {
  const localeEntries = getTechEntriesForLocale(locale);
  return (
    localeEntries.find((entry) => entry.slug === `/${locale}/api/fastgpt-chat-api-guide`) ||
    localeEntries[0]
  );
}
