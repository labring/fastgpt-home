---
title: Understand FastGPT Model Preset Directory Structures
slug: /en/model/fastgpt-model-preset-directories-2
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Understand FastGPT Model Preset Directory Structures

This documentation covers the standardized directory structure and core files for managing AI model presets in FastGPT plugin infrastructure, critical for maintaining consistent model configuration across deployments.

## Top-Level Directory Layout
The root directory for all model preset assets is `packages/infrastructure/src/static-data/models/`. This top-level directory contains six primary contents:
- Root-level TypeScript files: `index.ts`, `model.ts`, `type.ts`
- Two subdirectories: `channel-avatar/` and `provider/`

## Provider-Specific Preset Organization
The `provider/` subdirectory organizes model presets by AI service provider. Each provider has a dedicated subdirectory named using the provider’s internal identifier, formatted as `{Provider}/`. Every provider subdirectory must include two mandatory files:
1.  `index.ts`: Holds the official model presets for that provider
2.  `logo.svg`: The brand logo asset for the provider, used for UI display in FastGPT interfaces.
The `channel-avatar/` top-level subdirectory stores avatar assets exclusively for AIProxy channels.

## Key File and Directory Reference
| Path | Core Purpose |
|------|--------------|
| `index.ts` | Registers all configured AI providers, and generates two critical exported assets: `staticModelList` and the global provider list |
| `model.ts` | Maintains two standardized datasets: `ModelProviderMap` (maps internal provider IDs to human-readable display names) and `aiproxyChannels` (configuration data for AIProxy channels) |
| `type.ts` | Defines strict TypeScript schemas for provider configuration structures and model preset definitions |
| `provider/{Provider}/index.ts` | Contains provider-specific model preset configurations, including supported model IDs and default parameters |
| `provider/{Provider}/logo.svg` | Branded logo asset for the associated AI provider |
| `channel-avatar/` | Directory storing custom avatar assets for AIProxy communication channels |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
