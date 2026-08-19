export function buildAdminSolutionEditHref(solution: {
  id?: string | number;
  _id?: string | number;
  slug?: string | null;
  categorySlug?: string | null;
}) {
  const id = solution.slug ?? solution.id ?? solution._id;
  const categorySlug = solution.categorySlug?.trim();

  return categorySlug
    ? `/customers/admin/customers/${categorySlug}/${id}/edit`
    : `/customers/admin/customers/${id}/edit`;
}
