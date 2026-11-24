# IndexNow Integration & Operations Runbook

FastGPT integrates [IndexNow](https://www.indexnow.org/) across both production sites (`fastgpt.cn` and `fastgpt.io`) to eliminate search-discovery lag for Bing, Microsoft Copilot, and IndexNow-participating AI search engines (SEO + GEO).

## Architecture

- **Configuration**: `src/config/indexnow.json` stores distinct 32-character lowercase hexadecimal public keys for `cn` (`fastgpt.cn`) and `io` (`fastgpt.io`) and pins the submission endpoint to `https://api.indexnow.org/indexnow`.
- **Key Hosting & Variant Isolation**:
  - `scripts/clean-locale-output.js` writes `<key>.txt` directly into `out/` at build time for the active production variant only.
  - `cn` (`fastgpt.cn`, K8s + Nginx) serves only the CN key file; `io` (`fastgpt.io`, Cloudflare Worker) serves only the IO key file; `preview` emits **no** key file.
  - Key files are never committed into `public/` and never set as `NEXT_PUBLIC_*` environment variables, keeping static build cache keys deterministic.
  - **Cloudflare Crawler Hints Coexistence**: Cloudflare Crawler Hints (which previously submitted `/` once on `2026-04-17`) uses a separate Cloudflare-managed verification token and does not conflict with `fastgpt.io`'s own `<key>.txt` or CI-driven IndexNow submissions.

## Automatic Post-Deploy Incremental Submission

Both production release workflows ([fastgpt-home-image.yml](../../.github/workflows/fastgpt-home-image.yml) and [international-worker-release.yml](../../.github/workflows/international-worker-release.yml)) follow this sequence on `main`:

1. **Pre-deploy baseline**: Snapshot the live production `sitemap.xml` and all active shards via `--snapshot-live`.
2. **Deploy & rollout**: Complete the Kubernetes rollout (`fastgpt.cn`) or Cloudflare Worker deployment (`fastgpt.io`).
3. **Key verification & incremental push**:
   - Poll `https://<host>/<key>.txt` until HTTP `200` (`text/plain`) with exact key body is confirmed.
   - Compute changed URLs = `(new sitemap - pre-deploy live sitemap)` (`added`, `lastmod` modified, `removed`) + `git diff`-matched core no-`lastmod` static routes (`/`, `/price`, `/contact`, `/faq`, `/videos`, `/wiki`).
   - Filter out `/ads/*`, `/_next/*`, non-HTML assets (`.md`, `.txt`, `.xml`, `.json`), query/hash URLs, and foreign origins.
   - Prioritize `content` bucket before newest `industry` URLs, capped at `10,000` URLs per push (`chunk-size=2000`).
   - Run with `--soft-fail` so transient third-party network/API errors emit GitHub Actions warnings and upload receipt artifacts (`indexnow-receipt-*.json`) without blocking or rolling back production releases.

## First-Time Post-Merge Backfill (Rule 105 Recovery)

When this integration is first merged, the pre-deploy and post-deploy sitemaps may have zero diff, so existing lagged pages such as `https://fastgpt.cn/industry/mfg-d002-c012-f002` (`lastmod: 2026-10-14`) require one manual backfill via GitHub Actions:

1. Open **Actions -> Manual IndexNow Backfill** (`.github/workflows/indexnow-backfill.yml`).
2. First validate with a dry run:
   - `variant`: `cn` (or `both`)
   - `mode`: `recent`
   - `since_days`: `45` (or `since_date`: `2026-10-14` to cover `mfg-d002-c012-f002` and recent W15–W18 pages)
   - `max_urls`: `10000`
   - `dry_run`: `true`
3. Inspect the workflow step summary and receipt artifact, then re-run with `dry_run: false`.

### Local CLI Usage (Dry Run / Manual Backfill)

```bash
# Dry-run recent CN pages since 2026-10-14 from live sitemap
node scripts/submit-indexnow.js --mode recent --variant cn --from-live --since-date 2026-10-14 --dry-run

# Dry-run high-value non-industry IO pages
node scripts/submit-indexnow.js --mode content --variant io --from-live --dry-run

# Submit explicit URLs (only after key file is deployed live)
node scripts/submit-indexnow.js --mode urls --variant cn --urls "https://fastgpt.cn/industry/mfg-d002-c012-f002"
```

## Key Rotation

- **Emergency override (no code change)**: Set `CN_INDEXNOW_KEY` or `IO_INDEXNOW_KEY` (non-`NEXT_PUBLIC_`) in the CI environment for build & submit jobs, ensuring the replacement is an 8–128 character `[a-zA-Z0-9-]` value.
- **Permanent rotation**: Update `variants.cn.key` or `variants.io.key` in `src/config/indexnow.json`, run `npm run verify:indexnow`, and merge to `main`.

---

## Handoff Checklist for `doc.fastgpt.cn` / `doc.fastgpt.io` (Separate Docs Repository)

Bing Webmaster Tools rule `105` on `fastgpt.cn` also flagged two `doc.fastgpt.cn` URLs because Bing discovered them via links or redirects without IndexNow notification:

- `https://doc.fastgpt.cn/zh-CN/guide/getting-started/cli` (currently HTTP `301` -> `https://doc.fastgpt.cn/guide/getting-started/cli`)
- `https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/content_extract.md` (currently HTTP `301` -> `https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract.md`, which already returns `x-robots-tag: noindex` and `link: <https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract>; rel="canonical"`)

Implement the following in the docs repository:

1. **Host independent key files**: Place a dedicated 32-char hex `<docKey>.txt` at `https://doc.fastgpt.cn/<docKey>.txt` (and a separate key for `https://doc.fastgpt.io/<docIoKey>.txt`). Ensure it returns `200 text/plain` with exact key content and no auth/redirect.
2. **Submit canonical HTML URLs only**:
   - Read URLs from the docs production sitemap or diff changed MDX/doc routes against canonical unprefixed paths (e.g., `https://doc.fastgpt.cn/guide/getting-started/cli`).
   - **Never** submit `/zh-CN/*` or `/en/*` legacy redirect aliases (`301`).
   - **Never** submit `.md` raw-markdown endpoints (`x-robots-tag: noindex`).
3. **Push after docs rollout**: Wait until the docs deploy is live and `GET https://doc.fastgpt.cn/<docKey>.txt` returns `200`, then `POST https://api.indexnow.org/indexnow` with `{ host, key, keyLocation, urlList }`.
4. **Initial docs backfill**: After deploying the docs key file, push `https://doc.fastgpt.cn/guide/getting-started/cli` and `https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract` (plus recently added/updated canonical guide pages) once via IndexNow.
