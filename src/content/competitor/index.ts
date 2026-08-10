import { difyComparisonPages } from './dify';
import { maxkbComparisonPages } from './maxkb';
import { ragflowComparisonPages } from './ragflow';
import { selfBuildComparisonPages } from './selfBuild';
import type { CompareLocale, ComparisonPage, ComparisonPagesByLocale } from './types';

export const comparisonPages = {
  'dify-vs-fastgpt': difyComparisonPages,
  'ragflow-vs-fastgpt': ragflowComparisonPages,
  'maxkb-vs-fastgpt': maxkbComparisonPages,
  'self-build-vs-platform': selfBuildComparisonPages
} as const satisfies Record<string, ComparisonPagesByLocale>;

export const comparisonSlugs = Object.keys(comparisonPages) as Array<keyof typeof comparisonPages>;
export const comparisonLocales = ['zh', 'en'] as const satisfies CompareLocale[];

export function resolveCompareLocale(locale: string): CompareLocale {
  return locale === 'zh' ? 'zh' : 'en';
}

export function getComparisonPage(slug: string, locale: CompareLocale): ComparisonPage | undefined {
  return comparisonPages[slug as keyof typeof comparisonPages]?.[locale];
}

export function getComparisonPagesForLocale(locale: CompareLocale) {
  return comparisonSlugs.map((slug) => comparisonPages[slug][locale]);
}

export type * from './types';
