import { notFound } from 'next/navigation';

import { ArticleJsonLd, BreadcrumbJsonLd, JsonLdScript } from '@/components/JsonLd';
import GuideArticlePage, { getGuideArticleCopy } from '@/components/guide/GuideArticlePage';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getGuideEntry } from '@/content/guides/registry';
import { readGuideDocument } from '@/lib/guideContent';
import { getDictionary } from '@/lib/i18n';
import { getGuideCanonicalUrl, type GuidePublishedLocale } from '@/lib/guideSeo';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';

const articleLanguage: Record<GuidePublishedLocale, string> = { en: 'en-US', zh: 'zh-CN' };

export async function GuideArticleRoute({
  locale,
  slug
}: {
  locale: GuidePublishedLocale;
  slug: string;
}) {
  const entry = getGuideEntry(slug);
  if (!entry) notFound();

  const document = readGuideDocument(slug, locale);
  const dict = await getDictionary(locale);
  const canonical = getGuideCanonicalUrl(locale, slug);
  const labels = getGuideArticleCopy(locale);
  const breadcrumbItems = [
    { name: labels.home, url: getOwnedLocaleUrl(locale) },
    { name: labels.guide, url: getGuideCanonicalUrl(locale) },
    { name: document.source.h1, url: canonical }
  ];

  return (
    <div className="home guide-article-page">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleJsonLd
        headline={document.source.h1}
        description={document.source.metaDescription}
        image={
          document.source.assetPolicy.status === 'required'
            ? getOwnedLocaleUrl(locale, document.source.assetPolicy.path)
            : undefined
        }
        url={canonical}
        inLanguage={articleLanguage[locale]}
        datePublished={document.source.datePublished}
        dateModified={document.source.dateModified}
      />
      {document.source.schemaTokens.includes('HowTo') && (
        <JsonLdScript
          data={{
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: document.source.h1,
            description: document.source.metaDescription,
            url: canonical,
            inLanguage: articleLanguage[locale],
            datePublished: document.source.datePublished,
            dateModified: document.source.dateModified
          }}
        />
      )}
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />
      <GuideArticlePage document={document} locale={locale} />
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
