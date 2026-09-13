---
title: FastGPT 4.15.0 Key Codebase Improvement Details
slug: /en/deploy/fastgpt-415-codebase-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# FastGPT 4.15.0 Key Codebase Improvement Details

## Core Infrastructure Overhaul
This release includes a full codebase restructure, with upgrades to Next.js and the Turbopack build system. The default containerized Node.js version is now 24. The plugin service has been migrated from the legacy `runtime` structure to a pnpm workspace monorepo, split into discrete modules: HTTP service entry, domain model, use cases, API adapter, infrastructure, SDK, and CLI. Additional infrastructure changes include switching the volume manager runtime from Bun to Node.js, upgrading project tooling to ESLint, Prettier, textlint, lint-staged, and TS6, and strengthening GitHub Actions security. Server-side environment loading now uses `@t3-oss/env-core` for stricter type checks, with all services adopting centralized environment variable exports. Unit test performance has been improved, reducing full test runtime by 50%.

## Workflow and API Standardization
Consistent standards have been applied across core platform functionality: Agent tool declaration and execution behavior have been unified, and all app-related APIs now use Zod schemas with auto-generated documentation. Code modules for AI requests, workflow run details, and the chatbox have been split to reduce cross-module coupling. Workflow `nodeResponse` storage now uses a flattened structure to prevent save failures in large nested workflows. Several bugs have been fixed, including incorrect input rendering and IO type checks caused by dirty enum-expression strings (such as `FlowNodeInputTypeEnum.*`), intercepted `Ctrl+C` text copying in workflow text boxes, and incompatible built-in LLM request parameters (removed `temperature` and `max_tokens` to support more model providers).

## Performance and Bug Fix Summary
| Optimization/Fix | Specific Impact |
|-------------------|-----------------|
| Immediate worker-side image processing | Eliminated base64 data retention, reducing worker memory usage |
| String length protection for system processing | Stops synchronized string replacement for oversized inputs to avoid high CPU load |
| Flattened workflow nodeResponse storage | Resolves save failures for large nested workflows |
| Reduced unit test runtime | Cuts full test suite execution time by 50% |

Additional improvements include optimized user-defined API key billing logic and token calculation dependencies, added design documentation and unit tests for stream-resume-related modules, and abstracted the chat API from app-specific handling to a platform-level capability.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
