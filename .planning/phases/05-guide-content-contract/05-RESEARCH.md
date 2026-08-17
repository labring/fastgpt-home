# Phase 5: Guide Content Contract - Research

**Researched:** 2026-08-17  
**Domain:** Versioned bilingual Markdown source contract for a static Next.js export  
**Confidence:** HIGH

## Phase Requirements

| ID | Description | Research Support |
|---|---|---|
| GUIDE-01 | Enumerate exactly eight unique Guide slugs, each with one approved Chinese and English document. | The package audit found eight same-slug `zh`/`en` pairs and one non-article appendix excluded from the corpus. [VERIFIED: Week04 source audit] |
| GUIDE-02 | Build every publishable body by removing exactly one leading delivery-metadata comment and preserving the normalized body. | All 16 articles begin at byte zero with one `<!-- ... -->` delivery block; after CRLF/LF normalization each body begins with `\n\n#`. [VERIFIED: Week04 source audit] |
| GUIDE-03 | Fail with the slug for duplicate, incomplete, mismatched, invalid, missing-asset, or unresolved-link contracts. | The current Node verifier pattern already uses `assert`, `fs`, content hashes, and route-specific error messages. [VERIFIED: scripts/verify-deep-content.js:1-137] |

## Summary

The smallest durable Phase 5 outcome is a committed raw-source boundary plus one typed, eight-pair registry and one source verifier. The external Week04 directories are delivery inputs, so a production static build needs the approved Markdown copied into the repository and read synchronously from a server-only module. The loader must normalize newlines before finding the first comment and return the remaining bytes unchanged; render work belongs to Phase 6. [VERIFIED: src/lib/tech-center-content.ts:1-7] [VERIFIED: next.config.js:2-9]

The 16 documents are structurally consistent enough for one strict parser: each has a single leading delivery comment, an H1 body, source canonical/hreflang, title, description, keywords, schema declaration, internal-link labels, and an asset directive. Four slug pairs request an image, three explicitly say `无`, and `self-build-three-year-tco` has an ambiguous blank/malformed image field. None of the article bodies contains Markdown images or Markdown links, so Phase 5 must retain source directives and validate explicit registry mappings rather than infer rendered assets or URLs. [VERIFIED: Week04 source audit]

**Primary recommendation:** Commit the raw 16 files, project them into one typed registry, and make the registry/source verifier reject every contract defect with its slug before any Guide route or UI is added.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| Approved source retention and newline/comment boundary | Database / Storage | API / Backend | Version-controlled Markdown is the build-time source; the server-only loader owns filesystem reads. [VERIFIED: src/lib/tech-center-content.ts:1-7] |
| Pair identity, canonical metadata, schema and directives | API / Backend | Database / Storage | A typed registry is the one lookup surface from which later routes and SEO values can derive. [VERIFIED: .planning/STATE.md] |
| Contract validation and source-fidelity digest | API / Backend | — | Node build scripts already perform filesystem, hash, asset, route, and assertion validation. [VERIFIED: scripts/verify-deep-content.js:1-137] |
| Hub/article rendering, image display and link navigation | Frontend Server (SSR) | Browser / Client | These visitor surfaces are explicitly assigned to Phase 6. [VERIFIED: .planning/ROADMAP.md] |

## Project Constraints (from AGENTS.md)

- Use the approved 16 Week04 Markdown documents as the Guide source of truth and preserve authored bodies. [VERIFIED: AGENTS.md]
- Publish paired same-slug `/guide/<slug>` URLs on the owned domains in Phase 6; preserve URL/SEO consistency through shared route helpers. [VERIFIED: AGENTS.md]
- Production is a Next.js static export, so all route data must be available at build time. [VERIFIED: AGENTS.md]
- Reuse Node.js and repository tooling; add no package for this content-contract work. [VERIFIED: AGENTS.md]
- Follow existing TypeScript, server-only, direct assertion, English-code-comment, and `@/*` import conventions. [VERIFIED: AGENTS.md]
- Keep changes surgical, remove newly unused code, and leave a runnable verification check. [VERIFIED: AGENTS.md]
- Do not create a separate parallel FAQ/content system; use the established content-loader and verifier patterns where they fit. [VERIFIED: AGENTS.md]

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---|---|---|---|
| Node.js built-ins: `node:fs`, `node:path`, `node:crypto`, `node:assert/strict` | Node 24.13.0 available | Read committed source, constrain paths, compare fidelity digests, and produce failing checks. | The existing source verifier already uses `fs`, `path`, `crypto`, and route-specific errors. [VERIFIED: scripts/verify-deep-content.js:1-137] [VERIFIED: local environment audit] |
| TypeScript | 5.9.3 installed | Type the registry and schema union. | The project uses strict TypeScript and `npx tsc --noEmit`. [VERIFIED: package.json] [VERIFIED: local environment audit] |

