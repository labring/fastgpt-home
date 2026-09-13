import { BreadcrumbJsonLd, JsonLdScript } from '@/components/JsonLd';
import GuideHubPage, { getGuideHubCopy } from '@/components/guide/GuideHubPage';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { guideBuildEntries } from '@/content/guides/registry';
import { getDictionary } from '@/lib/i18n';
import {
  GUIDE_PUBLISHED_LOCALES,
  getGuideCanonicalUrl,
  getGuidePath,
  type GuidePublishedLocale
} from '@/lib/guideSeo';
import { getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

const hubLanguage: Record<GuidePublishedLocale, string> = { en: 'en-US', zh: 'zh-CN' };

export async function GuideHubRoute({ locale }: { locale: GuidePublishedLocale }) {
  const dict = await getDictionary(locale);
  const canonical = getGuideCanonicalUrl(locale);
  const copy = getGuideHubCopy(locale);
  const breadcrumbItems = [
    { name: copy.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
    { name: copy.breadcrumbGuide, url: canonical }
  ];
  const itemList = guideBuildEntries.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry[locale].h1,
    url: getOwnedLocaleUrl(locale, getGuidePath(entry.slug))
  }));

  return (
    <div className="home overflow-x-hidden guide-hub-page-shell">
      <BreadcrumbJsonLd items={breadcrumbItems} />
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
              inLanguage: hubLanguage[locale],
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
              itemListElement: itemList
            }
          ]
        }}
      />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        locale={locale}
        publishedLocales={GUIDE_PUBLISHED_LOCALES}
        reviewLocalePaths={isPreviewSite}
      />
      <GuideHubPage locale={locale} />
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
