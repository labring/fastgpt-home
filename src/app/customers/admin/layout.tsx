import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Sidebar from '@/customers/components/admin/Sidebar';
import { getAdminSession, isAdminPortalEnabled } from '@/customers/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminPortalEnabled()) {
    redirect('/customers');
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
        <div className="w-full flex-1 flex flex-col">{children}</div>
      </main>
    </div>
  );
}
