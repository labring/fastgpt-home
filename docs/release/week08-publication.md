# Week08 website publication

Issue: https://github.com/labring/fastgpt-home/issues/296
Baseline: `66be9bbabf1cae1c3b8bc08ad75a3030e9738bbb`.
Execution authorization: the repository owner requested implementation of issue 296 on 2026-09-08 and authorized autonomous routine decisions. Production acceptance remains conditional on successful release verification and both established deployment channels.

## Publication contract

The import adds 38 localized pages (19 Chinese and 19 English): 20 Guide pages and 18 Technical Center pages. Public addresses retain 32 `/guide/` identities and six `/reference/` identities. Shared Guide paths resolve through one content owner. Actual published locales determine language navigation and metadata.

Ten stage lists define 797 unique return relationships (447 Chinese and 350 English). Existing article files remain byte-identical; the server loader supplies one designated return entry. `src/content/week08/publication.json` records the original delivery hashes and preservation hashes. Source, static-export and bounded-live checks share `scripts/verify-week08-content.js`.

## Source corrections

Reference tables use public FastGPT development snapshot `5957d06807ff7f984c70c6425c8d0fc40eb1714d`, dated 2026-09-07. The verified inventory is 137 environment variables, 124 error codes across 15 modules, and 34 active workflow nodes. The delivery omitted `modelUnExist`, `readFiles` and `variableUpdate`; node parameter counts now include shared array entries. Required counts explicitly describe directly declared flags. Development definitions can precede stable releases.

`src/content/week08/reference-snapshot.json` records the snapshot, source hashes and node counts. `src/content/week08/publication-corrections.json` records exact, evidence-supported operational edits in eight localized Guide pages. The importer fails when the corresponding original claim changes. The corrections cover isolated restore targets, backup-compatible versions, proxy-only health checks, TLS verification, offline GitHub settings, edition-specific migrations, migration preconditions and postconditions, skipped Sandbox records, and compatible rollback images/data. Reader-facing references link to the supporting public documentation and source.

## Verification

Run from the repository root:

```sh
node scripts/import-week08-content.js /path/to/Week08 --check
node --test scripts/import-week08-content.test.js scripts/verify-guide-markdown.test.js
npm run verify:release
node scripts/verify-week08-content.js --live cn
node scripts/verify-week08-content.js --live io
```

The full release gate requires a case-sensitive filesystem. It verifies source, lint, TypeScript, and all three static exports with existing FAQ, Guide, technical-content, customer, routing, hygiene and SEO checks. The existing CI workflow records the exact revision and uploads `.release-artifacts/release-verification.json` with export evidence.

Local source checks passed. The complete script test invocation passed 201 of 202 checks; the remaining sidebar check requires a completed `out/` export and runs in every production build. The case-sensitive local build compiled and typechecked, then exhausted available host disk space during static generation. CI is the full-export authority for this revision; this local attempt is recorded as an environment failure, not a passing export.

Browser review uses the CRM-disabled preview configuration. Cover the deployment matrix, restore drill, issue landscape, 146-article container stage list, and workflow-node reference at 1440×900 and 390×844; inspect table focus/overflow, headings, actual-language recovery, navigation loops, and conversion destinations. Final browser and deployment results are retained with the release evidence.

## Deployment and recovery

Deploy the successfully verified revision through the existing China Docker/Nginx channel and the International Cloudflare Pages production project. Confirm the International project and production branch through its authenticated platform configuration. Retain each previous deployment before changing production. Record deployment identifiers and run both bounded-live checks; each checks 19 new pages, its complete old-article return set, and both content indexes. Publication is complete only after both owners pass. If rollout fails, use the existing channel's previous deployment and repeat acceptance.
