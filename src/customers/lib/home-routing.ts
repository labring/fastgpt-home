import { DEFAULT_PUBLIC_SOLUTION_SORT_KEY } from "@/customers/lib/solution-pagination";
import { withBasePath } from "@/customers/lib/base-path";

export interface BuildHomeHrefOptions {
  categorySlug?: string | null;
  search?: string | null;
  sortBy?: string | null;
  section?: "customers" | null;
}

export function buildHomeHref({
  categorySlug,
  search,
  sortBy,
  section = null,
}: BuildHomeHrefOptions = {}) {
  const params = new URLSearchParams();
  const normalizedCategorySlug = categorySlug?.trim();
  const normalizedSearch = search?.trim();
  const normalizedSortBy = sortBy?.trim();

  if (normalizedCategorySlug && normalizedCategorySlug !== "all") {
    params.set("category", normalizedCategorySlug);
  }

  if (normalizedSearch) {
    params.set("search", normalizedSearch);
  }

  if (normalizedSortBy && normalizedSortBy !== DEFAULT_PUBLIC_SOLUTION_SORT_KEY) {
    params.set("sortBy", normalizedSortBy);
  }

  const query = params.toString();
  const hash = section === "customers" ? "#customers" : "";

  if (!query && !hash) {
    return withBasePath("/");
  }

  return withBasePath(`/${query ? `?${query}` : ""}${hash}`);
}
