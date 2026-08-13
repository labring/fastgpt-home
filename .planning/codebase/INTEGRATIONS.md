# External Integrations

**Analysis Date:** 2026-08-12

## APIs & External Services

**Repository metadata:**
- GitHub REST API - reads `stargazers_count` for `labring/FastGPT` on the home page.
  - SDK/Client: native `fetch` in server-only `src/lib/githubStars.ts` and browser `src/lib/githubStarsClient.ts`.
  - Auth: none; requests target `https://api.github.com/repos/labring/FastGPT` and send the standard GitHub JSON `Accept` header server-side.
  - Resilience: server cache `.cache/github-stars.json`, browser `localStorage` key `fastgpt:github-stars`, and a configured display fallback in `src/lib/githubStarsDisplay.ts`.

**CRM and lead attribution:**
- FastGPT CRM API - receives anonymous visitor and campaign attribution.
  - SDK/Client: native `fetch` in `src/lib/leadAttribution.ts`.
  - Auth: no application token is attached; base URL comes from `NEXT_PUBLIC_CRM_API_URL`.
  - Endpoint: `POST ${NEXT_PUBLIC_CRM_API_URL}/visitors/track` with `locale`, visitor ID, first/last touch, UTM, click ID, referrer, and landing URL fields.
  - Trigger: `src/app/LeadAttribution.tsx` dynamically loads the attribution module after browser idle and calls `reportAnonymousAttribution()`.
  - Delivery: request uses `Content-Type: application/json` and `keepalive: true`; a localStorage snapshot prevents duplicate submissions.

**Analytics and telemetry:**
- Google Analytics - optional browser page-view tracking through Google Tag Manager's `gtag.js` endpoint.
  - SDK/Client: `src/app/GoogleAnalytics.tsx` and `gtag.js`.
  - Auth/config: `NEXT_PUBLIC_GOOGLE_ID`; optional verification meta tag uses `NEXT_PUBLIC_GOOGLE_VERIFICATION_ID` in `src/app/layout.tsx`.
  - Loading: `next/script` with `lazyOnload`, loading `https://www.googletagmanager.com/gtag/js`.
- Baidu Tongji - optional China-site page analytics.
  - SDK/Client: `src/app/BaiDuAnalytics.tsx`.
  - Auth/config: `NEXT_PUBLIC_BAIDU_TONGJI`; site verification uses `NEXT_PUBLIC_BAIDU_KEY`.
  - Loading: `https://hm.baidu.com/hm.js?<key>` via `next/script` and `lazyOnload`.
- Microsoft Clarity - optional browser session/behavior analytics.
  - SDK/Client: `src/app/ClarityAnalytics.tsx`.
  - Auth/config: `NEXT_PUBLIC_CLARITY_TONGJI`.
  - Loading: `https://www.clarity.ms/tag/<key>` via `next/script` and `lazyOnload`.
- Rybbit - optional analytics script and declarative click-event attributes.
  - SDK/Client: `src/app/RybbitAnalytics.tsx` and `src/lib/rybbitEvents.ts`.
  - Auth/config: `NEXT_PUBLIC_RYBBIT_TONGJI` (script URL) and `NEXT_PUBLIC_RYBBIT_TONGJI_SITEID` (data-site-id).
  - Events: `rybbitClickAttrs()` emits `data-rybbit-event` and `data-rybbit-prop-*` attributes used by CTA, case-study, learning-center, and cloud-service links.

**Content, forms, and product links:**
- FastGPT documentation - external source/reading links for the technical center and footer; URLs are embedded in `src/components/tech-center/entries.json`, `src/content/tech-center/`, `src/config/site.ts`, and `src/components/home/NotFoundPage.tsx`.
- FastGPT Cloud - product entry links configured by `NEXT_PUBLIC_USER_URL` (default `https://cloud.fastgpt.io`) and generated with campaign/visitor query forwarding in `src/lib/cloudEntryUrl.ts`.
- Feishu/Lark forms - consultation, commercial-plan, and contact forms linked from `src/config/site.ts`, `src/components/header/CTAButton.tsx`, and `src/components/home/hooks/useStartUrl.ts`; the site opens external form URLs and does not call a Feishu API.
- Sealos - product/community links in `src/components/home/Footer.tsx` and `src/config/price.ts`; no Sealos SDK or API client is imported.
- `static.step1.dev` - remote visual assets selected by `src/components/home/assets.ts`; assets are referenced by URL and loaded by the browser.
- Google Fonts - `next/font/google` loads Inter and IBM Plex Sans in `src/app/layout.tsx` during the Next.js build/runtime pipeline.

## Data Storage

**Databases:**
- None detected. The site is a statically exported marketing/content frontend and contains no ORM, database driver, migration, or server API route for persistent application data.

**File Storage:**
- Local build/runtime cache only: `.cache/github-stars.json` is an optional server-side cache written by `src/lib/githubStars.ts`.
- Static assets and generated documents are committed under `public/`, `src/content/`, and `src/components/tech-center/`; production output is copied from `out/` into Nginx.

