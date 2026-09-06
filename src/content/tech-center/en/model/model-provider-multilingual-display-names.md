---
title: Add Multilingual Model Provider Display Names
slug: /en/model/model-provider-multilingual-display-names
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Add Multilingual Model Provider Display Names

## Model Provider Display Name Purpose
FastGPT’s user interface uses standardized display names for model providers across all supported language locales. These labels replace raw internal provider identifiers with accessible, localized text to ensure consistent user experiences. Formal production model providers require explicit multilingual configuration to avoid inconsistent or unpolished UI elements.

## Configure Multilingual Display Names
To add multilingual display names for a new model provider, follow these concrete steps:
1. Locate the static model configuration file at `packages/infrastructure/src/static-data/models/model.ts`
2. Open the file and find the `ModelProviderMap` object
3. Insert a new key-value pair for your provider into the map, using the required TypeScript syntax:
```ts
NewProvider: {
  en: 'NewProvider',
  'zh-CN': 'New Provider',
  'zh-Hant': 'New Provider'
}
```
Replace the placeholder `NewProvider` key with your internal provider identifier, and update each locale-specific value to match the translated display name for the corresponding language. Supported locale keys include `en` for English, `zh-CN` for Simplified Chinese, and `zh-Hant` for Traditional Chinese.

## Unregistered Provider Fallback Behavior
If a provider identifier is not included in the `ModelProviderMap`, FastGPT will automatically fall back to using the raw provider string as its display name. This fallback is intended for temporary testing or internal prototyping, as unlocalized raw strings may appear inconsistent across multilingual deployments. All formal, production-ready model providers must include full multilingual entries in `ModelProviderMap` to deliver a polished user experience.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
