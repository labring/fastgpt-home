import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { redirect, notFound } from 'next/navigation';
import Sidebar from '@/customers/components/admin/Sidebar';
import { getAdminSession, isAdminPortalEnabled } from '@/customers/lib/admin-auth';

export const metadata: Metadata = {
  title: '后台管理 | FastGPT Customer Stories',
  description: 'FastGPT Customer Stories 官方后台管理系统',
  robots: {
    index: false,
    follow: false
  },
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminPortalEnabled()) {
    notFound();
  }

  const session = await getAdminSession();
  if (!session) {
    redirect('/customers/login');
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#202124] overflow-hidden">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        <div className="w-full flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
