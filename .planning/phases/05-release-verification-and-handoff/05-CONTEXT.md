# Phase 5: 整批发布验收与交接 - Context

> Discussion captured in autonomous mode on 2026-08-04. This context defines the final evidence package and publication gate.

## Phase Goal

Produce one release handoff that enumerates all 64 new content items and 2,100 legacy repair items, connects each item to its source version, URL, batch, and result, and records the exact automated, manual, online, and rollback evidence. The release status is determined by the strictest open gate.

## Locked Decisions

- The 60 W2 Chinese FAQ records are enumerated from `artifacts/phase1/faq-source-baseline.json` and use canonical `https://fastgpt.cn/zh/faq/{slug}` URLs.
- The four competitor pages are enumerated from `artifacts/phase3/competitor-pages-manifest.json`. Their static pages remain preview pages while product, sales, and legal signoffs are pending.
- The 100 Meta rows and 2,000 category rows remain separate arrays in the handoff. Meta records keep their source URLs and report matched/unresolved status; category records keep their source URLs, category IDs, identity status, confidence, review flag, and full-batch dry-run result.
- A release gate requires all item-level blockers to be resolved, the case-sensitive deployment build to pass, browser evidence to be captured, and live URL reachability to be checked. The current handoff therefore has `blocked` status with explicit evidence rather than a false published claim.
- Phase 2's macOS case-insensitive route count gap and the existing P0 `og:image` check are recorded as environment/regression findings. The case-sensitive CI build is the exact-set authority.
- Rollback instructions point to the immutable Phase 4 batch artifacts. The category full batch has zero writes; any future allowlist batch must provide its own batch ID, snapshot, and matching rollback.

## Verification Contract

1. Handoff item arrays contain exactly 60 + 4 new content items and 100 + 2,000 legacy repair items.
2. Source SHA-256, source versions, URLs, batches, status, and result fields are present for every item.
3. Gate summary matches the underlying Phase 2, Phase 3, and Phase 4 artifacts.
4. A release verifier rejects count drift, hidden failures, published status for unsigned compare pages, or nonzero full-batch category writes.
5. The final report includes commands, commits, build evidence, manual/online pending evidence, blockers, and rollback steps.
