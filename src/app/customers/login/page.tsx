import { redirect } from 'next/navigation';
import AdminLoginForm from '@/customers/components/admin/AdminLoginForm';
import { getAdminSession, isAdminPortalEnabled } from '@/customers/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: '后台登录 | FastGPT Customer Stories',
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLoginPage() {
  if (!isAdminPortalEnabled()) {
    redirect('/customers');
  }

  const session = await getAdminSession();
  if (session) {
    redirect('/customers/admin');
  }

  return <AdminLoginForm />;
}