### Supporting

| Library | Version | Purpose | When to Use |
|---|---|---|---|
| `server-only` | Existing dependency | Mark the loader as build/server-only. | Use on the filesystem-reading Guide loader, matching the technical-content loader. [VERIFIED: src/lib/tech-center-content.ts:1-7] |

**Installation:** No installation. [VERIFIED: AGENTS.md]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|---|---|---|
| A custom Markdown parser in Phase 5 | The existing comparison Markdown block parser | The comparison parser removes a comment permissively and converts bodies into a limited block model; it cannot serve as the source-faithful contract boundary. [VERIFIED: src/content/competitor/loader.ts:1-160] |
| Committed source docs | Read `/Users/longnv/Downloads/Week04/...` during builds | The current loader roots content at `process.cwd()`; committing the source makes static builds reproducible. [VERIFIED: src/lib/tech-center-content.ts:3-7] |

## Package Legitimacy Audit

No external package is proposed or installed in this phase. [VERIFIED: AGENTS.md]

## Source Package Audit

The audit includes exactly the eight `.md` files in each stated Week04 article directory. The extra English `附-需求依据映射（GSC英文词）.md` is an appendix, carries no paired article slug, and stays outside the 8×2 registry. [VERIFIED: Week04 source audit]

### Delivery boundary

- Every included source begins with exactly one `<!-- ... -->` block at byte zero. [VERIFIED: Week04 source audit]
- Every comment closes before the H1; normalized body text starts with `\n\n#`. [VERIFIED: Week04 source audit]
- Ten documents use CRLF and the `pharma-compliance-docs` pair uses LF; normalize with `source.replace(/\r\n?/g, '\n')` before boundary validation. [VERIFIED: Week04 source audit]
- Each body contains zero Markdown image syntaxes and zero Markdown link syntaxes. [VERIFIED: Week04 source audit]
- The body builder should remove the matched leading comment only, retain the remaining normalized bytes exactly, and compare a SHA-256 digest in the verifier. This mirrors the existing approved-body hash check. [VERIFIED: scripts/verify-deep-content.js:64-103]

### Exact pair identity and delivery directives

| Slug | Chinese canonical / schema / asset | English canonical / schema / asset | Source internal-link labels |
|---|---|---|---|
| `saas-platform-enterprise-gaps` | `https://fastgpt.cn/guide/saas-platform-enterprise-gaps`; `Article + BreadcrumbList（对比表不使用 FAQPage）`; `无` | `https://fastgpt.io/guide/saas-platform-enterprise-gaps`; `Article + BreadcrumbList（对比表不使用 FAQPage）`; `无` | 私有化页 / 迁移指南 / 竞品对比页 |
| `self-build-three-year-tco` | `https://fastgpt.cn/guide/self-build-three-year-tco`; `Article + BreadcrumbList`; blank `配图需求:` | `https://fastgpt.io/guide/self-build-three-year-tco`; `Article + BreadcrumbList`; `配图需求:` contains a sign-off sentence | 定价页 / ROI 说明 / POC 指南 |
| `server-sizing-guide` | `https://fastgpt.cn/guide/server-sizing-guide`; `HowTo + Article + BreadcrumbList`; requested server-sizing diagram | `https://fastgpt.io/guide/server-sizing-guide`; `HowTo + Article + BreadcrumbList`; same requested diagram | 部署文档 / 私有化页 |
| `complex-doc-golden-set` | `https://fastgpt.cn/guide/complex-doc-golden-set`; `HowTo + Article + BreadcrumbList`; requested golden-set/scorecard diagram | `https://fastgpt.io/guide/complex-doc-golden-set`; `HowTo + Article + BreadcrumbList`; same requested diagram | 文档解析文档 / 知识库配置 / 竞品对比页 |
| `support-bot-four-steps` | `https://fastgpt.cn/guide/support-bot-four-steps`; `HowTo + Article + BreadcrumbList`; `无` | `https://fastgpt.io/guide/support-bot-four-steps`; `HowTo + Article + BreadcrumbList`; `无` | 客服场景页 / 渠道接入 / 案例页 |
| `manufacturing-itops-invoice-audit` | `https://fastgpt.cn/guide/manufacturing-itops-invoice-audit`; `Article + BreadcrumbList`; requested IT-ops/invoice diagram | `https://fastgpt.io/guide/manufacturing-itops-invoice-audit`; `Article + BreadcrumbList`; same requested diagram | 制造方案页 / 集成文档 / 案例页 |
| `pharma-compliance-docs` | `https://fastgpt.cn/guide/pharma-compliance-docs`; `Article + BreadcrumbList`; `无` | `https://fastgpt.io/guide/pharma-compliance-docs`; `Article + BreadcrumbList`; `无` | 医药方案页 / 私有化页 / 案例页 |
| `education-retail-support-insight` | `https://fastgpt.cn/guide/education-retail-support-insight`; `Article + BreadcrumbList`; requested education/retail diagram | `https://fastgpt.io/guide/education-retail-support-insight`; `Article + BreadcrumbList`; same requested diagram | 教育方案页 / 零售方案页 / 案例页 |

