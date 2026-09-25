import { notFound } from 'next/navigation';

import { BreadcrumbJsonLd, JsonLdScript } from '@/components/JsonLd';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import IndustryHubPage, { getIndustryHubCopy } from '@/components/industry/IndustryHubPage';
import { INDUSTRY_LOCALES, industryArticles, type IndustryLocale } from '@/lib/industryContent';
import { getDictionary } from '@/lib/i18n';
import { getIndustryHubCanonicalUrl } from '@/lib/industrySeo';
import { getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

export async function IndustryHubRoute({ locale }: { locale: IndustryLocale }) {
  const dict = await getDictionary(locale);
  const copy = getIndustryHubCopy(locale);
  const canonical = getIndustryHubCanonicalUrl(locale);
  const articles = industryArticles.filter((article) => article.locale === locale).slice(0, 12);
  if (!articles.length) notFound();

  return (
    <div className="home overflow-x-hidden guide-hub-page-shell">
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, url: getOwnedLocaleUrl(locale) },
          { name: copy.industry, url: canonical }
        ]}
      />
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${canonical}#webpage`,
              url: canonical,
              name: copy.heading,
              description: copy.description,
              inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
              isPartOf: {
                '@type': 'WebSite',
                name: dict.JsonLd.siteName,
                url: new URL(canonical).origin
              },
              mainEntity: { '@id': `${canonical}#item-list` }
            },
            {
              '@type': 'ItemList',
              '@id': `${canonical}#item-list`,
              itemListElement: articles.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: article.title,
                url: `${canonical}/${article.slug}`
              }))
            }
          ]
        }}
      />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        locale={locale}
        publishedLocales={INDUSTRY_LOCALES}
        reviewLocalePaths={isPreviewSite}
      />
      <IndustryHubPage locale={locale} />
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
