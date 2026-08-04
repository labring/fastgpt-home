---
phase: 02-new-faq-bilingual-seo
status: ready-for-planning
gathered: 2026-08-04
---

# Phase 2: 新增 FAQ 发布与双域 SEO - Context

## Phase Boundary

将 Phase 1 已验证的 60 条中文独有 FAQ 接入运行时数据、中文列表/详情页、静态参数和 sitemap，并让每条详情页使用独立的 Title、Description、Keywords、FAQPage 与 BreadcrumbList。现有英文 FAQ 数据、英文路由和 locale fallback 保持稳定。双域规则固定为 `fastgpt.io` 英文 canonical 与 `fastgpt.cn` 中文 canonical；`.io/zh` 仍可访问并指向 `.cn/zh` canonical。

## Locked Inputs

- `artifacts/phase1/faq-source-baseline.json` 是唯一新增 FAQ 运行时输入，必须保持 60 行、十字段和源 SHA-256 `53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547`。
- 60 个 slug 与当前 `src/faq/en.ts` 的 1,400 个 key 无碰撞；新增 FAQ 的问题、答案、Meta 和 14 个源分类按 baseline 原值保真接入。
- 新增 FAQ 没有真实英文译文，不能为其伪造英文页面或 `en` hreflang；现有 1,400 条英中同 key 数据继续输出英中关系。

## Implementation Decisions

### D-201: Locale-specific data union

- Keep `faqEn` as the English-only source of truth with 1,400 records.
- Store the 60 W2 records in a separate `faqW2Zh` module generated from the committed baseline, then merge it into `faqZh` without editing or duplicating the existing 1,400-entry overlay.
- `getFaqData('en')` remains 1,400 records; `getFaqData('zh')` becomes 1,460 records. `getFaqItem` checks the Chinese overlay first and English fallback second.
- Static params and sitemap enumerate IDs from `getFaqData(lang)`, so new slugs exist only under Chinese routes.

### D-202: Data and metadata fidelity

- Map baseline fields exactly: `category -> Category`, `question -> Question`, `answer -> Answers`, `title -> Title`, `description -> Description`, `keywords -> Keywords`.
- Keep the source Title and Description independent per item; existing normalization remains the final length/brand guard and does not use a shared page title.
- New data must be checked in a generated-data validation test against the baseline slug set, field hashes, and 60-row count.

### D-203: Canonical domain split

- Introduce FAQ-specific URL helpers in `src/lib/seo.ts`: English URLs resolve to `https://fastgpt.io`, Chinese URLs resolve to `https://fastgpt.cn` by default, with explicit `NEXT_PUBLIC_IO_HOME_URL` / `NEXT_PUBLIC_CN_HOME_URL` overrides for deployment.
- For every Chinese FAQ page, canonical and `zh`/`zh-CN` alternates point to `.cn`; the `.io/zh` route remains rendered but advertises the `.cn` canonical.
- For an existing translated key, `en` alternate points to the `.io/en` page and `x-default` points to English. For a W2 Chinese-only key, omit `en` and point `x-default` to the `.cn/zh` page.
- JSON-LD breadcrumb URLs use the same canonical domain as the page metadata; sitemap emits canonical English `.io` URLs and canonical Chinese `.cn` URLs.

### D-204: SEO and route invariants

- Detail metadata uses the item-level Title/Description/Keywords and keeps `robots: index, follow` for canonical locale pages.
- Existing locale fallback routes keep their current no-index behavior where content is fallback; new W2 IDs have no English fallback route and are statically absent from English params.
- FAQPage and BreadcrumbList JSON-LD remain present for list and detail pages; list schema includes the first 30 rendered records, detail schema includes the selected record.
- Existing English 1,400 route/sitemap count, existing translated FAQ metadata, and current P0/P1/P2 verification expectations must continue to pass.

## Verification Contract

- A data test proves 60 W2 records are present in the Chinese runtime union, no slug collision exists, all ten baseline fields map to six runtime fields, and source field hashes still match.
- A route test proves English params remain 1,400, Chinese params become 1,460, every new slug is Chinese-only, and sitemap contains all 60 canonical `.cn/zh/faq/{slug}` URLs.
- An SEO helper test proves `.io/zh` canonical points to `.cn/zh`, existing translated entries emit English hreflang, W2-only entries omit English hreflang, and x-default follows the mapping.
- Run lint, `tsc --noEmit`, existing verification scripts, and a production build before closing the phase.

## Deferred

- Phase 3 competitor pages and their signoff workflow.
- Phase 4 import of 100 legacy Meta rows and 2,000 classification rows.
- Phase 5 end-to-end online reachability and search engine evidence.