All values in this table are transcribed from the 16 delivery comments. [VERIFIED: Week04 source audit]

### Exact localized metadata

| Slug | Locale | Meta title | Meta description |
|---|---|---|---|
| `saas-platform-enterprise-gaps` | zh | SaaS智能体平台企业落地选型：四项书面核实与落地验证指南 | 讲解企业采购SaaS智能体平台的落地选型方法，通过四项书面核实与落地步骤规避安全、定制、迁移三类落地风险，附相关规避框架与评估要点，可帮助企业填补选型信息差 |
| `saas-platform-enterprise-gaps` | en | Enterprise SaaS AI Agent Platform Selection Checklist | A structured verification guide for CTOs and IT decision-makers evaluating SaaS AI agent platforms, to mitigate compliance, customization and migration |
| `self-build-three-year-tco` | zh | 自建AI知识库三年总成本拆解与同口径选型指南 | 详解企业自建AI知识库的四层核心成本与六项易漏隐性成本，提供统一口径对比自研与采购方案的方法与选型验证步骤，助力精准控制全周期预算，避免隐性成本吞噬整体预算 |
| `self-build-three-year-tco` | en | 3-Year Total Cost of Ownership for Self-Hosted Enterprise AI | A structured framework for evaluating self-hosted versus purchased enterprise AI knowledge bases, covering core costs, hidden operational expenses, and |
| `server-sizing-guide` | zh | 百人规模企业知识库服务器选型指南 | 针对百人规模企业知识库服务器选型，无需依赖通用固定配置表，讲解四大核心维度、轻量部署上限、验证方法、部署边界与扩容条件，助力精准匹配资源规格并明确合规要点。 |
| `server-sizing-guide` | en | Server Sizing for 100-Person Enterprise RAG Knowledge Bases | A structured decision framework for IT leaders to size servers for 100-person enterprise RAG knowledge bases, with clear deployment boundaries and POC |
| `complex-doc-golden-set` | zh | 用黄金集验证企业复杂文档解析的选型效果 | 为企业技术与采购决策者提供文档解析工具选型方法，涵盖黄金集搭建、边界取舍与质量验证等核心步骤，助力避开厂商演示的选型误区，掌握真实业务场景验证的实用方法。 |
| `complex-doc-golden-set` | en | Enterprise Document Parsing Tool Selection Validation Guide | A structured framework for validating enterprise AI document parsing tools with custom golden datasets, covering local vs enhanced parsing, scoring, and |
| `support-bot-four-steps` | zh | 智能客服落地全指南：流程拆解、边界限制与效果优化 | 介绍智能客服落地四步标准流程、边界、验证方法及常见误区，含高重复咨询场景落地要点，帮助企业搭建高效系统，释放客服人力，优化服务体验，适配企业规模化服务需求。 |
| `support-bot-four-steps` | en | Enterprise Generative AI Customer Support Deployment Guide | A structured four-step deployment workflow for enterprise AI customer support, including best practices for setup, rule configuration, and continuous |
| `manufacturing-itops-invoice-audit` | zh | 制造企业运维与审单场景数字化选型指南 | 面向制造企业IT与采购决策者，拆解运维与财务审单场景的RAG+规则引擎落地方案，提供验证方法与边界参考，复用现有接口实现轻量化落地释放一线人力，提升运维与审核效率 |
| `manufacturing-itops-invoice-audit` | en | Manufacturing Enterprise IT and Finance RAG Rule Engine Depl | A lightweight RAG + rule engine solution for manufacturing IT and finance workflows, reducing repetitive manual workloads and boosting efficiency. |
| `pharma-compliance-docs` | zh | 生物医药企业文档密集场景AI选型与合规实践指南 | 本指南针对生物医药企业合规、质量文档等场景，提供低代码RAG智能体选型、落地步骤及合规约束相关内容，含各场景落地动作、责任分工与验收标准，助其解决文档管理痛点。 |
| `pharma-compliance-docs` | en | AI Agent Selection & Compliance for Biopharma Document-Inten | A structured decision framework for selecting AI agents for biopharma document-heavy workflows, covering use cases, compliance rules, deployment best |
| `education-retail-support-insight` | zh | 教育与零售高并发咨询落地选型指南 | 针对教育、零售行业高并发咨询场景，提供智能分流、业务洞察的落地方法、验证标准与典型参考案例，帮助解决响应慢、数据分散、上线风险等业务难题，涵盖多场景落地细节 |
| `education-retail-support-insight` | en | Decision Guide for AI High-Concurrency Support Platforms in | A structured decision framework for evaluating enterprise AI platforms that deliver high-concurrency customer support and actionable business insights for |

