# Week08 website publication

Issue: https://github.com/labring/fastgpt-home/issues/296
Initial implementation baseline: `66be9bbabf1cae1c3b8bc08ad75a3030e9738bbb`.
PR #299 preservation baseline: `3a30843bfbde9e46f27dbc35a0a4698ec8405412`.
Execution authorization: the repository owner requested implementation of issue 296 on 2026-09-08 and authorized autonomous routine implementation decisions. The resubmitted PR requires explicit user approval before merge or production publication. Keep it open for review with automatic merge disabled.

## Publication contract

The import adds 38 localized pages (19 Chinese and 19 English): 20 Guide pages and 18 Technical Center pages. Public addresses retain 32 `/guide/` identities and six `/reference/` identities. Shared Guide paths resolve through one content owner. Actual published locales determine language navigation and metadata.

Ten stage lists define 797 unique return relationships (447 Chinese and 350 English). At this delivery, existing article files remain byte-identical; the server loader supplies one designated return entry. `src/content/week08/publication.json` records the original delivery hashes and preservation hashes. The explicit batch acceptance and bounded-live commands use `scripts/verify-week08-content.js`; its HTML checks reuse the Guide and Technical export checks.

## Source corrections

Reference tables use public FastGPT development snapshot `5957d06807ff7f984c70c6425c8d0fc40eb1714d`, dated 2026-09-07. The verified inventory is 137 environment variables, 124 error codes across 15 modules, and 34 active workflow nodes. The delivery omitted `modelUnExist`, `readFiles` and `variableUpdate`; node parameter counts now include shared array entries. Required counts explicitly describe directly declared flags. Development definitions can precede stable releases.

`src/content/week08/reference-snapshot.json` records the snapshot, source hashes and node counts. `src/content/week08/publication-corrections.json` records exact, evidence-supported operational edits in eight localized Guide pages. The importer fails when the corresponding original claim changes. The corrections cover isolated restore targets, backup-compatible versions, proxy-only health checks, TLS verification, offline GitHub settings, edition-specific migrations, migration preconditions and postconditions, skipped Sandbox records, and compatible rollback images/data. Reader-facing references link to the supporting public documentation and source.

## Maintenance and batch evidence

The publication manifest records the original delivery. Current Guide registry snapshots and Technical article metadata determine modification dates; current registry identities determine published languages. Daily releases run the existing Technical source check for unique owners, same-language stage links, overview links and complete reverse mappings. Existing Guide and Technical export checks validate the current language set, schema dates, visible body links against exported routes, and exactly one correctly targeted stage return. Guide Preview checks cover every current registry entry. Date, translation and navigation regressions use isolated fixtures. Explicit authored `schema_type` metadata enables destination checks against the export, including the existing Preview Worker locale fallback. Legacy imports retain visible-link and designated-return checks; generated TOC links must resolve to rendered heading IDs. The operational corrections above remain in the articles.

Preservation is a one-time comparison between the manifest's full base commit and a full candidate commit, with every recorded hash checked against the base Git blob. The importer retains that evidence instead of recalculating it from working-tree bytes. Run the preservation command for the publication candidate; routine content releases use the source/export gates. A later body revision can legitimately differ from this delivery's preservation evidence.

The 404 regression renders the actual page, loader and recovery component using React and Next's pathname context. It substitutes the browser loading boundary and unrelated visual leaves, and fails when the recovery component returns null. Browser cold-load and navigation checks remain separate from this Node test. Reference-description corrections match the exact English page and approved complete description, rejecting changed input; numeric body corrections target count phrases and node table rows.

## Verification

Run daily verification from the repository root:

```sh
npm run verify:release
```

Week08 import reproduction, initial counts, preservation and production HTTP acceptance remain explicit batch commands. They are absent from the daily release dependency chain:

```sh
node scripts/import-week08-content.js /path/to/Week08 --check
node --test scripts/import-week08-content.test.js
node scripts/verify-week08-content.js
# Run against the matching completed export.
node scripts/verify-week08-content.js --export
node scripts/verify-week08-content.js --preservation "$(git rev-parse HEAD)"
node scripts/verify-week08-content.js --live cn
node scripts/verify-week08-content.js --live io
```

