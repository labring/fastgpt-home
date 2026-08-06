import HomeLanding from '@/components/home/HomeLanding';
import JsonLd, { FAQJsonLd } from '@/components/JsonLd';
import { defaultLocale, getDictionary, getConfigForLocale } from '@/lib/i18n';
import { getRootAlternates, localeMap } from '@/lib/seo';
import { getGitHubStars } from '@/lib/githubStars';
import { currentSiteBaseUrl } from '@/lib/siteRouting';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfigForLocale(defaultLocale);
  const baseUrl = currentSiteBaseUrl;
  const ogLocale = localeMap[defaultLocale] || 'en_US';
  const alternateLocales = Object.values(localeMap).filter((locale) => locale !== ogLocale);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: config.authors,
    creator: config.creator,
    icons: config.icons,
    metadataBase: new URL(baseUrl),
    openGraph: {
      ...config.openGraph,
      locale: ogLocale,
      alternateLocale: alternateLocales
    },
    twitter: config.twitter,
    alternates: getRootAlternates(defaultLocale)
  };
}

export default async function RootPage() {
  const dict = await getDictionary(defaultLocale);
  const stars = await getGitHubStars();

  return (
    <>
      <JsonLd lang={defaultLocale} schema={dict.JsonLd} />
      <FAQJsonLd
        items={dict.Home.faq.items.map(
          (item: { title: string; content?: string; desc?: string }) => ({
            question: item.title,
            answer: item.content || item.desc || ''
          })
        )}
      />
      <HomeLanding dict={dict} locale={defaultLocale} stars={stars} />
    </>
  );
}
