# Phase 3: Competitor Comparison Pages - Research

**Researched:** 2026-08-04
**Domain:** Next.js 16 App Router static content, SEO metadata, structured evidence, and responsive comparison tables
**Confidence:** HIGH for repository/source constraints; MEDIUM for framework and schema documentation

<user_constraints>
## User Constraints (from CONTEXT.md)

## Implementation Decisions

### Stable routes and locale scope

- **D-301:** 四个 slug 沿用已签发源稿的稳定值，不在本阶段重命名、改大小写或增加别名：
  - `/zh/compare/dify-vs-fastgpt`
  - `/zh/compare/self-build-vs-platform`
  - `/zh/compare/ragflow-vs-fastgpt`
  - `/zh/compare/maxkb-vs-fastgpt`
- **D-302:** 路由放在现有 `src/app/[lang]` 体系下的 `compare/[slug]`，只生成 `zh` 内容。`en`、`zh-hant` 和其他 locale 没有伪造译文，访问时保持 404 或现有 fallback 之外的明确缺失行为。Phase 3 不增加 `/compare` 索引页、筛选、搜索或分页。
- **D-303:** 中文页面的 canonical 固定为 `https://fastgpt.cn/zh/compare/{slug}`。`https://fastgpt.io/zh/compare/{slug}` 可以继续访问同一中文页面，但 canonical 指向 `.cn`；sitemap 只提交四个已发布的 `.cn` URL。没有真实英文译文时不输出 `en` hreflang，`zh`、`zh-CN` 与 `x-default` 指向中文 canonical。
- **D-304:** 四个 slug 是 W2 内容身份的一部分，后续批次沿用它们。Phase 3 不做 slug 规范化、301、删除或合并。

### Page content contract

- **D-305:** 四页共享同一内容顺序，标题和正文从对应 V1.0 草稿导入并保留含义：
  1. 产品重心分别是什么（首屏先说明双方适用条件并承认竞品强项）。
  2. 能力对照表（只有一方公开列出、双方都有但实现不同、对方强项三类）。
  3. 许可证与商业边界（开源/商业边界、二开、去品牌、多租户 SaaS，以及三年 TCO 成本项模板）。
  4. 怎么自己验证（同一数据集、模型、硬件与验收标准的 POC 方法）。
  5. 中性选型建议（按项目成败因素给出进入候选或 POC 的条件）。
- **D-306:** 能力表、POC 表和 TCO 表使用结构化数据模型渲染，页面正文保持中文优先。表格行必须能追溯到来源记录；读者看到的是事实、验证方法和选型条件，页面不写未经测量的优劣排名。
- **D-307:** 统一保留源稿的表述纪律：用“截至核验日，官方公开资料未列出”描述公开资料边界，用“待 POC”或“待合同”表示尚未形成结论；不把公开资料未列出写成绝对能力判断，不声明任一方普遍更准确、更高性能、更安全或更可靠，不把私有化写成数据绝不出域，不把开源写成没有商业限制。
- **D-308:** 四篇正文不出现任何竞品或 FastGPT 价格数字。涉及成本时只呈现许可/订阅、模型、解析/OCR、基础设施、实施、维保、升级、二开、运维与风险准备金等成本项，以及由读者按当日官网或书面报价填写的三年 TCO 模板；采购形态可以写，价格水平不能写。
- **D-309:** 现阶段不引用客户名称、案例数字、NDA 内容、非公开报价、销售演示截图、逆向工程细节或传闻。没有客户案例授权时，页面保留零案例正文的状态。
- **D-310:** 每页至少有一张信息图/示意图，图片使用稳定的 page asset、明确 alt 文本和固定宽高比；不得使用竞品 Logo 暗示背书。图片缺失、占位或版权边界未清时，页面保持预览并阻断公开。

### Source, fact, date and evidence handling

- **D-311:** 有效内容源固定为 W2 V1.1 的《FastGPT 竞品对比页选型与口径》与 `竞品对比页-首批4篇/` 四篇 V1.0 草稿；客户 KB 第 7 节及各篇官方公开资料是事实依据。V1.0/V1.1 的源文件、版本和 SHA-256 进入生成的 Phase 3 manifest，导入层不静默改写正文。
- **D-312:** 每个事实记录至少携带 `sourceId`、来源标题或官方 URL、来源章节/页面、抓取或核验日期、适用版本/套餐和证据状态。证据状态只允许 `official-public`、`not-publicly-listed`、`poc-required`、`contract-required`；`not-publicly-listed` 只描述公开资料范围，不推导产品无法实现。公开页面展示可访问的官方来源标签/链接，内部 manifest 保留本地交付文件与哈希。
- **D-313:** 初始事实核验日固定为 `2026-07-20`；源稿版本为 `V1.0 (2026-07-30)`，选型与口径文件为 `V1.1 (2026-07-30)`。`datePublished` 取实际公开签发日，`dateModified` 取最后一次内容/事实更新日，`nextReviewOn` 按最近一次成功核验或更新日加 90 个日历日计算。版本号、模板/插件数量、Cloud 配额、支持档位和价格等高频字段必须在复核时重新取证；价格继续不进入正文。
- **D-314:** 事实来源、核验日期、版本与套餐、更新记录四字段在页面底部公开显示。每条高风险能力表述都要有来源映射；POC/合同结论必须明确其验证条件与证据产物，不能把建议当作已验证事实。
- **D-315:** 生成 `artifacts/phase3/competitor-pages-manifest.json`（每页 slug、源指纹、status、sourceRefs、date fields、asset、internalLinks、signoffs、failures）和对应失败报告。manifest 是发布交接与 90 天复核的单一审计入口；实现可选择具体序列化细节，但必须保留这些可观察字段。

### Sign-off and publication gates

- **D-316:** 每页独立记录三方签发证据，三方均有 `status`、签发人/角色、时间戳、证据引用：
  - 产品：确认当期版本边界、能力表述和稳定公开资料；实验版、`rc` 或 `main` 分支能力不计入稳定事实。
  - 销售：确认 FastGPT 商业/采购形态、三年 TCO 写法、CTA 和全文不出现价格数字。
  - 法务：确认商标识别方式、比较广告风险、许可证的 SaaS/去品牌/二开分发边界；Logo 仅在有明确授权时使用。
- **D-317:** 签发门禁之外还必须通过内容审计：五个一级 H2 齐全，Meta title/description、keywords、来源四字段齐全，三类对照表与同条件 POC 方法存在，无价格数字、清单外产品点名、客户案例、绝对化未证实断言和残留占位符；官方来源链接、三条真实内链和 page asset 可解析。合规纪律声明中出现被禁止词时，审计器要识别其声明语境并打印豁免项，不能静默放过。
- **D-318:** 发布流程 fail-closed。任何来源、版本、签发、法务、内链、图片或内容审计失败都不得标记为公开；失败报告列出 slug、门禁、原因和证据路径。已签发的页面可以独立公开，未签发的页面继续预览，不用等待其他页面补齐。

### Preview and public state

- **D-319:** 内容状态只有 `preview` 和 `published`。四个记录都可构建为预览供审核，`preview` 页面显示清晰的预览标识，输出 `robots: noindex, nofollow`，从 sitemap、公开导航和 Article 的公开发布时间分发中排除；直接访问 URL 仍可供审核人员核验。
- **D-320:** 只有对应页面的三方 sign-off、内容审计、source manifest、真实内链和图片门禁全部通过，状态才能转换为 `published`。`published` 页面输出 `robots: index, follow`，进入 sitemap，并使用实际 `datePublished`/`dateModified`。状态转换必须更新 manifest 和失败报告，不依赖手工注释或隐式默认值。

