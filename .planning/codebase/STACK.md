# Technology Stack

**Analysis Date:** 2026-08-10

## Languages

**Primary:**
- TypeScript 5.9 - application code under `src/`, route handlers, shared libs, and components

**Secondary:**
- JavaScript - build scripts in `scripts/`, root config files like `next.config.js` and `gtag.js`
- Markdown - content library under `src/content/tech-center/**/*.md` and repository docs
- JSON - locale dictionaries, content indexes, and configuration data

## Runtime

**Environment:**
- Node.js 18+ - declared in `package.json` engines
- Browser runtime - client components, analytics scripts, and interactive sections

**Package Manager:**
- npm - used by repo scripts
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.6 - App Router site, metadata generation, and static export
- React 19.2.6 - UI runtime for server and client components

**Testing:**
- Node verification scripts in `scripts/verify-*.js`
- Build artifact checks against generated `out/`

**Build/Dev:**
- TypeScript 5.9.3 - type checking and component authoring
- Tailwind CSS 3.4.19 - utility styling
- HeroUI 2.8.x - component primitives and theme helpers
- Framer Motion 12.x - page transitions and hero motion
- Cobe 2.x - globe canvas in the CTA section
- next-themes 0.4.x - theme switching

## Key Dependencies

**Critical:**
- `next` - routing, static export, metadata, and route params
- `react` / `react-dom` - component rendering
- `framer-motion` - motion layers, scroll-linked hero effects, and reveal animations
- `@heroui/react` / `@heroui/theme` - design-system utilities
- `tailwindcss` / `tailwindcss-animate` - layout and animation tokens
- `cobe` - WebGL globe used in `src/components/home/CTA.tsx`
- `lucide-react` / `react-icons` - icons across navigation and content pages
- `sharp` - image verification in `scripts/verify-p0.js` and `scripts/verify-p1.js`

**Infrastructure:**
- `server-only` - server-side helper boundary in `src/lib/githubStars.ts` and `src/lib/tech-center-content.ts`
- `class-variance-authority` and `@radix-ui/react-slot` - button primitive composition

## Configuration

**Environment:**
- `NEXT_PUBLIC_HOME_URL`, `NEXT_PUBLIC_SITE_VARIANT`, `NEXT_PUBLIC_DEFAULT_LOCALE`
- `NEXT_PUBLIC_CN_HOME_URL`, `NEXT_PUBLIC_IO_HOME_URL`, `NEXT_PUBLIC_USER_URL`, `NEXT_PUBLIC_CUSTOM_PLAN_URL`
- `NEXT_PUBLIC_BAIDU_KEY`, `NEXT_PUBLIC_GOOGLE_VERIFICATION_ID`
- `NEXT_PUBLIC_BAIDU_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI`, `NEXT_PUBLIC_RYBBIT_TONGJI_SITEID`, `NEXT_PUBLIC_CLARITY_TONGJI`
- `NEXT_PUBLIC_CRM_API_URL`

**Build:**
- `next.config.js` - static export, image handling, headers, and transpilation
- `tsconfig.json` - TypeScript compiler settings and path alias `@/*`
- `tailwind.config.ts` - design tokens and animation keys
- `postcss.config.js` - Tailwind/PostCSS pipeline
- `.prettierrc.js` - formatting rules
- `components.json` - UI component configuration

## Platform Requirements

**Development:**
- Node.js 18+ and npm
- Browser for UI work, analytics checks, and client component flows

**Production:**
- Static export in `out/`
- Hosted through Cloudflare Pages, Nginx, or `serve@latest` from `package.json`

---

*Stack analysis: 2026-08-10*
*Update after major dependency changes*
