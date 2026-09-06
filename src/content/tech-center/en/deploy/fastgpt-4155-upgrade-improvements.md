---
title: Detailed Technical Improvements for FastGPT 4.15.5 Upgrade
slug: /en/deploy/fastgpt-4155-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# Detailed Technical Improvements for FastGPT 4.15.5 Upgrade

## Detailed Technical Improvements for FastGPT 4.15.5 Upgrade

## Dependency Centralization & Lockfile Refresh
For self-hosted FastGPT deployments, this release streamlines dependency management across workspace components by consolidating more workspace dependency version definitions in the pnpm catalog. The project’s pnpm lockfile has been fully refreshed to align with the latest resolved dependency versions. This reduces inconsistent dependency versioning across separate deployment parts, minimizing build-time conflicts and improving overall deployment stability.

## Agent Sandbox Font Enhancements
Sandboxed task execution now benefits from improved font availability, as the Agent Sandbox container image includes both Chinese and English runtime fonts. This update eliminates unexpected missing font errors during text processing and image-related workflows executed within the sandbox, ensuring consistent performance across multilingual and visual workloads.

## Storage Adapter Protocol Compliance Fixes
Two storage adapters have been updated to align with FastGPT’s internal interface standards and error handling rules, as detailed in the table below:

| Storage Adapter | Updated Functionalities | Corrective Details |
|-----------------|-------------------------|--------------------|
| OSS             | String upload support   | Aligns with the `IStorage` contract; preserves stored `Content-Type` when OSS does not support response-header overrides |
| COS             | Missing object preflight check | Ensures download operations follow the shared FastGPT error contract |

These compliance updates ensure that all cloud storage operations adhere to FastGPT’s standardized `IStorage` contract and shared error handling framework, reducing deployment-specific edge case failures across supported storage backends.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155)
