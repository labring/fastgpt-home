import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningCenterPage from '@/components/learning-center/LearningCenterPage';
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

  return (
    <LearningCenterPage
      locale="zh"
      navLinks={dict.links}
      navCta={dict.Home.navCta}
      footer={dict.Home.footer}
    />
  );
}
