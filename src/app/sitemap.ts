import { MetadataRoute } from 'next';
import { faq, faqContentLocaleCodes } from '@/faq';
import { supportedLocaleCodes } from '@/lib/locales';
import { getDefaultLocalePath, getFaqPath } from '@/lib/localizedRoutes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');
  const localizedPaths = ['', '/price'];
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const addEntry = (url: string, lastModified: Date) => {
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    entries.push({ url, lastModified });
  };

  for (const locale of supportedLocaleCodes) {
    for (const path of localizedPaths) {
      addEntry(`${baseUrl}${getDefaultLocalePath(locale, path)}`, now);
    }
  }

  // FAQ 只作为 SEO 页面提交中英文；其他语言 URL 可访问但内容 fallback 到英文
  for (const locale of faqContentLocaleCodes) {
    addEntry(`${baseUrl}${getFaqPath(locale)}`, now);
  }

  // FAQ 详情页
  for (const locale of faqContentLocaleCodes) {
    for (const faqId of Object.keys(faq)) {
      addEntry(`${baseUrl}${getFaqPath(locale, faqId)}`, now);
    }
  }

  return entries;
}
