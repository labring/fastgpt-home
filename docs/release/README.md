# Website verification

`npm run verify:release -- --keep-artifacts` runs source checks and complete CN, IO, and
Preview builds. It writes command outcomes, build durations, failures, and static-export
inventories to `.release-artifacts/release-verification.json`. `--source-only` runs the
source checks on development machines; full export requires a case-sensitive filesystem.

The verification workflow runs the same command on Linux. Production publishing uses the
existing image workflow and Kubernetes rollout. External Solutions and documentation HTTP
checks run separately against explicitly supplied targets.

## Documentation host owner-routing evidence

`npm run verify:documentation-host -- --cn-target <https-url> --io-target <https-url> \
  --contract scripts/fixtures/documentation-host-contract.json --output <json>` runs the
external docs black-box contract with production targets supplied by the release operator. The
contract checks owner HTTP 200/self-canonical pages, direct cross-host 301s with query
preservation, reciprocal `zh-CN`/`en` hreflang, owner robots/sitemap signals, and the 203-path
English audit sample. Responses are captured under `<output-basename>-responses/`.

Pass `--rollback-input <json>` to provide the tested host-scoped rollback unit when it is kept in
a separate release artifact. The contract fixture records the previous revision and restore paths;
the runner never assumes an external docs production target.

## Technical content

Technical pages are authored in `src/content/tech-center/`. The article registry is
`src/components/tech-center/entries.json`; the Chinese and English search indexes are
`public/tech-center/search-index.json` and `search-index.en.json`.

```bash
npm run verify:technical-content
npm run verify:technical-content-regression
npm run verify:technical-export-regression
npm run build
```

Source verification checks every indexed body, normalized unique route, public source URL,
and locale search projection. The completed export checks owner routes, canonical URLs,
hreflang, robots, sitemap coverage, redirects, and the Technical Center JavaScript budget.
Git records content revisions and batch history.

Stage pages declare `page_type: Issue list` (English) or `page_type: 问题清单聚合页`
(Chinese) in front matter. `stage_members_heading` selects one exact level-two heading
whose section contains one pipe table. Each data row's first cell links to one member;
`src/content/tech-center/stage-returns.json` supplies its designated return. Keep the
selector aligned when editing that heading. Other sections and table columns can contain
ordinary references. Source checks enforce membership, same-language targets and unique
owners; completed-export checks verify visible links and destination reachability.

An explicit JSON or XLSX delivery can be imported with
`npm run import:technical-content -- --write --source <delivery-directory>`.
Use `--check` in place of `--write` to compare the delivery with committed content.

Production uses the existing image workflow on upstream `main`. It builds from the triggering
commit, deploys the returned image digest, waits for Kubernetes rollout, and restores the
previous image when rollout fails. PR workflows verify CN, IO, Preview, and the Docker runtime.

## Customer migration release evidence

`npm run verify:customer-migration-release -- --contract <json> --output <json>` runs the
manifest-derived 231-source contract against both the approved preview and production origins.
The release contract records the repository revision, approved origin pair for each environment,
the tested previous ingress revision and migration digest, and a 72-hour observation containing
404, 5xx, redirect, canonical, and crawl-file metrics. The runner retains response headers and
metadata in the JSON output and response bodies in `<output-basename>-responses/<environment>/`.

Use `scripts/fixtures/customer-migration-release-contract.json` as the reproducible contract
shape. Replace its environment targets and observation values with the release-approved inputs,
then retain the JSON output and response directories as the production evidence bundle.

## Delivery evidence lifecycle

Retire a one-time importer and its batch ledgers after retaining the raw inputs, immutable
base and candidate revisions, executable checkout, reproduction commands and successful
initial acceptance. Verify restoration from the archive before removing the files. Keep
execution logs and source hashes with that evidence; maintain current articles, registries,
route rules and source/export checks in this repository. Run historical tools from their
original checkout so relative imports and repository-root paths keep their meaning.

For PR #299, the archive is `fastgpt-data/Week08/pr299-retirement-evidence/` in the owner's
content-data workspace. It includes all 38 original inputs, a self-contained Git bundle,
seven retired files, reproduction instructions, checksums, preservation results and the
review experiment. Its source revision is
[`405b02ff210b90cac0b5e4a19660c5fdb044f800`](https://github.com/yangchuansheng/fastgpt-home/tree/405b02ff210b90cac0b5e4a19660c5fdb044f800).
Retrieve that archive for initial or post-publication acceptance; daily verification uses
`npm run verify:release`. Preserve the archive through production acceptance and any later
audit retention period. Existing Week06 release gates have a separate retirement scope.

PR #299 requires explicit owner approval before merge or production publication, with
automatic merge disabled. After approval, use the existing image workflow and record the
candidate image digest plus the previous known-good digest. Run the archived bounded-live
checks from the acceptance checkout after deployment and retain their results there. Roll
back by restoring the previous image digest and verifying the rollout and affected routes.
