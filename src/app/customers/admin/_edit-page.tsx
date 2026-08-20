import CustomerEditor from '@/customers/components/admin/CustomerEditor';
import { getAdminCategories } from '@/app/customers/admin/actions/categories';
import { getCustomerById, getAdminCustomers } from '@/app/customers/admin/actions/customers';
import { redirect } from 'next/navigation';

export async function renderEditCustomerPage(id: string) {
  const [catRes, solRes, allRes] = await Promise.all([
    getAdminCategories(),
    getCustomerById(id),
    getAdminCustomers('')
  ]);

  if (solRes.success && !solRes.data) {
    redirect('/customers/admin');
  }

  if (!catRes.success || !solRes.success || !solRes.data) {
    return <div className="p-8 text-center text-red-500">无法加载数据，请重试。</div>;
  }

  const allItems = allRes.success ? allRes.data?.items ?? [] : [];
  const currentIndex = allItems.findIndex(
    (item: { _id: string }) => item._id === (solRes.data._id || id)
  );
  const prevCustomer = currentIndex > 0 ? {
    id: allItems[currentIndex - 1]._id,
    slug: allItems[currentIndex - 1].slug,
    title: allItems[currentIndex - 1].title,
    categorySlug: allItems[currentIndex - 1].categorySlug
  } : null;
  const nextCustomer = currentIndex >= 0 && currentIndex < allItems.length - 1 ? {
    id: allItems[currentIndex + 1]._id,
    slug: allItems[currentIndex + 1].slug,
    title: allItems[currentIndex + 1].title,
    categorySlug: allItems[currentIndex + 1].categorySlug
  } : null;

  return (
    <CustomerEditor
      categories={catRes.data || []}
      initialData={solRes.data}
      draftId={id}
      prevCustomer={prevCustomer}
      nextCustomer={nextCustomer}
    />
  );
}
