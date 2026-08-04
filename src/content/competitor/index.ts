import difyComparisonPage from './dify';
import maxkbComparisonPage from './maxkb';
import ragflowComparisonPage from './ragflow';
import selfBuildComparisonPage from './selfBuild';
import type { ComparisonPage } from './types';

export const comparisonPages = {
  'dify-vs-fastgpt': difyComparisonPage,
  'self-build-vs-platform': selfBuildComparisonPage,
  'ragflow-vs-fastgpt': ragflowComparisonPage,
  'maxkb-vs-fastgpt': maxkbComparisonPage
} as const satisfies Record<string, ComparisonPage>;

export const comparisonSlugs = Object.keys(comparisonPages) as Array<keyof typeof comparisonPages>;

export function getComparisonPage(slug: string) {
  return comparisonPages[slug as keyof typeof comparisonPages];
}

export { getPageTables } from './loader';
export type * from './types';
