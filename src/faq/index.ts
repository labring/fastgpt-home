import { faq as faqEn } from './en';
import { faqZh, type FaqItem } from './zh';
import { legacyFaqMeta } from './legacyMeta';
import { applyLegacyCategoryOverlay } from './legacyCategories';
import { faqPublishedLocaleCodes } from '@/lib/publishedLocales';
import englishRouteRegistry from './generated-en-route-registry.json';

export type { FaqItem };
export type FaqData = Record<string, FaqItem>;

export const faqContentLocaleCodes = faqPublishedLocaleCodes;
export type FaqContentLocale = (typeof faqContentLocaleCodes)[number];

type EnglishRouteRecord = (typeof englishRouteRegistry.records)[number];

const englishRouteRecords = englishRouteRegistry.records as EnglishRouteRecord[];
const englishRouteBySlug = new Map(
  englishRouteRecords.map((record) => [record.canonicalSlug, record]),
);
const englishRouteByContentId = new Map(
  englishRouteRecords.map((record) => [record.contentId, record]),
);

// 按语言索引的翻译数据（新增语言在此扩展）
const faqByLocale: Record<string, Record<string, FaqItem>> = {
  zh: faqZh
};

const faqEnWithLegacyMeta: Record<string, FaqItem> = Object.fromEntries(
  Object.entries(faqEn).map(([id, item]) => [
    id,
    legacyFaqMeta[id] ? { ...item, ...legacyFaqMeta[id] } : item,
  ]),
);

const faqEnWithLegacyCategories = applyLegacyCategoryOverlay(faqEnWithLegacyMeta, 'en');

const faqEnByCanonicalSlug: Record<string, FaqItem> = Object.fromEntries(
  englishRouteRecords.map((record) => {
    const item = faqEnWithLegacyCategories[record.contentId];
    if (!item) throw new Error(`Missing English FAQ content for ${record.contentId}`);
    return [record.canonicalSlug, item];
  }),
);

/** Resolve a final English route slug to the authored content identity. */
export function resolveEnglishFaqContentId(canonicalSlug: string): string | undefined {
  return englishRouteBySlug.get(canonicalSlug)?.contentId;
}

/** Return the committed canonical slug for an English content identity or slug. */
export function getEnglishFaqCanonicalSlug(id: string): string | undefined {
  return englishRouteBySlug.get(id)?.canonicalSlug || englishRouteByContentId.get(id)?.canonicalSlug;
}

export function resolveFaqLocale(lang: string): FaqContentLocale {
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

/** Return only FAQ entries with complete content in the requested locale. */
export function getFaqData(lang: string): FaqData {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') return faqEnByCanonicalSlug;
  return applyLegacyCategoryOverlay(faqByLocale[locale] || {}, locale);
}

/** Return an FAQ entry only when it is published in the requested locale. */
export function getFaqItem(id: string, lang: string): FaqItem | undefined {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') {
    return resolveEnglishFaqContentId(id) ? faqEnByCanonicalSlug[id] : undefined;
  }
  const item = faqByLocale[locale]?.[id];
  return item ? applyLegacyCategoryOverlay({ [id]: item }, locale)[id] : undefined;
}

export function getFaqIds(lang: string): string[] {
  return Object.keys(getFaqData(lang));
}

export function getFaqTranslationLocales(id: string): FaqContentLocale[] {
  const englishContentId = resolveEnglishFaqContentId(id) || id;
  return faqContentLocaleCodes.filter((locale) => {
    if (locale === 'en') return Boolean(faqEn[englishContentId as keyof typeof faqEn]);
    return Boolean(faqByLocale[locale]?.[englishContentId]);
  });
}

// English source data for URL generation (generateStaticParams / sitemap).
export { faqEnByCanonicalSlug as faq };
