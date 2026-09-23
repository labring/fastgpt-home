---
status: accepted
---

# ADR 0017: Publish PR previews through Workers Static Assets

## Context

The Preview Site Variant already generates a complete static export and a Worker entrypoint that applies preview `noindex` behavior. PR previews previously used a shared Cloudflare Pages project. The production Worker publication contract from ADR 0016 provides the same Static Assets runtime needed for isolated PR previews.

## Decision

- Deploy each open PR preview as a dedicated Worker named `fastgpt-preview-pr-<number>`.
- Use the verified `preview` artifact, its generated Worker entrypoint, and the shared Wrangler Static Assets configuration.
- Pass the PR-specific Worker name with Wrangler so the sealed artifact remains unchanged after verification.
- Use `workers.dev` addresses and comment the deployment URL on the PR with the existing preview comment marker.
- Run the privileged deployment from `workflow_run` after the candidate artifact and merge-result checks complete.
- Store the preview credential in the `international-worker-preview` GitHub Environment as `CLOUDFLARE_PREVIEW_WORKER_API_TOKEN`.
- Delete the PR Worker when the PR closes. Manual preview runs use a run-specific Worker name and require manual cleanup.

## Consequences

Concurrent PRs receive isolated Workers and URLs. Preview deployments inherit the existing noindex, canonical, locale, and security behavior from the verified artifact. Worker inventory grows with open PRs and requires cleanup on PR closure.

The International Site production Worker and the Preview Workers use separate Worker names and credentials. The China Site keeps its Docker/Nginx publication path.
