import { redirect } from 'next/navigation';
import { getCustomerById } from '@/app/customers/admin/actions/customers';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';
import { renderEditCustomerPage } from '@/app/customers/admin/_edit-page';

type LegacyEditCustomerPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export default async function LegacyEditCustomerPage({
  params
}: LegacyEditCustomerPageProps) {
  const { categorySlug: id } = await params;
  const customerRes = await getCustomerById(id);
  const customer = customerRes.success ? customerRes.data : null;

  if (customer?.categorySlug) {
    redirect(buildAdminCustomerEditHref({
      id,
      categorySlug: customer.categorySlug
    }));
  }

  return renderEditCustomerPage(id);
}