The full release gate requires a case-sensitive filesystem. It verifies source, lint, TypeScript, and all three static exports with existing FAQ, Guide, technical-content, customer, routing, hygiene and SEO checks. The existing CI workflow records the exact revision and uploads `.release-artifacts/release-verification.json` with export evidence.

The preceding PR #299 review revision passed the complete local source gate, including lint and TypeScript. Regression checks cover date updates, an added translation, revised operational wording, unrelated numeric input, absent recovery rendering, and import application followed by reimport. Applying the real Week08 delivery to a temporary repository and reimporting produces 45 byte-identical files. All 797 original bodies match the PR preservation baseline. Full export results are recorded for the new PR head by CI.

The following results describe earlier candidates. Local source checks passed. The complete script test invocation passed 201 of 202 checks; the remaining sidebar check requires a completed `out/` export and runs in every production build. The case-sensitive local build compiled and typechecked, then exhausted available host disk space during static generation. CI is the full-export authority for this revision; this local attempt is recorded as an environment failure, not a passing export.

Revision `bba9fa88` completed all three static builds and all Week08 export checks in [release verification 34233090902](https://github.com/labring/fastgpt-home/actions/runs/34233090902); its only three failures were the existing P1 homepage budget (261.0 KiB gzip per variant, 260 KiB limit). Docker runtime verification passed. Inspection found that `FadeIn` dynamically indexed the complete 164-tag motion namespace. Static references to its four supported tags removed unused component initializers. Same-environment selective homepage builds measured 260,207 → 256,904 bytes gzip (3,303 bytes saved); these diagnostic builds include full-project type checking, while the full CI exports remain the acceptance authority. The optimized static homepage passed browser rendering and FAQ interaction checks with zero browser errors. The existing P1 gate retains its original limit.

Both CRM preview configurations passed in [build 34233090962](https://github.com/labring/fastgpt-home/actions/runs/34233090962), deployed as [preview 1b26f446](https://1b26f446.fastgpt-home.pages.dev) by [deployment 34236834980](https://github.com/labring/fastgpt-home/actions/runs/34236834980). Fresh static-preview checks verified unknown Guide recovery, the Chinese-only image-stage article recovery and its reachable destination, and the two published workflow-reference languages, with zero browser errors. The preceding content-equivalent preview also passed all 839 HTTP page, return-link and index checks; its local evidence is `.release-artifacts/week08-preview-9b/verification.json`.

Browser review uses the CRM-disabled preview configuration. Browser checks passed for the deployment matrix, restore drill, issue landscape, 146-article container stage list, and workflow-node reference at desktop widths of 1280/1440 and a 390×844 mobile viewport. Page width stayed within the viewport; wide tables scrolled independently with visible keyboard focus. Heading targets resolved, including Chinese anchors. The container list → existing PgVector article → container list → landscape loop completed. Consultation retained utm_source and utm_campaign; the preview form disabled submission. Trial links retained the shared visitor identifier/event and pricing targeted the localized page. Missing English image-stage and Japanese reference requests exposed only published variants; unknown Guide requests recovered to the correct preview hubs. A pre-hydration recovery-script mutation was reproduced and replaced with a React-owned client recovery component; fresh checks reported zero browser errors. Screenshots and DOM observations are retained in the implementation task; final deployment results belong in the release evidence.

## Deployment and recovery

After explicit user approval to merge and publish, deploy the successfully verified revision through the existing China Docker/Nginx channel and the International Cloudflare Pages production project. Confirm the International project and production branch through its authenticated platform configuration. Retain each previous deployment before changing production. Record deployment identifiers and run both bounded-live checks; each checks 19 new pages, its complete old-article return set, and both content indexes. Publication is complete only after both owners pass. If rollout fails, use the existing channel's previous deployment and repeat acceptance.
