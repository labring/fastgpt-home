# Phase 8: Production Delivery & Live Verification - Research

**Researched:** 2026-08-17
**Status:** Ready for planning

## Executive findings

- The repository has a real CN production channel: `.github/workflows/fastgpt-home-image.yml` builds `Dockerfile`, pushes timestamped/latest GHCR tags, and updates `deployment/fastgpt-home` through Kubernetes. It records neither an OCI digest nor the previous image reference.
- The repository has a real Cloudflare Pages preview channel: `preview.yml` builds an IO export and `preview-deploy.yml` runs `cloudflare/wrangler-action@v3`. No production IO workflow, release manifest, purge step, or rollback record exists.
- ADR-0007 fixes the provider split: CN remains Docker/Nginx/Kubernetes and IO remains Cloudflare Pages. A new central hosting layer would add operational dependencies without closing the current two-provider gap.
- Public probes on 2026-08-17 returned `404` for `/guide` and `/guide/saas-platform-enterprise-gaps` on both `https://fastgpt.cn` and `https://fastgpt.io`; both `sitemap.xml` endpoints returned `200`. This is baseline evidence and cannot be reported as a successful Guide deployment.

## Artifact packaging

Use a dependency-free Node script around the existing case-sensitive `npm run verify:release` gate. Package only an already-verified `out/` tree per variant. Inject `__release/manifest.json` before publishing; the manifest should include a schema version, variant, source commit, build timestamp, expected host, exact Guide routes, tree SHA-256, deployment revision, rollback target, and provider. Emit a content-addressed archive name plus a SHA-256 sidecar and JSON evidence record. Avoid embedding the archive's own hash inside the archive; the tree digest is the stable in-manifest identity and the archive digest belongs in the sidecar/evidence record.

The existing Linux workflow uses Node 24 and npm lockfile installs. The existing `Dockerfile.verify` provides a container-local case-sensitive fallback. Reuse `node:24` and native `crypto`, `fs`, `path`, `child_process`, and `tar`; add no dependency or lockfile change. Packager tests should use temporary output roots, cloned registry expectations, archive extraction/listing, checksum mismatch, missing manifest fields, wrong variant, and traversal-safe route cases.

## CN delivery

The CN image can remain on the current `Dockerfile`/Nginx channel with release build arguments. The production workflow should build and push a commit-addressed image, capture the `docker/build-push-action` digest, and set Kubernetes to the digest-pinned reference. Capture the current Deployment image before mutation as the rollback target; apply `kubectl set image`, wait for `kubectl rollout status`, and write the digest plus previous reference to the release evidence. The image's static output needs the release manifest injected during the builder stage when release arguments are present. Existing legacy image workflow can remain source-compatible while the new release workflow owns DEPLOY-01 evidence.

## IO delivery

Cloudflare's current Wrangler Pages command supports direct production upload with `wrangler pages deploy <directory>`, a `--commit-hash` flag, and `pages deployment list --json`. Use the project name/account/token from CI configuration, capture the previous production deployment before upload, deploy the packaged IO `out/`, then query the deployment list for the new ID/URL. Preserve the previous ID as the explicit rollback target. Cloudflare Pages direct upload is the existing preview pattern; only the branch/production environment and release evidence are new.

Official references:

- [Wrangler Pages commands](https://developers.cloudflare.com/workers/wrangler/commands/pages/) — `pages deploy`, `pages deployment list --json`, and deployment flags.
- [Cloudflare Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) — production direct-upload flow and deployment listing.
- [GitHub artifact digest documentation](https://docs.github.com/en/enterprise-cloud@latest/actions/tutorials/store-and-share-data) — `upload-artifact` returns a SHA-256 digest validated by `download-artifact`.
- [GitHub artifact attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations) — digest-pinned container provenance when registry permissions allow it.

## Cache and live evidence

`public/_headers` already assigns one-hour HTML `Cache-Control` plus stale-while-revalidate for Cloudflare Pages. `nginx.conf` assigns the matching HTML policy and exposes `X-Cache-Status` for CN. A provider purge command should be explicit and credential-guarded: Cloudflare URL purge requires a zone/token configuration; CN's upstream cache owner is currently not identified in the repository and must be recorded as an external prerequisite. The live verifier should therefore record cache headers and provider status on every response and fail when required freshness evidence is absent.

Implement the live matrix with Node's native `fetch`/`URL` and a bounded timeout. For each domain, check `/guide`, eight article paths, `/sitemap.xml`, and `/__release/manifest.json`. Parse HTML for final 200, localized H1, self canonical, exact `zh-CN`/`en`/`x-default` alternates, indexability, and route presence in sitemap. Parse the public manifest for matching variant, source/deployed revision, tree/artifact identity, and rollback target. Persist one JSON report with timestamps, response headers, per-surface results, and `blocked`/`passed` status. A missing credential or a 404 live route remains a blocking result.

## External blockers

- IO production Pages project name, account ID, API token with Pages write permission, and production branch/environment are not present in the repository.
- Cloudflare purge authority (zone ID and token scope) is absent.
- CN Kubernetes namespace/context, deployment write permission, previous immutable image digest, and upstream cache invalidation owner are absent.
- Public production domains currently serve no Guide routes, so DEPLOY-02 cannot pass before a real deployment.

## Planning implications

Plan in three waves: (1) artifact/manifest packager and native tests; (2) provider workflow, Docker manifest injection, purge/revision recording, and release evidence; (3) dependency-free live verifier, baseline report, and workflow wiring. Keep provider mutation guarded by required secrets and explicit rollback inputs. A source build and an existing domain response provide evidence inputs, not production success.

---

*Phase: 8-production-delivery-live-verification*
*Research completed: 2026-08-17*
