import type { Metadata } from 'next';
import NotFoundPage from '@/components/home/NotFoundPage';

export const metadata: Metadata = {
  title: '页面未找到 - FastGPT',
  description: '您访问的页面不存在或已移动，可返回 FastGPT 首页、查看价格或文档。',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return <NotFoundPage />;
}
