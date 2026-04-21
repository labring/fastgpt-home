import HomeLanding from '@/components/home/HomeLanding';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getGitHubStars } from '@/lib/utils';

export default async function HomePage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);
  const stars = await getGitHubStars();

  return <HomeLanding dict={dict} stars={stars} />;
}

export async function generateStaticParams() {
  return Object.keys(localeNames)?.map((lang) => ({ lang }));
}
