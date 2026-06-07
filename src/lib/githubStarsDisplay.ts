export const GITHUB_STARS_FALLBACK = 28000;

export function isValidGitHubStars(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function getGitHubStarsFallback(stars?: number) {
  return isValidGitHubStars(stars) ? Math.max(stars, GITHUB_STARS_FALLBACK) : GITHUB_STARS_FALLBACK;
}

export function formatGitHubStars(stars?: number) {
  const displayStars = isValidGitHubStars(stars) ? stars : GITHUB_STARS_FALLBACK;
  return `${displayStars.toLocaleString()}+`;
}

export function formatGitHubStarsInThousands(stars?: number) {
  const displayStars = isValidGitHubStars(stars) ? stars : GITHUB_STARS_FALLBACK;
  return parseFloat((displayStars / 1000).toFixed(2));
}
