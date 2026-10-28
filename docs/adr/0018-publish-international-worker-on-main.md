---
status: accepted
---

# ADR 0018: Publish the International Worker on Main

Every push to `main` builds and seals the `io` artifact, then deploys it to the `fastgpt.io` Worker Custom Domain. `/` serves the default English page directly, while Preview keeps its workers.dev-only configuration and separate credentials. Before the first cutover, remove `fastgpt.io` from the existing Pages custom domain so its CNAME no longer blocks the Worker Custom Domain; retain the Pages publication as rollback content.
