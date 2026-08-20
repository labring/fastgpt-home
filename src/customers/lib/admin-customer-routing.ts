export function buildAdminCustomerEditHref(customer: {
  id?: string | number;
  _id?: string | number;
  slug?: string | null;
  categorySlug?: string | null;
}) {
  const id = customer.slug ?? customer.id ?? customer._id;
  const categorySlug = customer.categorySlug?.trim();

  return categorySlug
    ? `/customers/admin/${categorySlug}/${id}/edit`
    : `/customers/admin/${id}/edit`;
}
