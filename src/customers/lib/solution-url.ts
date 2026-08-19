export function getSolutionPublicHref(solution: {
  id: string | number;
  categorySlug?: string;
  slug?: string;
}) {
  if (solution.categorySlug && solution.slug) {
    return `/${solution.categorySlug}/${solution.slug}`;
  }

  return solution.categorySlug
    ? `/${solution.categorySlug}/${solution.id}`
    : `/solution/${solution.id}`;
}
