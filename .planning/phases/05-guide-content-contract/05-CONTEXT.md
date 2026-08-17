# Phase 5: Guide Content Contract - Context

**Gathered:** 2026-08-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 5 establishes one reproducible, source-faithful contract for the fixed Week04 Guide corpus: exactly eight bilingual slug pairs, the approved 16 Markdown source documents, typed delivery metadata, normalized publishable bodies, asset policy, and explicit internal-link targets. It owns build-time parsing and slug-specific validation for GUIDE-01/02/03. Route/UI rendering, Guide hubs, SEO graph integration, sitemaps, and production export verification belong to later phases.

</domain>

<decisions>
## Implementation Decisions

### Source retention and delivery boundary
- **D-01:** Commit the approved 16 Week04 Markdown documents inside the repository under a typed `src/content/guides/{zh,en}/` source boundary so static builds never depend on `/Users/longnv/Downloads`. Preserve approved source bytes and filenames as the source authority.
- **D-02:** Normalize only CRLF/CR to LF, require exactly one HTML delivery-metadata comment at byte zero, and build the publishable body by removing that matched comment while preserving every remaining normalized byte, including leading blank lines. A digest check proves GUIDE-02 fidelity.

### Pair identity and metadata
- **D-03:** Use one typed eight-entry registry as the identity source for later routes, metadata, links, assets, and sitemaps. Each entry has one `zh` source and one `en` source, a unique lower-case slug, same-slug reciprocal canonical/hreflang targets, localized title/description/keywords, and an allowed schema union containing `Article`, `BreadcrumbList`, and optional `HowTo`.
- **D-04:** Compare each locale's parsed delivery metadata against its own approved source snapshot. Enforce cross-locale equality only for slug, pair membership, reciprocal hreflang shape, and schema compatibility; preserve localized H1 and metadata verbatim.

### Assets and links
- **D-05:** Preserve every source `配图需求` directive as data. The current package has no approved image files or alt-text records; blank/garbled directives (including `self-build-three-year-tco`) remain an explicit no-required-asset exception until an approved asset record exists. A configured required asset must include a repository-relative public path and authored alt text, and the validator must fail with the slug when it is missing or invalid.
- **D-06:** Treat source internal-link labels as unresolved until an explicit registry mapping supplies an owned canonical target. Do not infer URLs from labels or render placeholders. Validate every configured target against the owned route/registry inventory and emit the slug plus label for unresolved, foreign, or malformed targets.

### Validation and boundaries
- **D-07:** Keep Phase 5 server/build-only. Reuse Node built-ins, `server-only`, strict assertions, path containment checks, and SHA-256 digest checks already established in the repository; add no dependency and no client-side content fetch layer.
- **D-08:** The standalone verifier must exercise duplicate slug, incomplete pair, source/registry metadata mismatch, invalid schema token, missing required asset, unresolved internal link, malformed leading comment, and body-fidelity failures with slug-specific messages. Leave one runnable regression command for the phase.

### the agent's Discretion
- Choose the exact registry TypeScript interfaces, source filenames, parser helper names, and verifier fixture strategy while preserving D-01–D-08.
- Choose the smallest existing owned route inventory for link validation and document any source label whose approved destination remains unavailable; unresolved mappings stay build failures.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project contract
- `.planning/ROADMAP.md` §Phase 5 — phase goal, GUIDE-01/02/03 scope, and success criteria.
- `.planning/REQUIREMENTS.md` §Guide Content Contract — normative requirement text and acceptance boundaries.
- `.planning/PROJECT.md` — static-export, URL-stability, source-of-truth, and verification constraints.
- `.planning/STATE.md` — carried decisions and Phase 5 concerns.
- `AGENTS.md` — repository editing, validation, logging, and language conventions.

### Source package
- `/Users/longnv/Downloads/Week04/深度内容-第2批8篇/` — eight approved Chinese Guide documents and their delivery comments/bodies.
- `/Users/longnv/Downloads/Week04/深度内容-英文版8篇/` — eight approved English Guide documents plus the excluded GSC appendix.
- `/Users/longnv/Downloads/Week04/README.md` §五 — confirmed same-slug `/guide/<slug>` route and hreflang policy.

### Existing implementation patterns
- `src/lib/tech-center-content.ts` — server-only filesystem and content validation pattern.
- `src/content/competitor/loader.ts` and `src/content/competitor/types.ts` — typed content registry and delivery-comment boundary limitations.
- `src/content/competitor/index.ts` — registry-driven route identity pattern.
- `scripts/verify-deep-content.js` — Node assertion, source digest, asset, and link verification pattern.
- `next.config.js` — static-export build constraint.
- `src/lib/siteRouting.ts` and `src/lib/seo.ts` — owned-domain URL policy to reuse in later phases.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/content/competitor/types.ts` and `src/content/competitor/index.ts`: typed locale-pair registry shape and lookup conventions.
- `src/lib/tech-center-content.ts`: `server-only` filesystem boundary and strict repository-owned path checks.
- `scripts/verify-deep-content.js`: direct Node verifier with assertion failures, hashes, asset checks, and link checks.
- `src/lib/siteRouting.ts`: owned-domain/locale URL helpers for validating future Guide targets.

### Established Patterns
- Authored Markdown is read at build time from repository-owned directories and validated before publication.
- Build/verification scripts use Node built-ins and concise English success/error logs; no dedicated test framework is installed.
- Registry data drives static params, canonical URLs, and sitemap entries in existing content families.

### Integration Points
- Phase 6 Guide routes and SEO/sitemap code must consume the Phase 5 registry and body loader.
- Phase 7 release verification must invoke the Phase 5 verifier and inspect exported HTML.
- Public image paths, when approved, belong under `public/` and must remain available to the responsive image surface.

</code_context>

<specifics>
## Specific Ideas

- The Week04 package contains exactly eight Chinese/English article pairs; the English `附-需求依据映射（GSC英文词）.md` file is an appendix and stays outside the registry.
- All 16 documents begin with one delivery comment; the normalized body starts with the authored H1 after two blank lines.
- Four article pairs request images, three explicitly say `无`, and `self-build-three-year-tco` contains an empty/malformed image field that requires an explicit source-faithful policy.
- Source comments list internal-link labels only. The registry must carry concrete owned targets before a link is publishable.

</specifics>

<deferred>
## Deferred Ideas

- Guide hub/article rendering, responsive image components, breadcrumbs, localized metadata, structured data, and sitemap wiring — Phase 6.
- Dual-variant export matrix and initial-JavaScript release budget — Phase 7.
- Immutable artifact delivery and live domain verification — Phase 8.
- Same-slug language switcher, catalog search/filtering, CMS workflow, and new Guide articles — future requirements.

</deferred>

---

*Phase: 5-Guide Content Contract*
*Context gathered: 2026-08-17*
