import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningCenterPage from '@/components/learning-center/LearningCenterPage';
import { getDictionary } from '@/lib/i18n';
import { currentSiteVariant, getOwnedLocaleUrl } from '@/lib/siteRouting';

const title = 'FastGPT 学习中心';
const description =
  '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有教程均由官方团队精心制作。';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = getOwnedLocaleUrl('zh', '/videos');
  return {
    title,
    description,
    alternates: { canonical },
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
