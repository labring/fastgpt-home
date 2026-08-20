export function getCustomerPublicHref(customer: {
  id: string | number;
  categorySlug?: string;
  slug?: string;
}) {
  if (customer.categorySlug && customer.slug) {
    return `/${customer.categorySlug}/${customer.slug}`;
  }

  return customer.categorySlug
    ? `/${customer.categorySlug}/${customer.id}`
    : `/customer/${customer.id}`;
}
