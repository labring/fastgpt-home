# Build optimization verification — issue 303

## Independent delivery and rollback

1. `51f1bd50` changes only HTML hygiene processing and its regression/evidence. Revert that commit to restore the serial checker without changing its CLI or publication policy. The same complete 8,546-file export measured a 195.494-second baseline median and a 72.795-second optimized median (62.76% reduction); 81 regression checks and 200,000 projection/offset comparisons passed. Measurements use Node v24.13.0 on local case-sensitive APFS, not the hosted CI runner.
2. `d1c37b10` introduces whole-PR CRM selection and merge-result previews. The public CLI regression covers content additions/deletions, both rename endpoints, mixed/code-bearing input, unknown input and manual runs. The real consultation-form harness covers disabled rendering/zero requests, configured success/failure/retry, attribution and production configuration errors. Revert this commit to restore unconditional two-profile Preview builds.
3. `3b9a67a9` introduces ordered content lookup, render-scoped article reuse and isolated compiler caches. Complete ordered technical/FAQ comparisons and actual React-server read-count/freshness checks passed. Full CN, IO and Preview release verification passed before artifact reuse was introduced; see `build-optimization-phase3-evidence.json`. Revert this commit to restore the prior lookup/read/build-cleaning behavior.
4. The artifact-reuse change retains complete successful exports, alias authority, runtime files, identity and verification records. Revert the phase-four commits together to restore the preceding build/delivery workflow. Production rollback still restores the previous immutable image digest, now containing the complete verified publication unit.

## Supported verification and handoff

- Safe local aggregate: `npm run build`; complete release gate: `npm run verify:release` on a case-sensitive filesystem.
- Shared source producer: `npm run verify:release -- --source-only --write-source-record source.json`.
- Isolated producer: `npm run verify:release -- --variant preview --reuse-source source.json --keep-artifacts`.
- Sealed publication: `.release-artifacts/site/<variant>-<crm-mode>/`. Its manifest identifies the exact checkout, lockfile, actual Node/platform/architecture, all effective public settings and CN document/cloud host policy. Payload inventory includes all exported files, verification evidence and applicable alias/runtime files.
- Public handoff check: `node scripts/verify-site-artifact.js --bundle BUNDLE --identity EXPECTED_INPUTS.json`. The consumer derives expected inputs independently. Tampered/missing/extra files, symlink roots, mismatched identity and failed evidence are rejected. Failed replacement preserves the previous unit.
- CN packaging: `docker build --file Dockerfile --tag verified-cn BUNDLE`. The image performs no site generation. Run `node scripts/verify-url-alias-blackbox.js --variant cn --image verified-cn --out-dir BUNDLE/payload/out` to compare the full extracted image inventory, runtime files and identity; validate Nginx; and check aliases, queries, terminal pages, 404 responses and security headers.
- Source-archive aggregate: `docker build --build-arg BUILD_SOURCE_REVISION=$(git rev-parse HEAD) --file Dockerfile.verify --tag fastgpt-guide-release-verify .`.

Preview publishes shared source evidence immediately after that gate succeeds. The separate PR-triggered Guide workflow waits for the same PR/merge/head identity and consumes it, preserving native PR compilation-cache scope. Preview completion never waits for Guide, CN or IO. Content-only PRs produce one disabled Preview plus CN/IO identities; code/unknown/manual coverage also produces configured Preview. Both Preview profiles retain complete bundles for 90 days; deployment selects the disabled bundle. Production builds its actual revision/settings once, verifies the packaged image, and pushes that same tested image.

## Measurement boundaries

The recorded local phase-one checker experiment meets the 50% median reduction target. Phase-three full build durations were CN 228.985 seconds, IO 78.677 seconds and Preview 291.035 seconds; each passed all existing final-export gates. These are single local release builds, not cold/warm CI medians.

Hosted CI acceptance must record queue time, source/producer job time, artifact upload, deployment, first successful Preview HTTP check, release time and summed runner duration separately. The content-only Preview target remains a hosted-CI median of at most 15 minutes. Three cold and three compatible-cache runs, edit/delete/rename/batch/shared-component scenarios and actual container results must be attached to the delivery review; do not infer those results from local checker timings. A Preview deployment workflow change takes effect from the default branch under the existing privileged workflow boundary.
