import { notFound } from 'next/navigation';

import { BreadcrumbJsonLd, JsonLdScript } from '@/components/JsonLd';
import GuideArticlePage from '@/components/guide/GuideArticlePage';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getGuideEntry } from '@/content/guides/registry';
import { readGuideDocument } from '@/lib/guideContent';
import { getDictionary } from '@/lib/i18n';
import { getGuideCanonicalUrl, getGuideOwnedPath, type GuidePublishedLocale } from '@/lib/guideSeo';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';

const articleLanguage: Record<GuidePublishedLocale, string> = { en: 'en-US', zh: 'zh-CN' };

export async function GuideArticleRoute({ locale, slug }: { locale: GuidePublishedLocale; slug: string }) {
  const entry = getGuideEntry(slug);
  if (!entry) notFound();

  const document = readGuideDocument(slug, locale);
  const dict = await getDictionary(locale);
  const canonical = getGuideCanonicalUrl(locale, slug);

  return (
    <div className="home guide-article-page">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
          { name: locale === 'zh' ? '指南' : 'Guide', url: getGuideCanonicalUrl(locale) },
          { name: document.source.h1, url: canonical }
        ]}
      />
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: document.source.h1,
          description: document.source.metaDescription,
          inLanguage: articleLanguage[locale],
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
          datePublished: document.source.datePublished,
          dateModified: document.source.dateModified,
          author: { '@type': 'Organization', name: 'FastGPT' },
          publisher: { '@type': 'Organization', name: 'FastGPT' }
        }}
      />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />
      <GuideArticlePage document={document} locale={locale} slug={entry.slug} />
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