The source title/description strings, including their English endings, are approved metadata values for this phase and must remain verbatim. [VERIFIED: Week04 source audit]

## Architecture Patterns

### System Architecture Diagram

```text
Week04 8×2 delivery Markdown
        |
        | commit verbatim source files
        v
typed eight-pair registry -----> source-contract verifier -----> slug-specific failure
        |                                  |                         (duplicate/pair/meta/schema/
        |                                  |                          asset/link/body digest)
        v                                  v
server-only Guide loader ----------> normalized body + typed metadata
        |
        v
Phase 6 routes / metadata / sitemap / rendered Markdown
```

### Recommended Project Structure

```text
src/content/guides/
├── zh/<slug>.md             # raw approved Chinese delivery document
├── en/<slug>.md             # raw approved English delivery document
└── registry.ts              # typed 8-pair projection and explicit directives
src/lib/guideContent.ts      # server-only strict reader and validation helpers
scripts/verify-guide-content.js # standalone source-contract check
```

The folder names above are implementation recommendations, not existing paths. [ASSUMED]

### Pattern 1: Strict source boundary

**What:** Normalize newlines, require exactly one comment at the beginning, parse only known metadata keys, then return `normalized.slice(comment.length)` as the publishable body.

**When to use:** Every registry entry load, build, and verification.

**Example:**

```ts
const normalized = source.replace(/\r\n?/g, '\n');
const delivery = /^<!--([\s\S]*?)-->/.exec(normalized);
if (!delivery) throw new Error(`${slug}: missing leading delivery metadata`);
const body = normalized.slice(delivery[0].length);
```

This preserves the two blank lines preceding the authored H1; trimming would alter the approved normalized body. [VERIFIED: Week04 source audit]

### Pattern 2: Registry projection plus source comparison

**What:** Keep raw source as authority and store a typed registry projection containing the eight slugs, source filenames, localized metadata, declared schema types, asset policy, and fully resolved internal links.

**When to use:** All future route, SEO, sitemap, card, and verification lookups.

**Example validation sequence:**

1. Check `registry.length === 8`, unique lower-case slugs, and exactly one `zh` and one `en` document per slug.
2. Parse each source header and require its slug, locale-derived canonical, hreflang cluster, metadata, schema declaration, and normalized-body SHA-256 to equal the registry record.
3. Require schema tokens from the source-backed set `Article`, `BreadcrumbList`, and `HowTo`; reject every other token with the slug in the error. [VERIFIED: Week04 source audit]
4. Require each declared image to have a local public path and alternative text; require every configured internal link to be an owned, existing route or known registry destination.

### Anti-Patterns to Avoid

