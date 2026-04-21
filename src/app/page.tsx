import HomeLanding from '@/components/home/HomeLanding';
import JsonLd from '@/components/JsonLd';
import { defaultLocale, getDictionary, getConfigForLocale } from '@/lib/i18n';
import { getAlternates } from '@/lib/seo';
import { getGitHubStars } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfigForLocale(defaultLocale);
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: getAlternates(defaultLocale, '')
  };
}

export default async function RootPage() {
  const dict = await getDictionary(defaultLocale);
  const stars = await getGitHubStars();

  return (
    <>
      <JsonLd lang={defaultLocale} />
      <HomeLanding dict={dict} stars={stars} />
    </>
  );
}
