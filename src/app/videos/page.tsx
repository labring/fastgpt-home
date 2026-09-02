import type { Metadata } from 'next';
import LearningCenterPage from '@/components/learning-center/LearningCenterPage';

export const metadata: Metadata = {
  title: 'FastGPT 学习中心',
  description:
    '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有教程均由官方团队精心制作。',
  alternates: {
    canonical: '/videos'
  },
  openGraph: {
    title: 'FastGPT 学习中心',
    description:
      '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有教程均由官方团队精心制作。',
    type: 'website'
  }
};

export default function VideosPage() {
  return <LearningCenterPage />;
}