- **Reading the Downloads directory at build time:** it makes the static build depend on a local delivery path outside the repository. [VERIFIED: src/lib/tech-center-content.ts:3-7]
- **Using `replace(/^<!--[\s\S]*?-->\s*/, '')` as the contract boundary:** the existing comparison loader intentionally permits an absent comment and strips arbitrary following whitespace, which cannot prove GUIDE-02 source fidelity. [VERIFIED: src/content/competitor/loader.ts:82-84]
- **Treating source link labels as URLs:** every body has zero Markdown links and every delivery comment supplies labels only, so link destinations need an explicit registry mapping. [VERIFIED: Week04 source audit]
- **Generating assets from prose:** the delivery package includes image requests and no image files; asset paths and alt text require approved, committed files before a `required` directive passes. [VERIFIED: Week04 source audit]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Source filesystem access | A client-side fetch layer | Node `fs.readFileSync` behind `import 'server-only'` | Existing technical content establishes this build-time boundary. [VERIFIED: src/lib/tech-center-content.ts:1-7,136-143] |
| Pair/source verification | A new test framework or spreadsheet parser | Existing Node `assert` + `crypto` verifier pattern | It already checks metadata, body hashes, images, and internal targets. [VERIFIED: scripts/verify-deep-content.js:1-137] |
| Source-fidelity evidence | A lossy reserialized Markdown AST | Newline-normalized source string plus SHA-256 digest | The current verifier uses the same digest approach for approved bodies. [VERIFIED: scripts/verify-deep-content.js:64-103] |

**Key insight:** The delivery comments are an input contract, while the body is publishable content; a strict boundary avoids releasing internal sign-off and retains a reproducible source proof. [VERIFIED: Week04 source audit]

## Common Pitfalls

### Pitfall 1: Ambiguous `self-build-three-year-tco` asset field

**What goes wrong:** Chinese source line 15 is empty after `配图需求:` and English source line 16 places a sign-off sentence after the same field. [VERIFIED: Week04 source audit]

**How to avoid:** Preserve both raw source values in the audit projection, record an explicit `asset: undefined` exception for this slug pair, and verify that no image is rendered until an approved asset path and alt text are supplied. This is the source-faithful minimal-risk interpretation; it invents neither an image nor an image requirement.

**Warning sign:** A metadata parser that allows `\s*` to cross newlines will misclassify the English sign-off as an asset specification.

### Pitfall 2: Source link labels have no destinations

**What goes wrong:** Every document requests two or three links only by label, while the body itself provides no anchor URL. [VERIFIED: Week04 source audit]

**How to avoid:** Require `label`, locale, and owned target in the registry, then validate the target against current routes/registries. Preserve unresolved labels as a Phase 5 build failure until their target is chosen.

**Warning sign:** A rendered article has textual “related links” with `#`, a foreign host, or a route absent from the static parameter inventory.

### Pitfall 3: Locale metadata is localized, not byte-identical

**What goes wrong:** Chinese and English titles/descriptions/H1 values differ by language; treating them as equality pairs rejects approved content. [VERIFIED: Week04 source audit]

**How to avoid:** Compare each locale against its own raw source snapshot while checking cross-locale identity only for slug, reciprocal hreflang targets, and allowed schema declaration.

### Pitfall 4: Reusing a lossy renderer parser as source validation

**What goes wrong:** The comparison loader has a broad metadata removal regex and only parses headings through level three plus a small block set. [VERIFIED: src/content/competitor/loader.ts:82-160]

**How to avoid:** Keep Phase 5 limited to source retention and raw body extraction; select the Markdown rendering surface during Phase 6 after it is proven to cover the source bodies.

## Code Examples

### Slug-specific verifier shape

```js
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

function verifyBody(slug, body, expectedHash) {
  const hash = crypto.createHash('sha256').update(body).digest('hex');
  assert.equal(hash, expectedHash, `${slug}: published body differs from approved copy`);
}
```

This follows the established verification style and preserves a slug in the failure message. [VERIFIED: scripts/verify-deep-content.js:99-103]

## State of the Art

| Old Approach | Current Approach | Impact |
|---|---|---|
| Technical-center content uses `---` front matter and a zh-only route shape. | Guide input uses a leading HTML delivery comment and paired `zh`/`en` documents. | Guide needs its own strict source parser and registry; it should reuse Node/server-only mechanics only. [VERIFIED: src/lib/tech-center-content.ts:26-63] [VERIFIED: Week04 source audit] |
| Comparison content removes delivery comments for rendering. | Phase 5 needs a fidelity contract that proves exactly one comment removal. | Reuse the data boundary idea; replace the permissive stripping rule with a strict validator. [VERIFIED: src/content/competitor/loader.ts:82-84] |

## Open Questions

