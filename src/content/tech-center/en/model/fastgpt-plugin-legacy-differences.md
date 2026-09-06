---
title: Key Differences Between FastGPT Legacy and New Plugin Systems
slug: /en/model/fastgpt-plugin-legacy-differences
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Key Differences Between FastGPT Legacy and New Plugin Systems

## Core Deployment Architecture
The deployment relationship between FastGPT and its plugins remains an external extension model, with the overall system retaining a microservice-based architecture. No structural changes have been implemented to this foundational deployment setup, ensuring compatibility with existing external plugin hosting configurations.

## Packaging and Runtime Overhaul
### Unified Packaging Format
The legacy plugin packaging system relied on a built-in system tool directory structure. This has been fully replaced with a standardized `.pkg` format, which streamlines core plugin management tasks including installation, version tracking, hot updates, and future expansion of supported plugin types.
### Server-Controlled Runtime
Plugin runtime operations are now fully managed by the FastGPT server. The default runtime environment is `local-pool`, where each individual plugin version operates within its own isolated process pool, dedicated task queue, and customized runtime configuration to prevent resource conflicts between different plugin versions.

## Metadata and Development Workflow Changes
### Standardized Build Artifacts
All critical plugin metadata—including input/output schemas, secret configuration schemas, and icon assets—are now bundled directly into the final build artifacts. These artifacts are natively accessible by FastGPT’s frontend page editor, workflow designer, and agent configuration tools, removing the need for manual synchronization between plugin code and platform interfaces.

### Updated Development Tooling
The legacy plugin development workflow, which utilized `config.ts`, `versionList`, and the `bun run build:pkg` command, is no longer the primary supported development method. The official recommended tools for plugin development are `@fastgpt-plugin/cli` and `@fastgpt-plugin/sdk-factory`. The following table summarizes key differences between legacy and current tooling:

| Component               | Legacy Workflow                          | Current Standard Workflow               |
|-------------------------|------------------------------------------|-----------------------------------------|
| Core Dependencies       | Built-in system tool directory           | `@fastgpt-plugin/cli`, `@fastgpt-plugin/sdk-factory` |
| Configuration Storage   | Separate `config.ts` and `versionList` files | Embedded within `.pkg` build artifacts |
| Primary Build Command   | `bun run build:pkg`                      | Official CLI-driven packaging process   |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
