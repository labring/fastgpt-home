import 'server-only';

import { GITHUB_STARS_FALLBACK, getGitHubStarsFallback, isValidGitHubStars } from '@/lib/githubStarsDisplay';

const GITHUB_REPO_API = 'https://api.github.com/repos/labring/FastGPT';
const CACHE_FILE = '.cache/github-stars.json';
// Next 16 stores default prerender fetches in .next/cache/fetch-cache (revalidate ≈ 1 year), and
// prepare-build keeps that cache across builds. A per-process value in the request headers makes
// the fetch-cache key differ per build, so each build fetches fresh while staying static-export safe.
const BUILD_FETCH_NONCE = String(Date.now());

type GitHubStarsCache = {
  stars: number;
  updatedAt: number;
};

async function readStarsCache(): Promise<GitHubStarsCache | null> {
  try {
    const [{ readFile }, path] = await Promise.all([import('fs/promises'), import('path')]);
    const cachePath = path.join(process.cwd(), CACHE_FILE);
    const cache = JSON.parse(await readFile(cachePath, 'utf8')) as GitHubStarsCache;

    if (!isValidGitHubStars(cache.stars) || !isValidGitHubStars(cache.updatedAt)) {
      return null;
    }

    return cache;
  } catch {
    return null;
  }
}

async function writeStarsCache(stars: number) {
  try {
    const [{ mkdir, writeFile }, path] = await Promise.all([import('fs/promises'), import('path')]);
    const cachePath = path.join(process.cwd(), CACHE_FILE);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(cachePath, JSON.stringify({ stars, updatedAt: Date.now() }, null, 2));
  } catch {
    // Cache writes are best-effort; the page should still render.
  }
}

async function fetchGitHubStars(): Promise<number> {
  const response = await fetch(GITHUB_REPO_API, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-Build-Fetch-Nonce': BUILD_FETCH_NONCE,
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    },
    // No `no-store` (static export would skip it and use the fallback) and no `force-cache`.
    // Short timeout so an unreachable GitHub only falls back instead of stalling the build.
    signal: AbortSignal.timeout(5000)
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const data = (await response.json()) as { stargazers_count?: unknown };
  if (!isValidGitHubStars(data.stargazers_count)) {
    throw new Error('GitHub API response did not include stargazers_count');
  }

  return data.stargazers_count;
}

export async function getGitHubStars(): Promise<number> {
  const cache = await readStarsCache();

  try {
    const stars = await fetchGitHubStars();
    await writeStarsCache(stars);
    return stars;
  } catch {
    return getGitHubStarsFallback(cache?.stars || GITHUB_STARS_FALLBACK);
  }
}
