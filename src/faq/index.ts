import { faq as faqEn } from './en';
import { faqZh, type FaqItem } from './zh';

export type { FaqItem };
export type FaqData = Record<string, FaqItem>;

// 按语言索引的翻译数据（新增语言在此扩展）
const faqByLocale: Record<string, Record<string, FaqItem>> = {
  zh: faqZh,
};

function resolveLocale(lang: string): string | null {
  if (lang.startsWith('zh')) return 'zh';
  return null;
}

/**
 * 返回指定语言的完整 FAQ 数据，未翻译条目 fallback 到英文
 */
export function getFaqData(lang: string): FaqData {
  const locale = resolveLocale(lang);
  if (!locale || !faqByLocale[locale]) return faqEn as FaqData;
  return { ...faqEn, ...faqByLocale[locale] };
}

/**
 * 返回指定语言的单条 FAQ，未翻译时 fallback 到英文
 */
export function getFaqItem(id: string, lang: string): FaqItem | undefined {
  const locale = resolveLocale(lang);
  const localized = locale ? faqByLocale[locale]?.[id] : undefined;
  return localized ?? faqEn[id as keyof typeof faqEn];
}

// 英文原始数据，用于 URL 生成（generateStaticParams / sitemap）
export { faqEn as faq };
