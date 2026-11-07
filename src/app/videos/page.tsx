import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningCenterPage from '@/components/learning-center/LearningCenterPage';
import { staticVideos } from '@/components/learning-center/videos';
import { videoSchemaMetadata } from '@/components/learning-center/videoSchemaMetadata';
import { JsonLdScript } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { getAlternates } from '@/lib/seo';
import { currentSiteVariant, getOwnedLocaleUrl } from '@/lib/siteRouting';

const title = 'FastGPT 视频教程 - AI 知识库、RAG 与工作流搭建学习中心';
const description =
  '通过 FastGPT 视频教程，系统学习 AI 知识库、RAG、Agent 与工作流搭建，从入门操作到私有化部署和运维实践，帮助团队快速掌握产品能力。';

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
  const videoItems = staticVideos
    .map((video) => {
      const bvid = video.url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/)?.[1];
      const metadata = bvid ? videoSchemaMetadata[bvid] : undefined;
      return metadata
        ? {
            '@type': 'VideoObject',
            name: video.title,
            description: video.desc,
            thumbnailUrl: metadata.thumbnailUrl,
            uploadDate: metadata.uploadDate,
            duration: metadata.duration,
            contentUrl: video.url,
            embedUrl: video.url,
            inLanguage: 'zh-CN'
          }
        : null;
    })
    .filter((video): video is NonNullable<typeof video> => Boolean(video));

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
