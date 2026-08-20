import HomeLayoutSwitcher from '@/components/home/HomeLayoutSwitcher';
import JsonLd from '@/components/JsonLd';
import { defaultLocale, getDictionary, getConfigForLocale } from '@/lib/i18n';
import { getAlternates, getRobotsPolicy, localeMap } from '@/lib/seo';
import { currentSiteBaseUrl, getBuildLocaleCodes } from '@/lib/siteRouting';
import { Metadata } from 'next';

export default async function LangHome({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <JsonLd lang={langName} schema={dict.JsonLd} />
      <HomeLayoutSwitcher dict={dict}>{children}</HomeLayoutSwitcher>
    </>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const config = getConfigForLocale(langName);
  const baseUrl = currentSiteBaseUrl;
  const ogLocale = localeMap[langName] || 'en_US';
  const alternateLocales = Object.values(localeMap).filter((l) => l !== ogLocale);

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
    robots: getRobotsPolicy(!(lang && langName === defaultLocale)),
    alternates: getAlternates(langName)
  };
}

// Generate static paths for all supported languages
export async function generateStaticParams() {
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}
