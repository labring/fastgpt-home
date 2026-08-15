import { faq as faqEn } from './en';
import { faqZh, type FaqItem } from './zh';
import { legacyFaqMeta } from './legacyMeta';
import { applyLegacyCategoryOverlay } from './legacyCategories';
import { faqPublishedLocaleCodes } from '@/lib/publishedLocales';

export type { FaqItem };
export type FaqData = Record<string, FaqItem>;

export const faqContentLocaleCodes = faqPublishedLocaleCodes;
export type FaqContentLocale = (typeof faqContentLocaleCodes)[number];

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

export function resolveFaqLocale(lang: string): FaqContentLocale {
  if (lang.startsWith('zh')) return 'zh';
  return 'en';
}

/** Return only FAQ entries with complete content in the requested locale. */
export function getFaqData(lang: string): FaqData {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') return applyLegacyCategoryOverlay(faqEnWithLegacyMeta, locale);
  return applyLegacyCategoryOverlay(faqByLocale[locale] || {}, locale);
}

/** Return an FAQ entry only when it is published in the requested locale. */
export function getFaqItem(id: string, lang: string): FaqItem | undefined {
  const locale = resolveFaqLocale(lang);
  const item = locale === 'en' ? faqEnWithLegacyMeta[id] : faqByLocale[locale]?.[id];
  return item ? applyLegacyCategoryOverlay({ [id]: item }, locale)[id] : undefined;
}

export function getFaqIds(lang: string): string[] {
  return Object.keys(getFaqData(lang));
}

export function getFaqTranslationLocales(id: string): FaqContentLocale[] {
  return faqContentLocaleCodes.filter((locale) => {
    if (locale === 'en') return Boolean(faqEn[id as keyof typeof faqEn]);
    return Boolean(faqByLocale[locale]?.[id]);
  });
}

// English source data for URL generation (generateStaticParams / sitemap).
export { faqEnWithLegacyMeta as faq };
