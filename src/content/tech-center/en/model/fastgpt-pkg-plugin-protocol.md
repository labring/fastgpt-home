---
title: Manage FastGPT Plugins via .pkg Protocol
slug: /en/model/fastgpt-pkg-plugin-protocol
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Manage FastGPT Plugins via .pkg Protocol

## Legacy Plugin Directory Deprecation
New FastGPT system tools no longer depend on the legacy built-in source directory `modules/tool/packages`. All new tool delivery uses unified `.pkg` files, replacing the fixed directory-based deployment model. This standardization streamlines plugin distribution and management across all FastGPT environments.

## Required and Optional Build Artifacts
All valid FastGPT plugin packages must include specific core files, with optional additional assets. The following table outlines all allowed build artifacts:

| Artifact Type           | Exact Path/Details                            | Requirement Status |
|-------------------------|-----------------------------------------------|--------------------|
| Core Execution Script   | `dist/index.js`                               | Mandatory          |
| Manifest Metadata File  | `dist/manifest.json`                          | Mandatory          |
| Plugin Icon Assets      | Plugin-specific icon files                    | Mandatory          |
| Project Documentation   | `README.md`                                   | Optional           |
| Static Resource Files   | `assets/**` recursive directory contents      | Optional           |

## .pkg File Core Lifecycle & Capabilities
The `.pkg` file format acts as the single standard for all plugin lifecycle operations. These operations include uploading plugins to FastGPT, installing deployed packages, listing available installed plugins, and managing version history for plugins. Additionally, each `.pkg` package bundles critical metadata and assets for seamless integration with FastGPT’s core features: plugin metadata, input/output schemas, secret schemas, and icon assets are all included in the build output to support use in FastGPT pages, workflows, and agent configurations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
