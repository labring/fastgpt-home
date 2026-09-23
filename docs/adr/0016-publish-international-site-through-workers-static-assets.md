---
status: accepted
---

# ADR 0016: Publish the International Site through Workers Static Assets

## Context

ADR 0007 assigns Cloudflare Pages to the International Site and Preview Hosts. The International Site already exports a generated Worker for the URL Alias Authority projection. Workers Static Assets can publish that Worker and the complete static export as one release unit while preserving the China Site's Docker/Nginx path and the Preview Hosts' Pages path.

## Decision

- Publish the International Site through a dedicated `fastgpt-io-worker` configured with the generated `out/_worker.js`, the complete `out/` export, and the `ASSETS` binding.
- Run the Worker before Static Assets so permanent redirects, query preservation, deterministic redirect order, and locale fallback retain their current request order.
- Write `.assetsignore` into the export and exclude `_worker.js` from the public asset namespace.
- Use Wrangler 4.136.3, with 4.34.0 as the minimum supported version. The release verifier checks the exported Worker, asset count and largest file, then runs the Worker over Wrangler's local HTTP server before accepting the artifact.
- Run a manually triggered release workflow from `main`. It runs `verify:release` for the `io` Site Variant, verifies the sealed artifact, and deploys that artifact to `workers.dev` with the existing Cloudflare API token and account ID conventions.
- Keep the URL Alias Authority bundle, static export, Wrangler configuration, artifact digest, and deployment verification evidence together. Retain the current Pages deployment as the rollback source throughout the workers.dev behavior comparison.
- Keep the China Site on Docker/Nginx and Preview Hosts on Cloudflare Pages. Custom Domains and DNS cutover for `fastgpt.io` require a later release decision.
- Gate asset count at the Workers Free limit of 20,000 files and each file at 25 MiB. Raise the count ceiling after the release account's plan is recorded.

## Consequences

Worker-first handling invokes the Worker for every request. This preserves redirect-before-asset behavior for the first comparison release; a later release can narrow Worker routing after equivalent behavior is established.

The first deployment is reachable through `workers.dev` while production DNS continues to serve the retained Pages publication. A failed comparison can return to Pages without changing the China Site or Preview Host paths.

## Alternatives considered

- Keeping Pages as the long-term International Site publication path leaves the existing Worker projection and static export under separate deployment contracts.
- Moving to SSR or OpenNext adds a runtime and content path beyond the current static export contract.
