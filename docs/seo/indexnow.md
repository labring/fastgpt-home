# IndexNow Operations

FastGPT publishes isolated IndexNow verification files for both production sites (`fastgpt.cn` and `fastgpt.io`) and submits changed sitemap URLs after each production rollout.

## Key Hosting

- `src/config/indexnow.json` maps `cn` (`fastgpt.cn`) and `io` (`fastgpt.io`) to distinct 32-character lowercase hexadecimal keys.
- `scripts/clean-locale-output.js` writes `<key>.txt` directly into `out/` for the active production variant only (`preview` emits no key file).
- `scripts/verify-i18n-seo.js` and `scripts/verify-worker-release.js` verify key isolation before publication.
- To rotate a key, update `src/config/indexnow.json` and deploy `main`.

## Automatic CI Submission

Both `.github/workflows/fastgpt-home-image.yml` (`cn`) and `.github/workflows/international-worker-release.yml` (`io`) run two non-blocking (`--soft-fail`) steps around rollout:

1. `--snapshot`: Fetches the live `sitemap.xml` and all shards (with cache-busting `?v=<timestamp>`) before deployment.
2. `--diff`: Compares the newly built `out/sitemap.xml` against the pre-deploy snapshot (`added`, `lastmod` modified, `removed`), prioritizes non-`industry` content URLs first, caps automatic submission at `10,000` URLs, and POSTs to `https://api.indexnow.org/indexnow`.

## Manual Submission

```bash
# Preview URLs updated on or after a YYYY-MM-DD date from the live sitemap
npm run indexnow:submit -- --submit --variant cn --since 2026-11-01 --dry-run

# Submit explicit URLs to IndexNow
npm run indexnow:submit -- --submit --variant cn --urls "https://fastgpt.cn/price,https://fastgpt.cn/faq"
```
