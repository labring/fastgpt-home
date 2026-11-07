import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningCenterPage from '@/components/learning-center/LearningCenterPage';
import { buildVideoObjectItems } from '@/components/learning-center/videoSchema';
import { JsonLdScript } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { getAlternates } from '@/lib/seo';
import seoPageCopy from '@/lib/seoPageCopy.json';
import { currentSiteVariant, getOwnedLocaleUrl } from '@/lib/siteRouting';

const { title, description } = seoPageCopy.videos;

export async function generateMetadata(): Promise<Metadata> {
  const canonical = getOwnedLocaleUrl('zh', '/videos');
  return {
    title,
    description,
    alternates: getAlternates('zh', '/videos', ['zh']),
    openGraph: { title, description, type: 'website', url: canonical }
  };
}

export default async function VideosPage() {
  if (currentSiteVariant === 'io') notFound();
  const dict = await getDictionary('zh');
  const videoItems = buildVideoObjectItems();

  return (
    <>
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: videoItems.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: video
          }))
        }}
      />
      <LearningCenterPage
        locale="zh"
        navLinks={dict.links}
        navCta={dict.Home.navCta}
        footer={dict.Home.footer}
      />
    </>
  );
}