### Metadata, structured data and links

- **D-321:** 每页独立使用源稿交付元数据中的 title、description、keywords；Open Graph 类型为 `article`，Twitter 使用 `summary_large_image`，图片指向该页信息图。交付元数据 HTML 注释只作为内部输入，不原样输出到正文。
- **D-322:** JSON-LD 只输出 `Article` 与 `BreadcrumbList`，不输出 `FAQPage`。`Article` 至少包含 headline、description、image、inLanguage、author/publisher、canonical `mainEntityOfPage`、datePublished 和 dateModified；BreadcrumbList 使用可访问的首页与当前页，避免指向尚未存在的比较索引页。
- **D-323:** 每页保留源稿列出的三类内链目标（私有化方案、开源/商业版说明、定价或 POC 指南）。当前仓库可确认 `/${lang}/price`，其他目标必须在实现时绑定到真实、可访问的 FastGPT 页面或官方文档链接；`#`、`TODO`、空 href 和无法解析的临时地址一律阻断公开。链接数据同时记录 label、target、locale、是否外部和验证结果。

### Responsive and existing code patterns

- **D-324:** 复用现有 `src/app/[lang]` 页面壳、`Navbar`、主题修正、站点 SEO helper、`JsonLd` 与静态 sitemap 模式；比较页使用独立内容数据模块和页面模板，避免把审计字段塞进现有 FAQ `FaqItem`。中文 canonical 复用 Phase 2 的 `.cn` 域名分流逻辑，不能直接套用只面向 `.io` 的通用 locale helper。
- **D-325:** 桌面端保持三列能力表和清晰的比较宽度；移动端将每一行转为带字段标签的纵向块（或等价的可读堆叠），POC/TCO 表也采用同样的行级堆叠，避免缩小字体、裁切文字或产生横向页面溢出。正文使用稳定的移动/桌面边距、行高和表格宽度，图片保留比例并在窄屏降为单列。
- **D-326:** 响应式验收覆盖至少一个桌面宽度和一个窄屏宽度：H1、首屏结论、五段 H2、表格字段、页脚来源和内链均可读、无重叠、无隐藏关键内容；预览与公开状态都要检查。

### the agent's Discretion

- 具体 TypeScript 类型、内容序列化格式、页面组件拆分、manifest 哈希实现、审计脚本实现和图片文件命名由研究与计划阶段决定，只要满足上述字段、路由、状态、门禁和可观察证据。
- 具体官方来源 URL 与三条内链目标由实现阶段按交付时可访问性核验后绑定；源稿里只有概念标签的目标不能被猜测填充。
- 具体 CSS token 和表格堆叠组件可沿用现有设计系统；不引入新的 UI 框架或内容编辑器。

### Deferred Ideas (OUT OF SCOPE)

