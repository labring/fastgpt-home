const FASTGPT_REPO_API_URL = 'https://api.github.com/repos/labring/FastGPT';
const FASTGPT_REPO_URL = 'https://github.com/labring/FastGPT';
const GITHUB_STARS_FALLBACK = 29000;
const GITHUB_STARS_REVALIDATE_SECONDS = 60 * 60 * 6;
const GITHUB_STARS_TIMEOUT_MS = 4000;
const GITHUB_STARS_CACHE_TTL_MS = GITHUB_STARS_REVALIDATE_SECONDS * 1000;

type GitHubStarsResult = {
  value: string;
  rawValue: number;
  link: string;
};

type CachedGitHubStars = GitHubStarsResult & {
  fetchedAt: number;
};

let memoryCache: CachedGitHubStars | null = null;

function formatGitHubStars(count: number) {
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}K+`;
  }

  return `${count}+`;
}

function toPublicResult(result: CachedGitHubStars): GitHubStarsResult {
  return {
    value: result.value,
    rawValue: result.rawValue,
    link: result.link
  };
}

function fallbackResult(): CachedGitHubStars {
  return {
    value: formatGitHubStars(GITHUB_STARS_FALLBACK),
    rawValue: GITHUB_STARS_FALLBACK,
    link: FASTGPT_REPO_URL,
    fetchedAt: 0
  };
}

export function readCachedGitHubStars(): GitHubStarsResult {
  return toPublicResult(memoryCache ?? fallbackResult());
}

async function fetchStarsOnce(signal: AbortSignal): Promise<number> {
  const response = await fetch(FASTGPT_REPO_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    signal,
    next: { revalidate: GITHUB_STARS_REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`GitHub repo API responded with ${response.status}`);
  }

  const data = (await response.json()) as { stargazers_count?: unknown };
  const stars = Number(data.stargazers_count);

  if (!Number.isFinite(stars) || stars < 0) {
    throw new Error('GitHub repo API returned an invalid stargazers_count');
  }

  return stars;
}

export async function getFastGptGitHubStars(): Promise<GitHubStarsResult> {
  // 1. 内存缓存未过期，直接返回，避免重复请求第三方 API。
  if (memoryCache && Date.now() - memoryCache.fetchedAt < GITHUB_STARS_CACHE_TTL_MS) {
    return toPublicResult(memoryCache);
  }

  // 2. 短超时 + 最多一次重试，避免拖慢调用方。
  let stars: number | null = null;

  for (let attempt = 0; attempt < 2 && stars === null; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GITHUB_STARS_TIMEOUT_MS);

    try {
      stars = await fetchStarsOnce(controller.signal);
    } catch (error) {
      if (attempt === 1) {
        console.error('Failed to fetch FastGPT GitHub stars:', error);
      }
    } finally {
      clearTimeout(timer);
    }
  }

  if (stars === null) {
    // 3. 失败时优先返回最近一次成功值（stale-while-error），再退回写死兜底。
    return toPublicResult(memoryCache ?? fallbackResult());
  }

  memoryCache = {
    value: formatGitHubStars(stars),
    rawValue: stars,
    link: FASTGPT_REPO_URL,
    fetchedAt: Date.now()
  };

  return toPublicResult(memoryCache);
}
