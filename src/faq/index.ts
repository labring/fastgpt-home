import { faq as faqEn } from './en';
import { faqZh, type FaqItem } from './zh';
import { legacyFaqMeta } from './legacyMeta';
import { applyLegacyCategoryOverlay } from './legacyCategories';
import { faqPublishedLocaleCodes } from '@/lib/publishedLocales';
import englishRouteRegistry from './generated-en-route-registry.json';
import approvedEnglishFaqMetadata from './generated-en-metadata.json';

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
const approvedEnglishFaqMetadataByContentId = new Map(
  approvedEnglishFaqMetadata.records.map((record) => [record.contentId, record]),
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

const faqEnWithApprovedMetadata: Record<string, FaqItem> = Object.fromEntries(
  Object.entries(faqEnWithLegacyMeta).map(([id, item]) => {
    const approved = approvedEnglishFaqMetadataByContentId.get(id);
    return approved
      ? [
          id,
          {
            ...item,
            Title: approved.title,
            Description: approved.description,
            Keywords: approved.keywords
          }
        ]
      : [id, item];
  }),
);

const faqEnWithLegacyCategories = applyLegacyCategoryOverlay(faqEnWithApprovedMetadata, 'en');

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

/** Resolve a published locale route key to the durable cross-locale FAQ identity. */
export function resolveFaqContentId(routeKey: string, lang: string): string | undefined {
  if (!routeKey) return undefined;

  const locale = resolveFaqLocale(lang);
  if (locale === 'en') {
    return englishRouteBySlug.get(routeKey)?.contentId || englishRouteByContentId.get(routeKey)?.contentId;
  }

  return faqByLocale[locale]?.[routeKey] ? routeKey : undefined;
}

/** Return the published route key for a durable FAQ identity in a locale. */
export function getFaqRouteKey(contentId: string, lang: string): string | undefined {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') {
    const canonicalSlug = englishRouteByContentId.get(contentId)?.canonicalSlug;
    return canonicalSlug && faqEnByCanonicalSlug[canonicalSlug] ? canonicalSlug : undefined;
  }

  return faqByLocale[locale]?.[contentId] ? contentId : undefined;
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
  const contentId = resolveFaqContentId(id, locale);
  const routeKey = contentId ? getFaqRouteKey(contentId, locale) : undefined;
  if (!routeKey) return undefined;

  if (locale === 'en') {
    return faqEnByCanonicalSlug[routeKey];
  }
  const item = faqByLocale[locale]?.[routeKey];
  return item ? applyLegacyCategoryOverlay({ [routeKey]: item }, locale)[routeKey] : undefined;
}

export function getFaqIds(lang: string): string[] {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') return englishRouteRecords.map((record) => record.canonicalSlug);
  return Object.keys(faqByLocale[locale] || {});
}

export function getFaqTranslationLocales(routeKey: string, lang = 'en'): FaqContentLocale[] {
  const contentId =
    resolveFaqContentId(routeKey, lang) ||
    resolveFaqContentId(routeKey, 'en') ||
    resolveFaqContentId(routeKey, 'zh');
  if (!contentId) return [];

  return faqContentLocaleCodes.filter((locale) => Boolean(getFaqRouteKey(contentId, locale)));
}

// English source data for URL generation (generateStaticParams / sitemap).
export { faqEnByCanonicalSlug as faq };
