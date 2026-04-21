import HomeLayoutSwitcher from '@/components/home/HomeLayoutSwitcher';
import JsonLd from '@/components/JsonLd';
import { defaultLocale, getDictionary, localeNames, getConfigForLocale } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import { Metadata } from 'next';

export default async function LangHome({ children, params }: { children: React.ReactNode, params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <JsonLd lang={langName} />
      <HomeLayoutSwitcher dict={dict}>{children}</HomeLayoutSwitcher>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang?: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const config = getConfigForLocale(langName);
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const ogLocale = localeMap[langName] || 'en_US';
  const alternateLocales = Object.values(localeMap).filter(l => l !== ogLocale);

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
    alternates: getAlternates(langName)
  };
}

// Generate static paths for all supported languages
export async function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}
