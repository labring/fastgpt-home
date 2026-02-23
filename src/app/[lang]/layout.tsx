import Header from '@/components/header/Header';
import JsonLd from '@/components/JsonLd';
import { siteConfig, siteConfigZh, siteConfigJa } from '@/config/site';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import { Metadata } from 'next';

export default async function LangHome({ children, params }: { children: React.ReactNode, params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <>
      <JsonLd lang={langName} />
      <Header dict={dict} CTALocale={dict.CTAButton} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          {children}
        </div>
      </main>
    </>
  );
}

function getConfigForLang(lang: string) {
  switch (lang) {
    case 'zh': return siteConfigZh;
    case 'ja': return siteConfigJa;
    default: return siteConfig;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang?: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const config = getConfigForLang(langName);
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
    metadataBase: new URL(config.metadataBase as string, baseUrl),
    openGraph: {
      ...config.openGraph,
      locale: ogLocale,
      alternateLocales
    },
    twitter: config.twitter,
    alternates: getAlternates(langName)
  };
}

// Generate static paths for all supported languages
export async function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}
