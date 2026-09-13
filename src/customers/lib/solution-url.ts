export function getSolutionPublicHref(solution: { categorySlug: string; slug: string }) {
  return `/${solution.categorySlug}/${solution.slug}`;
}
