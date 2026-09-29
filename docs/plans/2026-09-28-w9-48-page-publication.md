# W9 Guide and Reference publication

Status: Implementation complete on 2026-09-28. Publication follows the existing
pull-request checks and main-branch release workflows.

## Scope

Publish the 48 non-Industry W9 language pages from
`/Users/longnv/bin/repo/fastgpt-data/W9-内容交付-完整版-20260916`.

| Family | Simplified Chinese | English | Route |
| --- | ---: | ---: | --- |
| Deep content | 4 | 4 | `/guide/` |
| Scenario solutions | 8 | 0 | `/guide/` |
| Decision matrices | 8 | 8 | `/guide/` |
| Issue overviews | 6 | 6 | `/guide/` |
| Reference data | 2 | 2 | `/reference/` |
| Total | 28 | 20 | 48 language pages |

Public HTTP checks on 2026-09-28 found 46 targets returning 404 and two returning
200: the Chinese and English versions of `/guide/deployment-issue-landscape`.
Those two pages are updates. Preserve their canonical paths and original
publication date, `2026-09-08`.

## Established constraints

- Reuse existing article routes, Markdown loading, content indexes, locale
  ownership, SEO helpers, search generation, and the root sitemap.
- Keep Industry content and external distribution outside this batch.
- Keep publication tracking outside runtime code; retain the existing
  Markdown-and-index model recorded in ADR 0008.
- Preserve each page's actual Published Locale Set, including translations from
  earlier batches. Chinese pages belong to `fastgpt.cn`; English pages belong to
  `fastgpt.io`.
- Preserve customer names, outcome metrics, substantive context, and caveats.
  Store delivery provenance and verification workflow in existing non-rendered
  metadata. Public references use descriptive HTTPS citations.
- Guide articles show a localized modification date under the existing content
  hygiene contract.

## Findings that affect publication

The existing Technical Center pipeline can own all 48 page identities, including
the 44 `/guide/` pages. Its entries drive Technical Center discovery and the
sitemap; the Guide hub currently lists its separate Guide registry. That registry
requires complete Chinese/English pairs, while this delivery includes single-locale
pages.

Content preparation is required: 16 pages lack descriptions, the eight scenario
descriptions are truncated, all 48 lack publication/modification date fields, and
visible verification notes need metadata placement. The Chinese model-routing
matrix has mismatched column counts.

Verified factual issues include classification-confidence settings absent from
the cited product template, media base64 conversion described as a confidentiality
control, and an English overview coverage total of 90 against a table sum of 440.
The overview updates also replace existing conversion links with plain text;
preserve the working links during the update.

All Guide targets in the two overview documents resolve when the existing
Technical Center entries, Guide registry, and W9 batch are considered together.
Preserve these links and verify their rendered destinations during export.

## Accepted decisions

1. Discovery: use the existing Technical Center list/search and article links.
   Preserve the Guide and Reference canonical paths.
2. Editorial responsibility: correct verified product inaccuracies, align
   Chinese/English content, and include the content diff in release review.

## Verification and completion

Reuse the current source and production-export checks for both `cn` and `io`.
Validate all 48 rendered identities, metadata, actual language alternates,
modification dates, internal links, sitemap membership, and public-body hygiene.
Successful production publication means all 48 owner URLs serve the accepted
content with HTTP 200 and matching canonical metadata.

Follow the existing main-branch publication paths: the China Site release
workflow and International Site Cloudflare Pages deployment. A successful
Cloudflare Pages check on upstream main was verified on 2026-09-28. The separate
Worker workflow targets `workers.dev`; changing production hosting stays outside
this content batch. Verify the production domains after deployment, since a
successful preview or hosting-provider build alone does not establish that the
accepted content is live on its canonical URLs.

## Implementation and source verification

Imported 46 new pages and updated the two existing deployment overviews. The
existing Technical Center index now contains 5,095 language pages. Added 254
member-to-stage return links, bringing the existing mapping to 1,051 entries.
Chinese and English stage overviews now report the verified member sets of 611
and 440 documents respectively.

Corrected product claims against the cited FastGPT and plugin versions: retrieval
settings, classification and extraction nodes, business-system responsibilities,
storage persistence, log retention, share authentication, model routing, knowledge
base update APIs, resource permissions, MCP connection state, and upgrade
migration scope. Preserved named customer cases, outcome metrics, and their
context. Added public source citations and restored actionable conversion links.

Reused the current Technical Center index for modification dates and its existing
article styling for the localized date display. Extended the current importer and
export regression checks to cover date preservation, invalid dates, metadata
drift, missing dates, and incorrect date localization. Updated the existing 404
recovery regression to reflect the newly published English stage page.

The complete source release check passed, including content hygiene, regression
checks, lint, and TypeScript. All 72 Markdown tables have consistent column counts.
Checked 551 authored internal links against the existing content identities and
localized the 46 Chinese FAQ links for preview and production routing. Production
export and live-domain results belong to the associated pull request and release
runs.
