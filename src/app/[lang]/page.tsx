import HomeLanding from '@/components/home/HomeLanding';
import JsonLd, { FAQJsonLd } from '@/components/JsonLd';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getGitHubStars } from '@/lib/githubStars';
import { getBuildLocaleCodes } from '@/lib/siteRouting';

export default async function HomePage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);
  const stars = await getGitHubStars();

  return (
    <>
      <JsonLd lang={langName} schema={dict.JsonLd} includePageSchemas includeSiteSchemas={false} />
      <FAQJsonLd
        items={dict.Home.faq.items.map(
          (item: { title: string; content?: string; desc?: string }) => ({
            question: item.title,
            answer: item.content || item.desc || ''
          })
        )}
      />
      <HomeLanding dict={dict} locale={langName} stars={stars} />
    </>
  );
}

export async function generateStaticParams() {
  return getBuildLocaleCodes(defaultLocale).map((lang) => ({ lang }));
}
