import type { SolutionCardData } from '@customers/types/solution';

export interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

/**
 * 关键词匹配：命中标题 / 描述 / 分类名 / 分类 slug 任一即视为匹配。
 * 大小写不敏感；空查询恒为匹配。
 */
export function matchesSolutionSearch(
  title: string,
  description: string,
  rawQuery: string,
  categoryName = '',
  categorySlug = ''
) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const haystack = `${title} ${description} ${categoryName} ${categorySlug}`.toLowerCase();
  return query.split(/\s+/).every((token) => haystack.includes(token));
}

export function filterPublicSolutions(
  solutions: SolutionCardData[],
  currentCategory: string,
  searchQuery = ''
) {
  const filtered = solutions.filter((solution) => {
    const matchesCategory =
      currentCategory === 'all' ||
      solution.categorySlug === currentCategory ||
      solution.categoryName === currentCategory;

    const matchesSearch = matchesSolutionSearch(
      solution.title,
      solution.description,
      searchQuery,
      solution.categoryName,
      solution.categorySlug
    );

    return matchesCategory && matchesSearch;
  });

  return interleaveByCategory(filtered);
}

// 按分类交错排序：组内按 createdAt 倒序（保持每类内部最新在前），
// 组间按「组内最新案例」排序后 round-robin 轮转，避免同分类案例连续堆叠（尤其首页「全部」视图）。
function interleaveByCategory(solutions: SolutionCardData[]): SolutionCardData[] {
  const groups = new Map<string, SolutionCardData[]>();
  for (const solution of solutions) {
    const key = solution.categorySlug;
    const group = groups.get(key);
    if (group) group.push(solution);
    else groups.set(key, [solution]);
  }

  for (const group of groups.values()) {
    group.sort(
      (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
  }

  const orderedGroups = Array.from(groups.values()).sort(
    (left, right) =>
      new Date(right[0].createdAt).getTime() - new Date(left[0].createdAt).getTime()
  );

  const result: SolutionCardData[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const group of orderedGroups) {
      if (group.length > 0) {
        result.push(group.shift()!);
        added = true;
      }
    }
  }
  return result;
}
