# Phase 3: 竞品对比页发布 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-04
**Phase:** 3-竞品对比页发布
**Mode:** `--auto` autonomous discussion; recommended options selected without interactive prompts
**Areas discussed:** stable routes and locale, content structure and neutrality, source/date/evidence, sign-off and publication state, SEO and links, responsive behavior, deferred scope

---

## Stable routes and locale

| Option | Description | Selected |
|--------|-------------|----------|
| Source slugs under `/zh/compare/{slug}` | Keep the four delivered slugs, Chinese-first route set, `.cn` canonical, `.io/zh` access with canonical handoff | ✓ |
| New product-specific route names | Rename paths to `/zh/competitors/...` or translate slugs | |
| Locale parity in Phase 3 | Add English and other locale pages before Chinese content is signed | |

**Auto choice:** Keep the source slugs and use `/zh/compare/` as the only Phase 3 route namespace. Generate the four Chinese records for preview and publish states; omit English hreflang and additional locale routes without real translations. Keep the four URLs stable for later batches.

**Notes:** Source slugs are `dify-vs-fastgpt`, `self-build-vs-platform`, `ragflow-vs-fastgpt`, and `maxkb-vs-fastgpt`. The canonical host follows the Phase 2 Chinese-domain rule: `https://fastgpt.cn/zh/compare/{slug}`.

## Content structure and neutrality

| Option | Description | Selected |
|--------|-------------|----------|
| One shared five-section template | Product focus, three-class capability table, license/commercial boundary, same-condition POC, neutral selection guidance | ✓ |
| Per-page editorial structures | Allow each competitor article to choose unrelated headings and comparison formats | |
| Feature-score or winner ranking | Collapse evidence into a weighted score or claim a universal winner | |

**Auto choice:** Use the source package's five-section contract and preserve each page's competitor-specific strengths, cost checklist, and POC additions inside that shape. Render capability comparisons from structured rows and keep conditions/evidence visible.

**Notes:** The capability table has three semantic groups: one-sided public claims, shared capabilities with different implementation paths, and the competitor's strengths. The body uses the source wording discipline and carries no price digits, customer cases, or unsupported universal performance claims.

## Source, verification and evidence

| Option | Description | Selected |
|--------|-------------|----------|
| Claim-level source manifest | Map every fact to source title/URL, section, verification date, applicable version and evidence status; show four source fields publicly | ✓ |
| Footer date only | Publish a single source sentence and one date without per-claim evidence | |
| Live lookup at render time | Fetch competitor pages during every build and treat current content as the only source | |

**Auto choice:** Use the W2 V1.1 selection memo, four V1.0 drafts and official public materials as versioned inputs. Record `sourceVerifiedOn=2026-07-20`, source/package versions, source hashes, source IDs, evidence statuses and computed 90-day review dates in a Phase 3 manifest. Show source, verification date, version/package and update record in every page footer. Label unresolved conclusions as `poc-required` or `contract-required`.

**Notes:** Stable claims exclude `main` and `rc` material. High-frequency facts such as versions, templates/plugins, Cloud quotas and support tiers are rechecked at each review. Prices remain outside the page body. Local W2 files are audit inputs; public source links must point to accessible official pages.

## Sign-off and publication state

| Option | Description | Selected |
|--------|-------------|----------|
| Per-page three-party gate | Product, sales and legal each provide evidence; missing evidence keeps that page in preview and adds a failure row | ✓ |
| Batch-level all-or-nothing release | Hold all four pages until every signer has approved every page | |
| Editorial approval only | Treat source draft audit as sufficient and publish without product/sales/legal evidence | |

**Auto choice:** Gate each page independently with product, sales and legal evidence plus content, source, link and image checks. A signed page can publish while another remains preview. Missing or stale evidence fails closed; no manual comments or source-draft status can substitute for a recorded sign-off.

**Notes:** Product confirms version boundaries and capability wording; sales confirms commercial/POC wording and the no-price policy; legal confirms trademarks, comparative advertising and license boundaries. The source audit must also pass five H2 sections, metadata, source fields, no forbidden numeric claims, no out-of-scope product names, no customer cases, no placeholders, real links and a page image.

## Preview versus public

