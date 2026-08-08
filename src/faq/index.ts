import { faq as faqEn } from './en';
import { faqZh, type FaqItem } from './zh';
import { legacyFaqMeta } from './legacyMeta';
import { applyLegacyCategoryOverlay } from './legacyCategories';

export type { FaqItem };
export type FaqData = Record<string, FaqItem>;

export const faqContentLocaleCodes = ['en', 'zh'] as const;
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

/**
 * 返回指定语言的完整 FAQ 数据，未翻译条目 fallback 到英文
 */
export function getFaqData(lang: string): FaqData {
  const locale = resolveFaqLocale(lang);
  if (locale === 'en') return applyLegacyCategoryOverlay(faqEnWithLegacyMeta, locale);
  return applyLegacyCategoryOverlay({ ...faqEnWithLegacyMeta, ...faqByLocale[locale] }, locale);
}

/**
 * 返回指定语言的单条 FAQ，未翻译时 fallback 到英文
 */
export function getFaqItem(id: string, lang: string): FaqItem | undefined {
  const locale = resolveFaqLocale(lang);
  const localized = locale === 'zh' ? faqByLocale[locale]?.[id] : undefined;
  const item = localized ?? faqEnWithLegacyMeta[id];
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

// 英文原始数据，用于 URL 生成（generateStaticParams / sitemap）
export { faqEnWithLegacyMeta as faq };
