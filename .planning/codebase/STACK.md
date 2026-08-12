# Technology Stack

**Analysis Date:** 2026-08-12

## Languages

**Primary:**
- TypeScript 5.9.3 - React components, Next.js App Router pages, route metadata, localization, SEO, attribution, and browser utilities in `src/`.
- JavaScript (Node.js) - build hooks, static-content generation, verification scripts, and Next.js configuration in `scripts/`, `next.config.js`, and `gtag.js`.

**Secondary:**
- CSS/SCSS - global styling and component styles in `src/styles/globals.css` and `src/components/tech-center/*.module.css`.
- Markdown and JSON - technical-center source content and locale/content data in `src/content/`, `src/components/tech-center/entries.json`, `src/locales/`, and `src/faq/`.
- Nginx configuration - static hosting, redirects, caching, and security headers in `nginx.conf` and `nginx-security-headers.conf`.

## Runtime

**Environment:**
- Node.js >=18.0.0 is the declared application/build minimum in `package.json`.
- Node.js 22 Alpine is the production image build runtime in `Dockerfile`; the preview workflow uses Node.js 24 in `.github/workflows/preview.yml`.
- Browser runtime for client analytics, navigation, visitor attribution, cookies, and localStorage in `src/app/*Analytics.tsx`, `src/app/LeadAttribution.tsx`, and `src/lib/attribution/`.

**Package Manager:**
- npm is represented by `package-lock.json` (lockfile version 3) and used by the production `Dockerfile` (`npm install`, `npm run build`).
- pnpm 9 is installed and used by the preview build workflow in `.github/workflows/preview.yml`; no `pnpm-lock.yaml` is tracked.
- Lockfile: `package-lock.json` present; `pnpm-lock.yaml` not detected.

## Frameworks

**Core:**
- Next.js 16.2.6 - App Router, static export, route metadata, `next/script`, `next/font/google`, and localized pages under `src/app/`.
- React 19.2.6 and React DOM 19.2.6 - UI and client components.
- TypeScript 5.9.3 - strict, no-emit type checking with the `@/*` alias configured in `tsconfig.json`.

**UI and Animation:**
- HeroUI React 2.8.9 and HeroUI theme 2.4.26 - component/theme primitives; both are transpiled by `next.config.js`.
- Tailwind CSS 3.4.19, `tailwindcss-animate` 1.0.7, `tailwind-merge` 3.5.0, `class-variance-authority` 0.7.0, and `clsx` 2.1.0 - utility styling and class composition in `tailwind.config.ts` and `src/`.
- Framer Motion 12.34.3 - motion wrappers and transitions in `src/components/home/motion/`.
- Cobe 2.0.1 - globe canvas visualization in `src/components/home/GlobeCanvas.tsx`.
- Lucide React 0.575.0 and React Icons 5.0.1 - iconography across components.
- `next-themes` 0.4.6 - theme provider in `src/components/ThemeProvider.tsx`.
- Radix UI React Slot 1.0.2 - reusable button composition in `src/components/ui/button.tsx`.

**Testing:**
- Dedicated unit-test runner not detected in `package.json` or the repository file inventory.
- Repository verification is implemented as Node scripts: `scripts/verify-p0.js`, `scripts/verify-p1.js`, `scripts/verify-p2.js`, and `scripts/verify-i18n-seo.js`.

**Build/Dev:**
- Next.js Turbopack dev server via `npm run dev` (`next dev --turbopack`).
- Production build runs static generation plus post-build cleanup in `package.json`: `next build`, `scripts/clean-faq-rsc.js`, and `scripts/fix-html-lang.js`.
- `next.config.js` sets `output: 'export'` when `NODE_ENV=production`, disables optimized image serving (`images.unoptimized: true`), enables compression, and removes the X-Powered-By header.
- PostCSS 8.5.6 with Tailwind and Autoprefixer 10.4.24 is configured in `postcss.config.js`.
- ESLint 9.39.4 with `eslint-config-next` 16.2.6 is configured in `eslint.config.mjs`; Prettier 2.8.8 is configured in `.prettierrc.js`.
- Husky 9.1.7 runs the package `prepare` hook.
- Sharp 0.33.5 supports image verification/conversion scripts such as `scripts/verify-p1.js` and `scripts/convert-images.js`.

## Key Dependencies

**Critical:**
- `next` 16.2.6 - application framework and static exporter.
- `react` / `react-dom` 19.2.6 - rendering runtime.
- `typescript` 5.9.3 - compile-time safety under strict mode.
- `@heroui/react` 2.8.9 and `@heroui/theme` 2.4.26 - shared UI system.

**Infrastructure:**
- `server-only` 0.0.1 marks server-only GitHub Stars code in `src/lib/githubStars.ts`.
- Node built-ins (`fs/promises`, `path`) provide the optional server-side GitHub Stars cache at `.cache/github-stars.json`.
- `sharp` 0.33.5 is used for image dimensions/size checks during verification.
- Nginx Brotli image `fholzer/nginx-brotli:latest` serves exported assets in the second stage of `Dockerfile`.

## Configuration

**Environment:**
- Public build-time configuration is supplied through `NEXT_PUBLIC_*` variables. Names consumed by source include `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_SITE_VARIANT`, `NEXT_PUBLIC_CN_HOME_URL`, `NEXT_PUBLIC_IO_HOME_URL`, `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_USER_URL`, `NEXT_PUBLIC_CUSTOM_PLAN_URL`, `NEXT_PUBLIC_FILING_ADDRESS`, `NEXT_PUBLIC_POLICE_FILING`, `NEXT_PUBLIC_CRM_API_URL`, `NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN`, `NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE`, `NEXT_PUBLIC_BAIDU_TONGJI`, `NEXT_PUBLIC_BAIDU_KEY`, `NEXT_PUBLIC_CLARITY_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI_SITEID`, `NEXT_PUBLIC_GOOGLE_ID`, and `NEXT_PUBLIC_GOOGLE_VERIFICATION_ID`.
- `.env.template` exists as an environment configuration template; secret values are intentionally excluded from this map.
- `src/lib/siteRouting.ts` defaults to `https://fastgpt.io` for the international variant and `https://fastgpt.cn` for the China variant.

**Build:**
- `next.config.js` controls static-export mode, allowed development origins, package transpilation, compression, and cache headers.
- `tsconfig.json` enables strict TypeScript, bundler module resolution, JSON imports, JSX transform, incremental checking, and `@/*` mapped to `src/*`.
- `tailwind.config.ts` loads `src/**/*.{ts,tsx}` and HeroUI theme files and defines CSS-variable-backed home theme tokens.
- `postcss.config.js` loads Tailwind CSS and Autoprefixer.
- `Dockerfile` passes public configuration as build arguments, runs `npm install` and `npm run build`, then copies `out/` into Nginx.
- `public/_headers`, `public/_redirects`, `nginx.conf`, and `nginx-security-headers.conf` provide deployment-specific headers, redirects, cache policy, and CSP.

## Platform Requirements

**Development:**
- Node.js 18 or newer and npm are sufficient for local scripts; `npm run dev` starts the Turbopack development server.
- A browser is required for client-side analytics, attribution, and localStorage/cookie behavior.

**Production:**
- A static hosting target capable of serving the Next.js `out/` export is required.
- The primary container target is Nginx Brotli on Kubernetes, built from `Dockerfile` and updated by `.github/workflows/fastgpt-home-image.yml`.
- Cloudflare Pages serves preview exports through `.github/workflows/preview-deploy.yml`; production static headers/redirects are also compatible with Cloudflare Pages files under `public/`.

---

*Stack analysis: 2026-08-12*
