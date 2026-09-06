# Week07 publication verification

## Scope

- 958 technical pages: 752 Chinese and 206 English, including three Chinese migration articles.
- Seven bilingual Guide pairs: 14 public owner pages.
- Total: 972 canonical URLs, 759 on fastgpt.cn and 213 on fastgpt.io.
- Ordered source-to-page mapping: [publication-inventory.csv](publication-inventory.csv).

## Source evidence

- Reused `scripts/import-technical-content.js` with normalized temporary JSON delivery inputs.
- Preserved all existing technical identities and all Week07 canonical paths.
- Corrected heading hierarchy in 40 English articles and added scope to 137 historical release articles.
- Applied 99 issue corrections after verifying 198 unique replacement anchors against the original delivery.
- Rewrote seven Guides in Chinese and English and three migration articles using first-party sources.
- Independent fact review accepted all 17 rewritten documents; research notes contain source links and hashes.
- `npm run verify:release -- --source-only`: passed after bounding historical G1/G2 counts to their release identities.
- `node scripts/verify-guide-content.js`: 23 slugs, 46 documents passed.
- `node scripts/verify-technical-content.js`: 4,965 pages passed.
- `node scripts/verify-content-hygiene.js --mode source`: 5,131 source files passed after final corrections.
- Guide source/export and technical source/export regressions passed; Markdown and historical release regressions passed.
- `npm run prebuild`: passed.
- 141 distinct technical documentation/release source URLs returned HTTP 200 with curl, following redirects. The initial Node fetch pass encountered local connection failures; curl provided the successful HTTP evidence.
- FastGPT credential-shaped examples are redacted by the shared importer and rejected by source verification; import and stored-body regressions passed.
- Repaired shell line continuations in two historical curl examples.
- `git diff --check`: passed.

## Release evidence

Complete case-sensitive CN, IO, and Preview builds, production deployment, and live URL verification are pending.
