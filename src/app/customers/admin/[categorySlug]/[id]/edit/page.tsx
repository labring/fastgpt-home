import { permanentRedirect, redirect } from 'next/navigation';
import { getCustomerById } from '@/app/customers/admin/actions/customers';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';
import { renderEditCustomerPage } from '@/app/customers/admin/_edit-page';

type EditCustomerWithCategoryPageProps = {
  params: Promise<{ categorySlug: string; id: string }>;
};

export default async function EditCustomerWithCategoryPage({
  params
}: EditCustomerWithCategoryPageProps) {
  const resolvedParams = await params;
  const customerRes = await getCustomerById(resolvedParams.id);
  const customer = customerRes.success ? customerRes.data : null;

  // 旧 ObjectId / 非规范 URL → 语义 slug URL（与前台 URL 对齐）
  if (customer?.slug && resolvedParams.id !== customer.slug) {
    permanentRedirect(buildAdminCustomerEditHref({
      id: customer.slug,
      slug: customer.slug,
      categorySlug: customer.categorySlug
    }));
  }

  if (customer?.categorySlug && customer.categorySlug !== resolvedParams.categorySlug) {
    redirect(buildAdminCustomerEditHref({
      id: customer.slug || resolvedParams.id,
      slug: customer.slug,
      categorySlug: customer.categorySlug
    }));
  }

  return renderEditCustomerPage(resolvedParams.id);
}
