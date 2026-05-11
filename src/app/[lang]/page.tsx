import HomeLanding from '@/components/home/HomeLanding';
import { FAQJsonLd } from '@/components/JsonLd';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getGitHubStars } from '@/lib/githubStars';

export default async function HomePage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);
  const stars = await getGitHubStars();

  return (
    <>
      <FAQJsonLd
        items={dict.Home.faq.items.map((item: { title: string; content?: string; desc?: string }) => ({
          question: item.title,
          answer: item.content || item.desc || ''
        }))}
      />
      <HomeLanding dict={dict} stars={stars} />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(localeNames)?.map((lang) => ({ lang }));
}
