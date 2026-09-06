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

- [PR #281 verification](https://github.com/labring/fastgpt-home/actions/runs/34030953888) passed all 68 source/export steps, CN/IO/Preview production builds, and the separate Docker runtime job.
- The run targets PR head `150756a466a90ebae97817df6877909b6b927d56` and checks out merge revision `da57e589ddf22d188bc5e5d2967023b0ab80921c`. Both revisions have the exact tree `34216302fc91ce70956e0b4bd8895b60e044afc4`.
- PR #281 remains open. Merge and production publication require the user's explicit approval; live verification follows an approved release.

## Standards review

The review found no documented-standard violations. Three duplication findings were simplified during this review:

- G2's 15-item baseline now reuses the existing G1 baseline and G1 slugs. Order, uniqueness, identity digests, and complete G1/G2 verifier results remain identical.
- Current Guide test counts come from the approved `policy.entryCount`; fixtures continue to come from the registry. The missing-entry negative case checks that the registry still meets that independent count. The one-use `projectedRegistry` alias was removed.
- The standalone IO inventory test duplicated the IO branch of the existing IO/CN matrix. The matrix retains those assertions and checks the generated article count.

## Spec review

The 958 added technical identities and seven added Guide pairs match all 972 unique inventory URLs and targets: 759 CN and 213 IO. Existing technical and Guide registry entries remain identical. The stale pending-build statement above now points to evidence for this PR.

The comparison-route adapters remain necessary for the three migration articles sharing `/compare` with competitor pages. The existing site-variant cleanup removes the IO Chinese seed. Application routes, content, public assets, dependencies, and build configuration remain byte-for-byte identical to the verified PR tree.

## Ablation evidence

| Change tested | Observed result | Decision |
| --- | --- | --- |
| Reuse the G1 baseline in G2 | Complete G1/G2 results deep-equal the saved baseline, including digests | Keep simplification |
| Derive current counts and remove the duplicate IO test | 46 remaining regressions pass; missing/duplicate entries and missing/extra export pages remain rejected | Keep simplification |
| Remove G1 historical count scope | `Guide registry count differs from G1 release result` | Keep scope |
| Remove G2 historical count scope | `G2 result counts differ` | Keep scope |
| Remove FastGPT credential redaction | A synthetic credential survives in the normalized public body | Keep redaction |

Negative controls were compiled in memory from the current modules; the credential fixture used a temporary directory. The baseline suite passed 47 tests. The retained suite passes 46 after deleting the duplicate test. All 30 source-only release checks pass, including lint and TypeScript. The three code/test files have a net reduction of 14 lines. This local pass reuses the original PR's build evidence for the unchanged application; it performs no new production build.

Reproduce the retained verification from the repository root:

```bash
node --test scripts/verify-guide-content.test.js scripts/verify-guide-export.test.js scripts/verify-guide-release.test.js scripts/verify-guide-g2-release.test.js scripts/verify-technical-content.test.js scripts/verify-technical-export.test.js
npm run verify:release -- --source-only
git diff --check
```
