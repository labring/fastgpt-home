import { permanentRedirect } from 'next/navigation';

export default async function LegacyAdminCustomersPage({
  params
}: {
  params: Promise<{ legacy?: string[] }>;
}) {
  const { legacy = [] } = await params;
  permanentRedirect(`/customers/admin/customers${legacy.length > 0 ? `/${legacy.join('/')}` : ''}`);
}
