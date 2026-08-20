import { notFound } from 'next/navigation';

export default function MissingPage() {
  // 未知路径返回真实 404（而非软 404 跳首页），由 not-found.tsx 渲染。
  notFound();
}