**Browser storage:**
- Attribution uses first-party cookies (`fastgpt_visitor_id`, `xs_attr`) by default, with bounded localStorage fallback/migration in `src/lib/attribution/`.
- Legacy and deduplication keys include `fastgpt_visitor_id`, `xs_attr`, `fastgpt_reported_attribution`, `preferredLang`, `NEXT_LOCALE`, and `fastgpt:github-stars` across `src/lib/visitorId.ts`, `src/lib/leadAttribution.ts`, `src/lib/clientNavigation.ts`, and `src/lib/githubStarsClient.ts`.

**Caching:**
- Nginx and Cloudflare cache static assets and HTML using `nginx.conf` and `public/_headers`.
- Next.js server-side GitHub fetch explicitly uses `cache: 'no-store'`, then persists a best-effort file fallback in `.cache/github-stars.json`.

## Authentication & Identity

**Auth Provider:**
- None in this repository. The homepage does not implement login, sessions, OAuth, token issuance, or an identity provider.
- Anonymous identity is generated with `crypto.randomUUID()` (or a random fallback) in `src/lib/visitorId.ts`, validated, and propagated to cloud links as `visitor_id` by `src/lib/cloudEntryUrl.ts`.
- Locale preference uses a first-party `NEXT_LOCALE` cookie and `preferredLang` localStorage entry in `src/lib/clientNavigation.ts`.
- Account authentication is delegated to the linked FastGPT Cloud destinations (`NEXT_PUBLIC_USER_URL`); this site only navigates to them.

## Monitoring & Observability

**Error Tracking:**
- No Sentry, OpenTelemetry, or server error-tracking SDK detected.
- Analytics providers listed in `src/app/layout.tsx` are the available user-behavior telemetry surfaces; each is optional and gated by public environment variables.

**Logs:**
- Runtime integration failures are swallowed in the GitHub cache, attribution, and browser-storage helpers so page rendering continues (`src/lib/githubStars.ts`, `src/lib/leadAttribution.ts`, `src/lib/attribution/storage/`).
- Build/verification scripts report status through Node stdout/stderr, for example `scripts/verify-p0.js` through `scripts/verify-i18n-seo.js`.

## CI/CD & Deployment

**Hosting:**
- Production: Docker multi-stage build (`node:22-alpine` builder plus `fholzer/nginx-brotli:latest` server) in `Dockerfile`; Nginx serves `/usr/share/nginx/html` and applies canonical redirects, cache rules, CSP, and security headers from `nginx.conf` and `nginx-security-headers.conf`.
- Preview: Cloudflare Pages deployment through `cloudflare/wrangler-action@v3` in `.github/workflows/preview-deploy.yml`, using the generated `out/` artifact and PR branch name.

**CI Pipeline:**
- `.github/workflows/preview.yml` checks out pull-request code, installs Node 24 and pnpm 9, builds with IO-site public settings, and uploads a one-day `preview-build` artifact.
- `.github/workflows/preview-deploy.yml` downloads that artifact, deploys it to the `fastgpt-home` Cloudflare Pages project, and comments the deployment URL on the pull request through `actions/github-script@v7`.
- `.github/workflows/fastgpt-home-image.yml` builds multi-architecture Docker images with Buildx/QEMU, publishes timestamped and latest tags to GitHub Container Registry (`ghcr.io/${{ github.repository }}`), then updates Kubernetes deployment `fastgpt-home` with `actions-hub/kubectl@master`.
- CI secrets provide analytics, CRM, URL, filing, and Kubernetes configuration; values are passed as build arguments or action environment variables and are not stored in source.

## Environment Configuration

**Required env vars:**
- Site routing/build: `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_SITE_VARIANT`, `NEXT_PUBLIC_CN_HOME_URL`, `NEXT_PUBLIC_IO_HOME_URL`, `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_USER_URL`.
- Product/commercial links: `NEXT_PUBLIC_CUSTOM_PLAN_URL`, `NEXT_PUBLIC_FILING_ADDRESS`, `NEXT_PUBLIC_POLICE_FILING`.
- Analytics: `NEXT_PUBLIC_BAIDU_TONGJI`, `NEXT_PUBLIC_BAIDU_KEY`, `NEXT_PUBLIC_CLARITY_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI_SITEID`, `NEXT_PUBLIC_GOOGLE_ID`, `NEXT_PUBLIC_GOOGLE_VERIFICATION_ID`.
- Attribution: `NEXT_PUBLIC_CRM_API_URL`, `NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN`, `NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE`.

**Secrets location:**
- Local environment template exists at `.env.template`; actual environment files are excluded from this audit.
- CI values are stored in GitHub Actions secrets/variables referenced by `.github/workflows/fastgpt-home-image.yml` and `.github/workflows/preview.yml`.

## Webhooks & Callbacks

**Incoming:**
- None detected. No Next.js `route.ts` API handlers, webhook receivers, or callback endpoints exist in `src/app/`.

**Outgoing:**
- CRM visitor tracking is an outgoing JSON POST to `/visitors/track` from `src/lib/leadAttribution.ts`.
- GitHub metadata is an outgoing GET to the repository REST endpoint from `src/lib/githubStars.ts` and `src/lib/githubStarsClient.ts`.
- Analytics scripts are outgoing browser loads from `src/app/GoogleAnalytics.tsx`, `src/app/BaiDuAnalytics.tsx`, `src/app/ClarityAnalytics.tsx`, and `src/app/RybbitAnalytics.tsx`.

---

*Integration audit: 2026-08-12*
