const GITHUB_REPO_API = 'https://api.github.com/repos/labring/FastGPT';
const CACHE_KEY = 'fastgpt:github-stars';

type GitHubStarsCache = {
  stars: number;
  updatedAt: number;
};

function isValidStars(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function readStarsCache(): GitHubStarsCache | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cache = JSON.parse(raw) as GitHubStarsCache;
    if (!isValidStars(cache.stars) || !isValidStars(cache.updatedAt)) {
      return null;
    }

    return cache;
  } catch {
    return null;
  }
}

function writeStarsCache(stars: number) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ stars, updatedAt: Date.now() }));
  } catch {
    // Cache writes are best-effort; the UI can keep the server-rendered value.
  }
}

export async function getCachedGitHubStars(fallback: number): Promise<number> {
  const cache = readStarsCache();

  try {
    const response = await fetch(GITHUB_REPO_API);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = (await response.json()) as { stargazers_count?: unknown };
    if (!isValidStars(data.stargazers_count)) {
      throw new Error('GitHub API response did not include stargazers_count');
    }

    writeStarsCache(data.stargazers_count);
    return data.stargazers_count;
  } catch {
    return cache?.stars || fallback;
  }
}