| Option | Description | Selected |
|--------|-------------|----------|
| Build preview routes with explicit status | `preview` renders for reviewers with `noindex,nofollow`, is absent from sitemap/nav; `published` is indexable and listed | ✓ |
| Exclude unsigned pages from the build | Reviewers cannot inspect the page until all gates pass | |
| Publish all pages and add a disclaimer | Keep unsigned pages indexable with a visible notice | |

**Auto choice:** Use only `preview` and `published` statuses. Build all four records for review; preview renders a clear marker, noindex/nofollow metadata, no sitemap entry and no public navigation entry. A status transition to `published` requires complete evidence and updates the manifest, failure report, sitemap and dates.

**Notes:** This keeps a stable review URL while preventing search discovery. Published pages use `index,follow`, actual publication dates and canonical Chinese URLs.

## SEO, structured data and internal links

| Option | Description | Selected |
|--------|-------------|----------|
| Independent Article metadata and JSON-LD | Per-page TDK, Article + BreadcrumbList, article social preview, Chinese alternates | ✓ |
| Reuse FAQ metadata/schema | Treat comparison pages as FAQ detail pages and emit FAQPage JSON-LD | |
| Metadata embedded only in source comments | Keep delivery comments as the sole metadata source without runtime validation | |

**Auto choice:** Use each draft's independent title, description and keywords, `og:type=article`, Twitter large-card metadata, page image, `Article` and `BreadcrumbList` JSON-LD. Keep FAQPage out. Use a two-item breadcrumb (home and current page) until a comparison index exists. Require three real target links per page; `/zh/price` is the currently verified local target and other private/open-source/POC targets need accessible canonical URLs before publish.

**Notes:** Draft HTML comments remain internal input. The sitemap filters by `published` status. Chinese canonical/alternate behavior follows Phase 2's `.cn`/`.io` split and emits no fabricated English relation.

## Responsive behavior and assets

| Option | Description | Selected |
|--------|-------------|----------|
| Desktop tables plus mobile stacked rows | Preserve labeled fields and reading order at narrow widths; reserve a stable image slot | ✓ |
| Shrink three-column tables until they fit | Preserve the table grid at the cost of unreadable text and clipped content | |
| Horizontal page overflow | Keep wide tables as-is and rely on browser scrolling | |

**Auto choice:** Keep three-column capability tables on desktop and transform rows into labeled vertical blocks on mobile. Apply the same row stacking to POC/TCO tables, keep text and controls inside their containers, use stable gutters/line-height and preserve page image aspect ratios. Reuse current app shell and typography tokens; avoid a new UI framework.

**Notes:** Verification covers a desktop and narrow viewport for every status. It checks no overlap, clipping, hidden columns, or horizontal page overflow and confirms H1, five sections, source footer, links and the preview marker remain readable.

## Deferred scope

| Option | Description | Selected |
|--------|-------------|----------|
| Record explicit deferred items | Keep HiAgent, unlisted competitors, translations, index/search, cases, prices and live POC results outside Phase 3 while preserving their rationale | ✓ |
| Expand Phase 3 to all competitors and locales | Add HiAgent, Coze, Tencent Yuanqi, Ali Bailian, n8n and English pages now | |
| Add unrelated conversion features | Add comments, ratings, comparison filters, dynamic pricing or SEM landing pages | |

**Auto choice:** Keep the phase limited to the four delivered pages and their publication/evidence workflow. HiAgent follows a later dedicated policy; Coze, Tencent Yuanqi, Ali Bailian and n8n remain outside the named comparison set. Translation, index/search, customer cases, live POC result claims, dynamic pricing, SEM and a content editor are future work.

## the agent's Discretion

- Exact TypeScript content types, component boundaries, manifest serialization, audit script names and image file names.
- Exact official source URLs and the remaining two internal-link targets after an accessibility check; unresolved targets remain a publish blocker.
- CSS tokens and table stacking implementation consistent with existing App Router and global style patterns.

## Deferred Ideas

- HiAgent comparison page after the first four sign-off flows are proven.
- The unnamed generic article for the Coze-related demand cluster, if the content owner approves it later.
- English/other-locale translations and a comparison landing/index page.
- Customer cases, live POC measurements, dynamic price data and SEM/conversion landing pages.