- HiAgent 页面（P2/W5，闭源且公开规格较少）单独建立内容与法务策略，等待前四篇签发流程跑通。
- Coze、腾讯元器、阿里百炼、n8n 本期不点名、不新增对比页；相关通用需求属于后续不点名内容方向。
- 英文及其他 locale 的正式译文、hreflang、比较页索引/搜索/筛选、客户案例、动态价格接入、实时 POC 结果、SEM 落地页和新的内容编辑后台留到后续阶段。
- 具体私有化、开源/商业说明和 POC 指南的最终目标 URL必须先取得真实可访问链接；链接门禁保持在本阶段，未解析的临时地址不能带入公开页。
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CMP-01 | 用户可以通过四个稳定 URL 分别访问 Dify、自研或直接运行开源、RAGFlow、MaxKB 与 FastGPT 的对比页。 | 有限 `zh` 静态参数、`dynamicParams = false`、exact-set build check；见 Architecture Patterns 与 Validation Architecture。 [VERIFIED: 03-CONTEXT.md; CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params] |
| CMP-02 | 每个对比页可以完整呈现五段正文结构、能力对照表、同条件 POC 方法和中性选型建议，并在桌面端与移动端保持可读。 | 独立 typed content model、三类表格模型、语义表格与 mobile row-stack 组件、双 viewport 验收。 [VERIFIED: W2 source package; CITED: https://www.w3.org/WAI/tutorials/tables/] |
| CMP-03 | 每个对比页可以输出独立 Meta、Open Graph、Twitter、Article 与 BreadcrumbList 结构化数据。 | compare-specific `generateMetadata`, safe Article/Breadcrumb JSON-LD, preview/public robots; generic layout JSON-LD conflict is called out as a required fix. [VERIFIED: src code; CITED: https://nextjs.org/docs/app/api-reference/functions/generate-metadata; CITED: https://schema.org/Article] |
| CMP-04 | 每个对比页可以记录真实内链、信息图、事实来源、核验日期、版本或套餐、更新记录与 90 天复核日期。 | Manifest schema, source-row mapping, link/asset registries, SHA-256 snapshots and date gate. [VERIFIED: 03-CONTEXT.md; VERIFIED: W2 source package] |
| CMP-05 | 发布流程可以记录产品、销售与法务签发证据；签发证据缺失时页面保持预览状态并进入失败清单。 | Per-page sign-off record, fail-closed status reducer, preview noindex/sitemap exclusion and failure report tests. [VERIFIED: 03-CONTEXT.md] |
</phase_requirements>

## Summary

The phase should be implemented as a deterministic, Chinese-only content pipeline around a typed comparison-page model. The four delivered Markdown drafts are read-only inputs; a build-time importer should copy or validate exact source bytes, parse the metadata comment and known five-section shape, preserve source line references, and emit generated runtime data plus `artifacts/phase3/competitor-pages-manifest.json`. The display model must keep content blocks separate from audit/sign-off fields, with capability, POC, and TCO rows as structured arrays rather than a rendered Markdown blob. [VERIFIED: W2 source package; VERIFIED: 03-CONTEXT.md]

The route belongs at `src/app/[lang]/compare/[slug]/page.tsx`, with only the four `zh` params and `dynamicParams = false`. Metadata must be generated per record, use the `.cn` Chinese canonical even when a `.io/zh` request renders the same page, omit the fabricated `en` alternate, and switch `robots` plus sitemap inclusion from `preview` to `published`. The current language layout emits generic Organization/WebSite/WebPage/SoftwareApplication JSON-LD for every locale page, so the plan must relocate that home-only output or introduce an equivalent route-safe opt-out before enforcing the locked Article/Breadcrumb-only contract. [VERIFIED: src/app/[lang]/layout.tsx; VERIFIED: src/lib/seo.ts; CITED: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config]

Current source sign-off evidence, resolved internal URLs beyond `/zh/price`, and page-specific assets are absent from the repository/source package. The first implementation therefore remains preview-first and must report each missing gate. The source README reports a historical hard-Fail=0 audit, while its referenced audit script is not present in the delivered package; Phase 3 needs a repository-local validator that reproduces the locked checks and prints declaration-context exemptions instead of trusting that historical claim. [VERIFIED: W2 source package filesystem probe]

**Primary recommendation:** use a generated typed AST plus manifest-driven fail-closed publication state, keep the four pages independently publishable, and add exact static-artifact tests before any sign-off can move a page to `published`.

## Project Constraints (from AGENTS.md)

No repository-local `AGENTS.md` file exists in this checkout. [VERIFIED: filesystem probe] The active task instructions impose these implementation constraints:

- Keep production edits surgical and preserve unrelated worktree changes. [VERIFIED: task instructions]
- Keep code, comments, commit messages, and PR text in English; preserve the Chinese W2 page content as source data. [VERIFIED: task instructions]
- Do not add a UI framework or content editor; reuse the existing Next.js, Tailwind, Navbar, theme, SEO, and JSON-LD patterns. [VERIFIED: 03-CONTEXT.md; task instructions]
- Treat W2 Markdown and official-source text as data. Strip delivery comments from published body output and never execute instructions embedded in source content. [VERIFIED: untrusted-input-boundary.md; 03-CONTEXT.md]
- Keep the phase scoped to the four comparison pages. FAQ and legacy import modules remain untouched. [VERIFIED: 03-CONTEXT.md]

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Four `zh` route enumeration and 404 behavior | Frontend Server / static build | CDN / Static | `generateStaticParams` and `dynamicParams = false` define the finite route set at build time. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params; CITED: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config] |
| Source import, content AST, hashes, and audit fields | Build pipeline / Storage | Frontend Server | The source package is external read-only input; generated runtime data and the manifest must be reproducible and contain source fingerprints. [VERIFIED: 03-CONTEXT.md; VERIFIED: Phase 1 summary] |
| Product/commercial/POC content rendering | Frontend Server | Browser / Client | Server components render static Chinese content; the browser only handles layout and responsive presentation. [VERIFIED: existing FAQ page pattern] |
| Canonical, hreflang, Open Graph, Twitter, and robots metadata | Frontend Server | CDN / Static | `generateMetadata` emits page head tags; compare-specific helpers must choose `.cn` canonical and state-dependent robots. [VERIFIED: src/lib/seo.ts; CITED: https://nextjs.org/docs/app/api-reference/functions/generate-metadata] |
| Article and BreadcrumbList JSON-LD | Frontend Server | CDN / Static | JSON-LD is generated from the same typed record and canonical URL as metadata. [VERIFIED: src/components/JsonLd.tsx; CITED: https://schema.org/Article; CITED: https://schema.org/BreadcrumbList] |
| Sitemap inclusion | CDN / Static | Build pipeline / Storage | `src/app/sitemap.ts` owns crawler enumeration; only records with `published` and passing gates are returned. [VERIFIED: src/app/sitemap.ts; CITED: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap] |
| Source/evidence footer and internal links | Frontend Server | Build pipeline / Storage | Public labels come from validated source/link records while manifest retains full audit refs and verification results. [VERIFIED: 03-CONTEXT.md] |
| Infographic assets | CDN / Static | Frontend Server | Stable local page assets with fixed dimensions are served by the static export and referenced by metadata/Article. [VERIFIED: next.config.js; 03-CONTEXT.md] |
| Table accessibility and mobile stacking | Browser / Client | Frontend Server | CSS and semantic HTML provide desktop comparison tables and readable mobile row stacks. [CITED: https://www.w3.org/WAI/tutorials/tables/; CITED: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table] |

## Standard Stack

### Core

| Library / Runtime | Locked Version | Purpose | Why Standard |
|------------------|----------------|---------|--------------|
| Next.js App Router | `16.2.6` installed/locked; npm latest probe `16.3.0` on 2026-08-04 | Static route generation, `generateMetadata`, sitemap, static export | Existing application and Phase 2 use App Router; upgrading is outside this phase. [VERIFIED: package.json + package-lock.json + npm view] |
| React | `19.2.6` installed/locked | Server-rendered page and typed comparison components | Existing application runtime. [VERIFIED: package-lock.json + npm view] |
| TypeScript | `5.9.3` installed/locked | Content, manifest, source/evidence, and component contracts | Existing strict compiler configuration catches drift between data and renderers. [VERIFIED: tsconfig.json + package-lock.json + npm view] |
| Node.js built-ins (`node:fs`, `node:crypto`, `node:url`, `node:assert/strict`) | Node `v24.13.0` available; project engine `>=18` | Source snapshot/hash, URL checks, date helpers, deterministic validation | No new package is needed for SHA-256, URL parsing, or Node-based verification scripts. [VERIFIED: runtime probe; package.json] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | `3.4.19` locked | Page spacing, typography, breakpoints, and table state classes | Reuse existing tokens and breakpoints for desktop/mobile compare layouts. [VERIFIED: package-lock.json; 03-CONTEXT.md] |
| `sharp` | `0.33.5` locked dev dependency | Validate generated asset dimensions/type and optionally emit deterministic PNG assets | Use only for asset checks or conversion; do not add an image dependency. [VERIFIED: package-lock.json + npm view] |
| Existing `src/components/JsonLd.tsx` helper | repository code | JSON-LD script emission and BreadcrumbList shape | Extend with Article and safe serialization while retaining existing FAQ/home behavior. [VERIFIED: src/components/JsonLd.tsx] |

### Alternatives Considered

| Instead of | Use | Tradeoff / Decision |
|------------|-----|--------------------|
| Existing FAQ `FaqItem` | A dedicated `ComparisonPageRecord` and audit model | FAQ fields cannot carry source refs, sign-offs, status, assets, or row-level evidence. [VERIFIED: `src/faq/zh.ts`; 03-CONTEXT.md] |
| Generic `getAlternates` | A compare-specific `.cn` canonical/hreflang helper built on Phase 2 domain functions | Generic helper targets `.io` and all locale codes; compare pages have only real `zh` content. [VERIFIED: src/lib/seo.ts; 03-CONTEXT.md] |
| General Markdown renderer dependency | A strict, source-shape importer that emits a typed AST and rejects unknown syntax | No Markdown package is installed, and arbitrary HTML is an injection surface. The importer only needs the four fixed drafts and must fail on shape drift. [VERIFIED: package.json; MEDIUM inference from source shape] |
| Horizontal overflow table | Semantic desktop table plus CSS/DOM mobile row stack from the same row model | Meets the locked no-overflow requirement while preserving labels for narrow screens. [VERIFIED: 03-CONTEXT.md; CITED: https://www.w3.org/WAI/tutorials/tables/] |
| One aggregate publish switch | Per-page `preview`/`published` status | D-318 requires independently publishable pages and independent failures. [VERIFIED: 03-CONTEXT.md] |

**Installation:** No new packages are required. Use the checked-in lockfile with `npm ci` in a clean environment; do not upgrade the existing Next/React toolchain during this phase. [VERIFIED: package.json + package-lock.json]

**Version verification:**

```bash
npm view next version time.modified --json
npm view react version time.modified --json
npm view typescript version time.modified --json
npm view sharp version time.modified --json
```

The probe returned Next `16.3.0`, React `19.2.8`, TypeScript `7.0.2`, and sharp `0.35.3` as latest registry values on 2026-08-04; the project remains pinned to the installed lockfile versions shown above. [VERIFIED: npm registry probe]

## Package Legitimacy Audit

No external package installation is proposed for this phase. Existing dependencies are already present in `package-lock.json` and `node_modules`; the package-legitimacy install gate is therefore not applicable. [VERIFIED: package.json + filesystem probe]

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| None added | — | — | — | — | N/A | No install |

**Packages removed due to [SLOP] verdict:** none.
**Packages flagged as suspicious [SUS]:** none.

## Architecture Patterns

### System Architecture Diagram

```text
W2 V1.1 policy + four V1.0 Markdown drafts (read-only)
             |
             v
  source snapshot + SHA-256 + strict parser
             |
             v
 typed page AST + source-row references + link/asset registry
             |
             v
 content audit + URL/asset checks + three sign-off records
       /                 \
 failures                all gates pass
    |                         |
    v                         v
 manifest=preview       manifest=published
 robots noindex         robots index/follow
 no sitemap/nav         canonical sitemap entry
 preview badge          Article date distribution
       \                 /
        v               v
       compare page server component -> desktop table/mobile row stack
                              |
                              v
                    static `out/zh/compare/{slug}` HTML
```

The diagram describes responsibilities rather than file layout. Every branch writes an observable manifest/failure result before HTML is considered publishable. [VERIFIED: 03-CONTEXT.md]

### Recommended Project Structure

```text
artifacts/phase3/
├── source/                                  # Exact byte snapshots of the five W2 input docs
├── competitor-pages-manifest.json           # One record per slug; publication handoff source
└── competitor-pages-failures.json           # Gate failures with evidence paths

src/compare/
├── types.ts                                 # Runtime content, evidence, status, sign-off types
├── generated.ts                             # Deterministic output from the source importer
├── registry.ts                              # Four slug records and validated link/asset refs
└── date.ts                                  # UTC calendar-day and 90-day review helpers

src/components/compare/
├── ComparisonPage.tsx                       # Shared five-section page template
├── ComparisonTables.tsx                     # Capability, POC, and TCO row renderers
├── ComparisonEvidenceFooter.tsx             # Source/date/version/update/review fields
└── ComparisonStatusBadge.tsx                # Preview marker; no status guesswork

src/app/[lang]/compare/[slug]/
└── page.tsx                                 # zh-only params, metadata, Article/Breadcrumb, page shell

public/images/compare/
├── dify-vs-fastgpt.svg (or .png)            # Page-specific asset, fixed dimensions, no competitor logo
├── self-build-vs-platform.svg (or .png)
├── ragflow-vs-fastgpt.svg (or .png)
└── maxkb-vs-fastgpt.svg (or .png)

scripts/phase3/
├── ingest_competitor_pages.mjs              # Source snapshot, parse, hash, and generate
├── validate_competitor_pages.mjs            # Source/content/link/manifest gates
├── test_compare_routes.mjs                  # Static params and source-level route assertions
└── test_compare_build.mjs                   # Static HTML exact-set/SEO/schema/status checks
```

The source snapshot location is a planning recommendation: it allows CI to reproduce output without depending on `/Users/longnv/bin/repo/fastgpt-data`. The importer must verify the snapshot against the locked hashes before generating data and must leave the external source package untouched. [ASSUMED: repository will vendor exact W2 source snapshots for CI reproducibility]

### Pattern 1: Deterministic source-to-AST import

**What:** Read each draft as bytes, verify the expected path and SHA-256, parse the leading metadata comment, then parse the known five-section Markdown shape into typed blocks. Preserve source line numbers and source IDs on every table row. Emit generated TypeScript/JSON and the manifest in one deterministic run.

**When to use:** Every content change or manifest refresh. A missing source, changed hash, unknown heading, unknown table shape, forbidden term, or unresolved placeholder exits non-zero before generation. [VERIFIED: Phase 1 reader/validator pattern; 03-CONTEXT.md]

```typescript
export type PublicationStatus = 'preview' | 'published';
export type EvidenceState =
  | 'official-public'
  | 'not-publicly-listed'
  | 'poc-required'
  | 'contract-required';

export interface SourceRef {
  sourceId: string;
  title: string;
  url?: string;
  section: string;
  checkedOn: string;
  versionOrPlan: string;
  evidenceState: EvidenceState;
}

export interface ComparisonPageRecord {
  slug: string;
  status: PublicationStatus;
  title: string;
  description: string;
  keywords: string[];
  sections: {
    focus: ContentBlock[];
    capability: CapabilityTable;
    commercial: CommercialSection;
    poc: PocSection;
    selection: SelectionRow[];
  };
  sourceRefs: SourceRef[];
  datePublished?: string;
  dateModified: string;
  nextReviewOn: string;
  asset: AssetRef;
  internalLinks: LinkRef[];
  signoffs: SignoffSet;
  failures: Failure[];
}
```

The parser should treat the delivery HTML comment as input metadata only. It should not render that comment and should reject arbitrary HTML in the body. [VERIFIED: W2 draft first 18 lines; D-321]

### Pattern 2: Finite locale/slug route

**What:** Generate exactly four `{ lang: 'zh', slug }` params, set `dynamicParams = false`, and resolve a missing record with `notFound()`. The page data lookup and metadata lookup must use the same record.

```typescript
const comparisonSlugs = [
  'dify-vs-fastgpt',
  'self-build-vs-platform',
  'ragflow-vs-fastgpt',
  'maxkb-vs-fastgpt'
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ lang: 'zh', slug }));
}
```

Next.js documents that `generateStaticParams` runs during build and that `dynamicParams = false` returns 404 for values outside the generated set. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params; CITED: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config]

### Pattern 3: State-driven metadata and canonical

**What:** Build metadata from the manifest record. The canonical and all Chinese alternates use `https://fastgpt.cn/zh/compare/{slug}`. `en` is absent. Preview metadata uses `noindex,nofollow`; published metadata uses `index,follow` and includes the page asset in Open Graph/Twitter.

```typescript
const canonical = getCompareCanonicalUrl('zh', record.slug);
const published = record.status === 'published';

return {
  title: record.title,
  description: record.description,
  keywords: record.keywords,
  alternates: {
    canonical,
    languages: { zh: canonical, 'zh-CN': canonical, 'x-default': canonical }
  },
  robots: published ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: record.title,
    description: record.description,
    type: 'article',
    locale: 'zh_CN',
    images: [{ url: assetUrl, width: record.asset.width, height: record.asset.height, alt: record.asset.alt }]
  },
  twitter: { card: 'summary_large_image', title: record.title, description: record.description, images: [assetUrl] }
};
```

Next.js supports `generateMetadata`, canonical/language alternates, Open Graph/Twitter fields, and robots directives from Server Components. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-metadata]

### Pattern 4: Article/Breadcrumb JSON-LD from the same record

**What:** Emit exactly one Article and one BreadcrumbList script for each compare page. Use the same canonical URL and asset URL as metadata. Escape `<` before embedding JSON in a script to prevent source content from closing the script element.

```typescript
function safeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: record.title,
  description: record.description,
  image: [assetUrl],
  inLanguage: 'zh-CN',
  author: { '@type': 'Organization', name: 'FastGPT' },
  publisher: { '@type': 'Organization', name: 'FastGPT', url: canonicalBase },
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  ...(record.datePublished ? { datePublished: record.datePublished } : {}),
  dateModified: record.dateModified
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首页', item: `${canonicalBase}/zh` },
    { '@type': 'ListItem', position: 2, name: record.title, item: canonical }
  ]
};
```

Schema.org defines Article properties including headline, author, publisher, image, language, canonical page relation, and publication/modification dates. BreadcrumbList uses ordered ListItems with `position` and item/name URLs. [CITED: https://schema.org/Article; CITED: https://schema.org/BreadcrumbList]

The current `[lang]/layout.tsx` unconditionally renders the generic `JsonLd` component. Move that call to the locale home page (preserving homepage structured data) or add a route-safe opt-out before the compare build test asserts that compare HTML contains only Article and BreadcrumbList. [VERIFIED: src/app/[lang]/layout.tsx; VERIFIED: src/app/[lang]/page.tsx; D-322]

### Pattern 5: Status-filtered sitemap

**What:** Keep the existing `src/app/sitemap.ts` as the single sitemap owner, append `published` compare records using `getCompareCanonicalUrl`, and filter all `preview` records. Include `lastModified` from `dateModified`; do not add a compare index URL.

```typescript
for (const record of comparisonPages) {
  if (record.status !== 'published' || record.failures.length > 0) continue;
  entries.push({
    url: getCompareCanonicalUrl('zh', record.slug),
    lastModified: new Date(`${record.dateModified}T00:00:00.000Z`)
  });
}
```

Next.js `MetadataRoute.Sitemap` returns URL objects with `lastModified` and other crawler fields; the phase adds a manifest-state filter on top of that API. [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap]

### Pattern 6: Semantic desktop table plus mobile row stack

**What:** Render capability/POC/TCO rows from one typed array. Desktop uses `<caption>`, `<thead>`, `<th scope="col">`, `<th scope="row">`, and `<td>`. Mobile uses the same row labels as stacked field/value blocks at the narrow breakpoint, with the desktop view hidden from the accessibility tree when the mobile view is active.

```tsx
<table className="hidden md:table w-full table-fixed">
  <caption className="sr-only">能力对照表</caption>
  <thead>
    <tr>
      {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
    </tr>
  </thead>
  <tbody>
    {rows.map((row) => (
      <tr key={row.id}>
        <th scope="row">{row.label}</th>
        <td>{row.left}</td>
        <td>{row.right}</td>
      </tr>
    ))}
  </tbody>
</table>
```

W3C WAI requires structural header/data markup and recommends `scope`, `id`, and `headers` when associations are complex; MDN documents captions as the accessible table name. [CITED: https://www.w3.org/WAI/tutorials/tables/; CITED: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table]

### Anti-Patterns to Avoid

- **Render the raw Markdown comment/body as HTML:** delivery metadata and arbitrary HTML can leak into the page or become an injection path. Emit a typed AST and escape text. [VERIFIED: W2 draft; security analysis]
- **Put audit fields in `FaqItem`:** this couples a new publication contract to the legacy FAQ runtime and loses independent source/sign-off state. [VERIFIED: Phase 1/2 summaries]
- **Use the generic locale helper for compare canonicals:** it emits `.io` and all locale alternates, conflicting with the Chinese-only contract. [VERIFIED: src/lib/seo.ts; D-303]
- **Let layout generic JSON-LD remain unexamined:** compare pages then inherit Organization/WebSite/WebPage/SoftwareApplication scripts in addition to the locked Article/Breadcrumb pair. [VERIFIED: src/app/[lang]/layout.tsx]
- **Use a single `overflow-x-auto` table on mobile:** long Chinese cells remain difficult to compare and violate the locked readable row-stack requirement. [VERIFIED: D-325]
- **Treat the historical source audit as a release gate:** the referenced source audit script is absent here; run a repository-local validator against exact bytes and manifests. [VERIFIED: W2 source package filesystem probe]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static route generation | Request-time slug routing or a custom 404 router | Next.js `generateStaticParams` + `dynamicParams = false` | Framework build and 404 behavior already cover finite dynamic routes. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params] |
| Head metadata | Manual `<head>` markup per page | Next.js `generateMetadata` and compare SEO helpers | Prevents metadata drift and gives typed robots/OG/Twitter/alternates output. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-metadata] |
| Sitemap XML | Hand-built XML strings | `MetadataRoute.Sitemap` in existing `src/app/sitemap.ts` | Next.js owns serialization and static caching; the phase only filters records. [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap] |
| JSON-LD schema shapes | Generic string templates or FAQ schema reuse | Existing `JsonLdScript` plus typed Article/Breadcrumb objects | Schema.org property relationships and locked schema set are explicit. [VERIFIED: src/components/JsonLd.tsx; CITED: https://schema.org/Article] |
| Integrity hashing | Homegrown digest algorithm | `crypto.createHash('sha256')` over exact source bytes and canonical manifest payload | SHA-256 and deterministic serialization already establish the Phase 1 evidence pattern. [VERIFIED: Phase 1 summary; Node standard library] |
| General Markdown/HTML parser | A permissive custom browser renderer | Strict fixed-shape importer to typed blocks; reject unknown syntax | Four fixed drafts need controlled structure, and arbitrary HTML is an input risk. [ASSUMED: fixed-shape importer is sufficient for future V1 drafts] |
| Accessible data tables | CSS-only visual grids with no header semantics | Native table headers/captions plus a shared mobile row model | Assistive technologies need programmatic row/column relationships. [CITED: https://www.w3.org/WAI/tutorials/tables/]
| URL checks | Regex-only URL parsing or blind `fetch` of arbitrary targets | WHATWG `URL`, HTTPS/host allowlist, and bounded verification | Avoids malformed links and build-time SSRF/open-redirect risks. [VERIFIED: D-323; security analysis]

**Key insight:** the hard part is the publication contract, not rendering four articles. A typed record, immutable source fingerprint, and status reducer make the page, metadata, sitemap, and handoff artifact consume the same evidence.

## Common Pitfalls

### Pitfall 1: Generic layout JSON-LD violates the compare schema set

**What goes wrong:** A compare HTML file contains the generic Organization, WebSite, WebPage, and SoftwareApplication scripts emitted by `[lang]/layout.tsx` in addition to Article/BreadcrumbList.

**Why it happens:** The current locale layout renders `JsonLd` before every child page. [VERIFIED: src/app/[lang]/layout.tsx]

**How to avoid:** Relocate the generic call to `[lang]/page.tsx` or add a route-safe layout contract, then assert the compare HTML JSON-LD type set is exactly `{Article, BreadcrumbList}`.

**Warning signs:** `scripts/phase3/test_compare_build.mjs` finds `Organization`, `FAQPage`, or `SoftwareApplication` in a compare document.

### Pitfall 2: Preview accidentally becomes discoverable

**What goes wrong:** An unsigned page appears in sitemap, public navigation, or an `index,follow` robots tag.

**Why it happens:** Status defaults are inferred from source comments or a page-level constant instead of the manifest gate.

**How to avoid:** Compute status with one fail-closed reducer, require all sign-offs/evidence gates for `published`, and make sitemap/navigation consume the same status map.

**Warning signs:** A preview slug appears in `out/sitemap.xml`, `meta[name="robots"]` is not `noindex, nofollow`, or a nav link points to `/zh/compare/`.

### Pitfall 3: `.io/zh` emits the wrong canonical or fake English alternate

**What goes wrong:** The same Chinese HTML advertises an `.io` canonical or an `en` hreflang with no translated page.

**Why it happens:** `getAlternates` is reused without the Phase 2 Chinese-domain split. [VERIFIED: src/lib/seo.ts]

**How to avoid:** Add `getCompareCanonicalUrl`/`getCompareAlternates` with explicit `.cn` base and only `zh`, `zh-CN`, `x-default`; test under default and environment-overridden domains.

**Warning signs:** canonical does not equal `https://fastgpt.cn/zh/compare/{slug}` or any `hreflang="en"` exists.

### Pitfall 4: The second draft does not have the same source headings

**What goes wrong:** A strict parser expects `## 2. 能力对照表` and rejects the self-build draft, or a permissive importer silently drops the four cost groups.

**Why it happens:** The self-build source uses `## 1. 现状`, `## 2. 四组必算成本`, and `## 3. 平台层的代价也要如实算`, while the common contract names the conceptual sections. [VERIFIED: W2 source headings]

**How to avoid:** Define an explicit source-to-template mapping for slug `self-build-vs-platform`, preserve original section titles in source references, and assert all four cost groups plus the TCO table survive the generated AST. Do not make a silent generic heading rename.

**Warning signs:** Generated self-build HTML has fewer than four cost groups, no license/commercial boundary section, or row count differs from the source audit.

### Pitfall 5: Source metadata or body drifts during import

**What goes wrong:** Title, description, keywords, paragraph text, or table cells are normalized/truncated without evidence.

**Why it happens:** A Markdown renderer treats delivery comments and body text as one stream, or the generator edits copy while adapting headings.

**How to avoid:** Hash exact input bytes, keep source line refs, compare emitted text/table-cell hashes, and reject unknown transformations. The delivery comment remains internal input only. [VERIFIED: D-311; Phase 1 hash pattern]

**Warning signs:** Manifest source hash changes without a source package change, source row IDs disappear, or generated output contains the comment block.

### Pitfall 6: Source audit false positives hide real violations

**What goes wrong:** Compliance declaration sentences containing words such as “准确率更高” are rejected as claims, or the exemption logic silently accepts a real claim.

**Why it happens:** A raw keyword regex ignores sentence context.

**How to avoid:** Keep a two-stage auditor: detect terms, classify quoted/negated compliance declarations, print every exemption, and still fail for unclassified terms. Add fixture tests for both a valid declaration and an invalid absolute claim. [VERIFIED: W2 README audit contract]

### Pitfall 7: Unresolved links or placeholder assets reach public state

**What goes wrong:** `#`, `TODO`, empty hrefs, concept-only targets, missing images, or unverified source URLs appear on a page marked published.

**Why it happens:** The draft metadata contains labels only (`私有化部署方案页`, `POC 指南`) and no concrete target URLs/assets. [VERIFIED: W2 draft metadata]

**How to avoid:** Use a link registry with target, locale, external flag, and verification result; use a per-page asset registry with file hash, alt, dimensions, and copyright check. Any unresolved item remains preview and enters failures.

**Warning signs:** Link target starts with `#`, contains `TODO`, returns a non-2xx result, points to the future `/compare` index, or asset dimensions are unknown.

### Pitfall 8: Mobile table text is clipped or overflows the page

**What goes wrong:** Three-column capability and four-column POC/TCO tables become unreadable on narrow screens.

**Why it happens:** Desktop widths are simply shrunk or wrapped in horizontal scroll.

**How to avoid:** Render a row-stack view with stable field labels, keep an accessible semantic table for desktop, and validate at one desktop and one narrow viewport with overflow checks. [VERIFIED: D-325/D-326; CITED: W3C WAI tables]

### Pitfall 9: JSON-LD content can close its own script

**What goes wrong:** A source string containing `<` or `</script>` corrupts JSON-LD HTML.

**Why it happens:** `dangerouslySetInnerHTML` receives raw `JSON.stringify` output. The existing helper does exactly that for existing schemas. [VERIFIED: src/components/JsonLd.tsx]

**How to avoid:** Escape `<` (and optionally `>`, `&`) before assigning JSON-LD script text; test a fixture containing `<` in a source label.

## Code Examples

### Fail-closed status reducer

```typescript
const requiredSignoffs = ['product', 'sales', 'legal'] as const;

export function resolveStatus(record: DraftRecord): PublicationStatus {
  const failures = [
    ...record.failures,
    ...requiredSignoffs.flatMap((key) =>
      record.signoffs[key].status === 'approved' ? [] : [`${key} sign-off missing`]
    ),
    ...(record.sourceRefs.every((ref) => ref.url && ref.evidenceState) ? [] : ['source refs incomplete']),
    ...(record.internalLinks.every((link) => link.verified) ? [] : ['links incomplete']),
    ...(record.asset.verified ? [] : ['asset incomplete'])
  ];

  return failures.length === 0 ? 'published' : 'preview';
}
```

The reducer must also persist the computed failures and never infer `published` from a manually edited status field. [VERIFIED: D-318/D-320]

### Manifest source fingerprint

```javascript
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export function sha256File(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}
```

Hash source bytes and the deterministic manifest payload separately. Keep volatile generation timestamps outside the canonical digest, following the Phase 1 reader pattern. [VERIFIED: scripts/phase1/xlsx_reader.py]

### Status-filtered sitemap helper

```typescript
export function compareSitemapEntries(records: ComparisonPageRecord[]) {
  return records
    .filter((record) => record.status === 'published' && record.failures.length === 0)
    .map((record) => ({
      url: getCompareCanonicalUrl('zh', record.slug),
      lastModified: new Date(`${record.dateModified}T00:00:00.000Z`)
    }));
}
```

This helper should be tested independently so a future sitemap refactor cannot bypass the status gate. [VERIFIED: src/app/sitemap.ts; D-319/D-320]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router `getStaticPaths` and fallback behavior | App Router `generateStaticParams` plus `dynamicParams = false` | Next.js App Router API; current docs updated 2026-02-27 | Finite compare slugs can be generated and unknown slugs 404 at build/runtime boundary. [CITED: https://nextjs.org/docs/app/api-reference/functions/generate-static-params] |
| Hand-authored sitemap XML | `app/sitemap.ts` returning `MetadataRoute.Sitemap` | Next.js 13.3+; current docs updated 2026-03-25 | Existing sitemap remains typed and can filter published records. [CITED: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap] |
| Generic FAQ schema for all content | Article plus BreadcrumbList for comparison editorial pages | Phase 3 locked contract | Avoids presenting comparison prose as FAQ answers and keeps schema types auditable. [VERIFIED: D-322] |
| Desktop table shrunk on mobile | Same typed rows rendered as labeled mobile blocks | Phase 3 locked contract | Retains readability and row context without horizontal page overflow. [VERIFIED: D-325; CITED: https://www.w3.org/WAI/tutorials/tables/] |

**Deprecated/outdated:**

- Treating an experimental `rc` or `main` branch capability as stable product evidence is excluded by D-316. [VERIFIED: 03-CONTEXT.md]
- Shipping source delivery comments or placeholder link labels as page body is excluded by D-321/D-323. [VERIFIED: 03-CONTEXT.md]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Exact W2 source snapshots can be vendored under `artifacts/phase3/source/` for CI while the external source package remains read-only. [ASSUMED] | Recommended Project Structure | CI cannot reproduce generated data; planner needs a different source delivery mechanism. |
| A2 | A strict fixed-shape importer can cover future V1 drafts without a general Markdown package. [ASSUMED] | Standard Stack / Don't Hand-Roll | A later source shape may require an approved parser or a new content contract. |
| A3 | Page-specific SVG or PNG infographics without competitor logos satisfy the asset requirement. [ASSUMED] | Recommended Project Structure | Design/legal may require raster assets or a different copyright review. |
| A4 | Preview Article JSON-LD may omit `datePublished` until an actual public sign-off date exists while published records require it. [ASSUMED] | Pattern 4 / Open Questions | The planner must choose between schema completeness and the locked “no public publish date” preview behavior. |
| A5 | Moving the generic locale `JsonLd` call from layout to the locale home page preserves existing homepage structured-data checks. [ASSUMED] | Pattern 4 | FAQ or other route schema output could change; existing P0/P1/P2 checks must prove no regression. |
| A6 | Build-time URL reachability checks can use a fixed HTTPS host allowlist and bounded requests. [ASSUMED] | Security Domain / Pitfalls | Some official documentation hosts may require manual verification or a separate allowlist fixture. |

## Open Questions

1. **Which three concrete internal/external targets satisfy each draft's private deployment, open/commercial, and pricing/POC labels?**
   - What we know: `/zh/price` is present in the repository; source drafts provide labels without URLs. [VERIFIED: `src/app/[lang]/price/page.tsx`; VERIFIED: W2 draft metadata]
   - What's unclear: Private deployment, commercial/open-source explanation, and POC URLs at release time.
   - Recommendation: Add a checked-in link registry with explicit owner/verification date; keep each page preview until all three targets pass.

2. **What are the product, sales, and legal evidence files or sign-off IDs?**
   - What we know: The W2 package requires all three per page and currently says sign-offs are pending. [VERIFIED: W2 comparison README]
   - What's unclear: Reviewer identities, role strings, timestamps, and evidence paths.
   - Recommendation: Define a JSON evidence shape now and require real IDs before status transition; do not use a boolean shortcut.

3. **Should preview Article JSON-LD include `datePublished`?**
   - What we know: D-319 excludes preview from public publish-date distribution; D-322 lists `datePublished` as an Article field. [VERIFIED: 03-CONTEXT.md]
   - What's unclear: Whether the contract expects a null/omitted field for preview or a planned publication date.
   - Recommendation: Omit it for preview, require it for published, and assert the chosen behavior in the manifest/build test.

4. **How should the self-build draft map to the common “capability table” heading?**
   - What we know: Its source section 2 is four cost groups and its section 4 contains TCO/POC tables. [VERIFIED: W2 source headings]
   - What's unclear: Whether the signed editorial source expects canonical template headings or source headings preserved verbatim.
   - Recommendation: Map the source sections explicitly in typed data, retain original labels in source refs, and have product sign-off approve the rendered headings.

5. **Where will responsive visual evidence run?**
   - What we know: Node, npm, curl, Next, and sharp are available; no Chromium/Playwright CLI or case-sensitive `/Volumes/FastGPTCase` mount is present in this checkout. [VERIFIED: environment probe]
   - What's unclear: The browser harness and case-sensitive build environment used by the release gate.
   - Recommendation: Use a Linux/Ubuntu or case-sensitive CI build for exact static output, and reserve desktop/mobile screenshot evidence for Phase 5's browser validation workflow.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Next build and Phase 3 scripts | ✓ | `v24.13.0` | Project engine accepts `>=18`; use CI Node version pinned by repository policy. [VERIFIED: runtime probe; package.json] |
| npm | Dependency install and scripts | ✓ | `11.6.2` | `npm ci` from lockfile. [VERIFIED: runtime probe] |
| Next.js | Static export and App Router | ✓ | `16.2.6` | None needed; do not upgrade for Phase 3. [VERIFIED: package-lock.json] |
| TypeScript | `tsc --noEmit` | ✓ | `5.9.3` | None needed. [VERIFIED: package-lock.json] |
| sharp | Asset dimension/type validation | ✓ | `0.33.5` | Validate with `file`/image metadata if the optional check cannot load sharp. [VERIFIED: package-lock.json] |
| Python 3 | Existing Phase 1 tooling reference only | ✓ | `3.14.4` | Not required for Phase 3 runtime; Node scripts are the recommended validator path. [VERIFIED: runtime probe] |
| curl | Bounded official-link reachability checks | ✓ | system | Manual source-link verification if network is unavailable. [VERIFIED: runtime probe] |
| Case-sensitive filesystem | Exact static route build evidence | ✗ | `/Volumes/FastGPTCase` not mounted | Run on Ubuntu CI or mount a case-sensitive volume before phase gate. [VERIFIED: environment probe; Phase 2 verification] |
| Browser/Playwright CLI | Responsive visual evidence | ✗ | no command found | Use the project's browser harness/manual QA in Phase 5; retain automated DOM/overflow assertions in Phase 3. [VERIFIED: environment probe] |

**Missing dependencies with no fallback:** none for implementation; case-sensitive build and browser evidence are release-environment requirements, not blockers for source planning.

**Missing dependencies with fallback:** case-sensitive build -> Ubuntu/case-sensitive CI; browser CLI -> Phase 5 browser harness/manual review.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js ESM scripts with `node:assert/strict`; existing repo pattern uses `scripts/phase1` and `scripts/phase2`. [VERIFIED: repository scripts] |
| Config file | None; scripts are explicit Wave 0 outputs |
| Quick run command | `node scripts/phase3/validate_competitor_pages.mjs && node scripts/phase3/test_compare_routes.mjs` |
| Full suite command | `npm run lint && npx tsc --noEmit && node scripts/phase3/validate_competitor_pages.mjs && node scripts/phase3/test_compare_routes.mjs && NEXT_TELEMETRY_DISABLED=1 npm run build && node scripts/phase3/test_compare_build.mjs` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CMP-01 | Four exact `zh` routes build; unknown slug/locale is 404 and no compare index exists. | route/build | `node scripts/phase3/test_compare_routes.mjs` | No - Wave 0 |
| CMP-02 | Five sections, structured capability/POC/TCO rows, neutral selection text, semantic tables, and no missing body blocks. | unit + static artifact | `node scripts/phase3/validate_competitor_pages.mjs && node scripts/phase3/test_compare_build.mjs` | No - Wave 0 |
| CMP-02 | Desktop and narrow viewport content has no clipping/overflow and all labels remain visible. | manual visual + DOM smoke | Browser harness/manual check against `out/zh/compare/*` | No - Phase 3/5 QA evidence |
| CMP-03 | Per-page title/description/keywords, OG article, Twitter large image, `.cn` canonical, hreflang set, Article and BreadcrumbList only. | static artifact | `node scripts/phase3/test_compare_build.mjs` | No - Wave 0 |
| CMP-04 | Manifest contains source hashes, source refs, dates, 90-day review, verified links, asset metadata, and row-level evidence. | unit/contract | `node scripts/phase3/validate_competitor_pages.mjs` | No - Wave 0 |
| CMP-05 | Missing signoff/evidence forces preview, noindex, no sitemap/nav exposure, and a failure record; each page transitions independently. | unit + static artifact | `node scripts/phase3/validate_competitor_pages.mjs && node scripts/phase3/test_compare_build.mjs` | No - Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/phase3/validate_competitor_pages.mjs && node scripts/phase3/test_compare_routes.mjs`
- **Per wave merge:** `npm run lint && npx tsc --noEmit` plus the complete Phase 3 validator suite.
- **Phase gate:** case-sensitive `NEXT_TELEMETRY_DISABLED=1 npm run build`, exact static artifact checks, and responsive preview/published evidence before `$gsd-verify-work`.

### Wave 0 Gaps

- [ ] `artifacts/phase3/source/` exact source snapshots and expected SHA-256 fixture.
- [ ] `src/compare/types.ts`, `src/compare/generated.ts`, and `src/compare/registry.ts` typed contracts.
- [ ] `scripts/phase3/ingest_competitor_pages.mjs` deterministic importer and `scripts/phase3/validate_competitor_pages.mjs` fail-closed auditor.
- [ ] `scripts/phase3/test_compare_routes.mjs` and `scripts/phase3/test_compare_build.mjs` exact-set/SEO/schema tests.
- [ ] Four page assets with fixed dimensions, alt text, hash, and copyright status.
- [ ] Link registry with three concrete targets per page and bounded URL verification.
- [ ] Compare-specific SEO helpers and a safe Article JSON-LD helper.
- [ ] Route-safe handling for generic locale `JsonLd` and `HomeLayoutSwitcher`/Navbar compare behavior.

## Security Domain

Security enforcement is enabled in `.planning/config.json` at ASVS level 1. [VERIFIED: .planning/config.json]

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Public editorial pages; no new authentication surface. [VERIFIED: phase scope] |
| V3 Session Management | no | No session or cookie state is introduced. [VERIFIED: phase scope] |
| V4 Access Control | limited | Publication state is a build/publish gate, not user authorization; preview direct access is intentional and must be noindex. [VERIFIED: D-319/D-320] |
| V5 Input Validation | yes | Strict source grammar, typed data, escaped text/JSON-LD, `URL` parsing, HTTPS host allowlist, placeholder rejection, and bounded link checks. [VERIFIED: D-312/D-323; security analysis] |
| V6 Cryptography | yes for integrity only | Use Node `crypto.createHash('sha256')` for source/manifest fingerprints; do not invent encryption or signing. [VERIFIED: Phase 1 hash pattern] |

### Known Threat Patterns for Next.js static content

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Markdown/body or metadata comment reaches HTML unsafely | Tampering / XSS | Strip delivery comments, reject arbitrary HTML, render typed escaped text; never pass source Markdown to `dangerouslySetInnerHTML`. [VERIFIED: untrusted-input-boundary.md; security analysis] |
| JSON-LD string contains `</script>` | Tampering | Escape `<`/`>`/`&` before embedding JSON-LD and assert valid script parsing in the build test. [VERIFIED: existing `JsonLd.tsx`; security analysis] |
| Link registry accepts `javascript:`, `data:`, malformed, or attacker-controlled hosts | Tampering / Elevation | Parse with WHATWG `URL`, require `https:`, allowlist FastGPT/official hosts, use `rel="noopener noreferrer nofollow"` for external links, and fail closed. [VERIFIED: D-323; Navbar external-link pattern] |
| Build-time URL checker fetches arbitrary private addresses | SSRF | Validate host before network calls, disallow localhost/private IP ranges, cap redirects/timeouts, or use an offline verified-link fixture. [ASSUMED: network checker implementation] |
| Preview output enters crawler surface | Information disclosure | Manifest-driven `noindex,nofollow`, no sitemap entry, no public nav link, and no public date distribution; test HTML and sitemap together. [VERIFIED: D-319/D-320; CITED: https://nextjs.org/learn/seo/metatags] |
| Source hash changes without review | Tampering | Compare expected SHA-256 and fail before generation; persist failures with evidence path. [VERIFIED: D-311/D-315; Phase 1 validator pattern] |
| SVG asset contains unsafe markup or competitor logo | Tampering / Legal | Generate deterministic local assets from an allowlisted template, inspect dimensions/content, and require legal asset status before publication. [ASSUMED: asset review workflow] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/03-competitor-comparison-pages/03-CONTEXT.md` - Locked routes, content contract, source/evidence model, sign-off gates, preview/public state, metadata, links, and responsive constraints. [VERIFIED: codebase file]
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` - CMP-01..05, phase dependencies, success criteria, and Phase 1/2 handoff state. [VERIFIED: codebase files]
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/README.md` - W2 V1.1 source selection, no-price/no-case discipline, sign-off blockers, and historical source audit report. [VERIFIED: source package]
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/FastGPT-竞品对比页选型与口径-V1.1-星触达-20260730.md` - Four-page editorial template, evidence language, POC/TCO requirements, and 90-day review policy. [VERIFIED: source package; SHA-256 `5877bce6f14d209c07bbf21c37cfd489fec1510c2022194ad2226e3010707a52`]
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/README.md` - Four draft metadata/discipline contract and pending sign-offs/links/assets. [VERIFIED: source package; SHA-256 `77616d2543fd3a58a54f11ff201ae5e33890ba99dc1d15e6d2dbd12454a378b1`]
- The four draft files - Dify `c25614d6a8c7a1c294a5b828f93cd35fae00cc566b2355a27afb0e6f50adc27c`, self-build `311664f8f4dbbd77d4480675d0cdaef640584c5b944f1db6d0e166f7f378ca20`, RAGFlow `aff17f5fffdbdc9f2186334cdfef59267a0d69697cd7a069d41daf1360f8f1c1`, MaxKB `60162fa80f25cae929f5ca60c5461d6e57760f319d2f2b42f23b28dff7bb7002`. [VERIFIED: source package SHA-256]
- `src/app/[lang]/faq/[id]/page.tsx`, `src/lib/seo.ts`, `src/components/JsonLd.tsx`, `src/app/sitemap.ts`, `src/components/home/Navbar.tsx`, `src/components/home/HomeLayoutSwitcher.tsx`, and `src/styles/globals.css` - Existing page, SEO, structured data, sitemap, shell, and responsive patterns. [VERIFIED: codebase files]
- Phase 1/2 summaries and verification reports - Source hash/validator patterns, static build exact-set checks, `.cn` canonical behavior, and case-sensitive build caveat. [VERIFIED: codebase files]

### Secondary (MEDIUM confidence)

- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Build-time dynamic route params and unspecified-path behavior. [CITED: official docs; provider websearch, cross-checked]
- [Next.js route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) - `dynamicParams = false` 404 behavior. [CITED: official docs; provider websearch]
- [Next.js `generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Robots, canonical/language alternates, Open Graph, and Twitter metadata. [CITED: official docs; provider websearch]
- [Next.js sitemap metadata file](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - `MetadataRoute.Sitemap` shape and static sitemap generation. [CITED: official docs; provider websearch]
- [Schema.org Article](https://schema.org/Article) and [BreadcrumbList](https://schema.org/BreadcrumbList) - Article and breadcrumb properties/JSON-LD examples. [CITED: official schema docs]
- [W3C WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) and [MDN `<table>` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table) - Header associations, captions, and semantic table markup. [CITED: official accessibility docs]

### Tertiary (LOW confidence)

- None used. General responsive recommendations are grounded in the locked context and W3C/MDN references.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - versions and existing patterns were checked in `package.json`, `package-lock.json`, installed modules, and npm registry probes; no new package is proposed.
- Architecture: HIGH - route/layout/SEO/sitemap boundaries were read from the current checkout and constrained by the Phase 3 context.
- Source/content mapping: HIGH for the four current files; MEDIUM for future draft shape because the self-build draft diverges from the conceptual common headings.
- Framework/schema guidance: MEDIUM - official documentation was fetched through web search because Context7/ctx7 was unavailable in this runtime.
- Responsive/accessibility: MEDIUM-HIGH - W3C/MDN semantic table guidance is authoritative; exact visual tokens remain repository implementation work.

**Research date:** 2026-08-04
**Valid until:** 2026-09-03 for stable repository patterns; re-verify Next.js/Schema.org behavior and official source URLs at implementation time because they can change faster.