1. **Destination mapping for 20 source-declared internal-link labels**
   - What we know: labels occur in delivery comments and no article body has a Markdown link. [VERIFIED: Week04 source audit]
   - What's unclear: approved owned-domain URLs are absent from the source package. [VERIFIED: Week04 source audit]
   - Recommendation: add only explicit, owned target mappings to the registry; keep every unresolved label as a slug-specific verifier failure until a stable destination is selected.

2. **`self-build-three-year-tco` image policy**
   - What we know: Chinese metadata is blank and English metadata puts a sign-off sentence in `配图需求`. [VERIFIED: Week04 source audit]
   - What's unclear: an approved image asset and alternative text. [VERIFIED: Week04 source audit]
   - Recommendation: record the source anomaly verbatim and set no required asset for the pair; Phase 6 can add an image only from an approved asset record.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---|---|---|
| Node.js | Loader and standalone verifier | ✓ | v24.13.0 | — |
| npm | Existing project commands | ✓ | 11.6.2 | — |
| TypeScript CLI | Strict registry check | ✓ | 5.9.3 | `npx --no-install tsc --noEmit` |

No external service or package is required for Phase 5. [VERIFIED: local environment audit] [VERIFIED: AGENTS.md]

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V2 Authentication | no | Build-time committed content has no authentication flow. [VERIFIED: Phase 5 scope] |
| V3 Session Management | no | Build-time committed content has no session flow. [VERIFIED: Phase 5 scope] |
| V4 Access Control | no | Phase 5 adds no requester-facing authorization. [VERIFIED: Phase 5 scope] |
| V5 Input Validation | yes | Validate slugs, fixed locale pair, schema union, approved relative paths, asset existence, and owned internal targets before build. |
| V6 Cryptography | yes | Use Node SHA-256 only for source-integrity comparison; do not implement a custom digest. [VERIFIED: scripts/verify-deep-content.js:1-3,99-103] |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---|---|---|
| Registry filename escapes content root | Tampering | Resolve the path, require it to remain under the fixed Guide content root, and reject separators/absolute paths in the registry filename. |
| Delivery metadata reaches rendered body | Information Disclosure | Require one leading comment and return only the suffix after its closing delimiter. |
| Arbitrary or foreign internal URL | Tampering | Validate configured links against owned hosts and a known route/registry inventory. |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | `src/content/guides/` and `src/lib/guideContent.ts` are suitable new locations. | Architecture Patterns | The planner can select a nearer established content location while preserving the server-only/raw-source contract. |

## Sources

### Primary (HIGH confidence)

- Week04 Chinese package `/Users/longnv/Downloads/Week04/深度内容-第2批8篇` — eight raw delivery documents, header/body boundaries, metadata, image directives, and link labels. [VERIFIED: Week04 source audit]
- Week04 English package `/Users/longnv/Downloads/Week04/深度内容-英文版8篇` — eight paired raw delivery documents and one excluded appendix. [VERIFIED: Week04 source audit]
- `src/lib/tech-center-content.ts` — server-only filesystem loader and newline/front-matter validation pattern. [VERIFIED: src/lib/tech-center-content.ts:1-210]
- `src/content/competitor/loader.ts` — delivery-comment removal behavior and its fidelity limitation. [VERIFIED: src/content/competitor/loader.ts:82-160]
- `scripts/verify-deep-content.js` — source hash, metadata, asset, and link verifier pattern. [VERIFIED: scripts/verify-deep-content.js:1-137]
- `next.config.js` — production static-export configuration. [VERIFIED: next.config.js:2-9]

### Secondary (MEDIUM confidence)

- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports) — lookup attempted through the research seam; the provider returned an unsupported content type, so no implementation claim relies on it. [CITED: https://nextjs.org/docs/app/guides/static-exports]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — existing Node, TypeScript, loader, and verifier surfaces were opened in this session. [VERIFIED: package.json] [VERIFIED: scripts/verify-deep-content.js:1-137]
- Architecture: HIGH — static export and current content loader patterns are directly present in the repository. [VERIFIED: next.config.js:2-9] [VERIFIED: src/lib/tech-center-content.ts:1-210]
- Source contract and pitfalls: HIGH — all 16 source documents were read and structurally audited. [VERIFIED: Week04 source audit]

**Research date:** 2026-08-17  
**Valid until:** 2026-09-16 for the current committed source package; refresh if any Week04 document changes.
