import 'server-only';

const GITHUB_REPO_API = 'https://api.github.com/repos/labring/FastGPT';
const DEFAULT_STARS = 25000;
const CACHE_FILE = '.cache/github-stars.json';

type GitHubStarsCache = {
  stars: number;
  updatedAt: number;
};

function isValidStars(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

async function readStarsCache(): Promise<GitHubStarsCache | null> {
  try {
    const [{ readFile }, path] = await Promise.all([import('fs/promises'), import('path')]);
    const cachePath = path.join(process.cwd(), CACHE_FILE);
    const cache = JSON.parse(await readFile(cachePath, 'utf8')) as GitHubStarsCache;

    if (!isValidStars(cache.stars) || !isValidStars(cache.updatedAt)) {
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
      Accept: 'application/vnd.github+json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const data = (await response.json()) as { stargazers_count?: unknown };
  if (!isValidStars(data.stargazers_count)) {
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
    return cache?.stars || DEFAULT_STARS;
  }
}
