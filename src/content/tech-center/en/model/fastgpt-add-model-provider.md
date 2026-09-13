---
title: Add a New Model Provider to FastGPT
slug: /en/model/fastgpt-add-model-provider
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Add a New Model Provider to FastGPT

This guide covers the formal steps to add a custom model provider to FastGPT.

## Create Provider Directory
Create a dedicated directory under `packages/infrastructure/src/static-data/models/provider/` using your provider’s unique identifier. The required directory structure is:
```text
packages/infrastructure/src/static-data/models/provider/NewProvider/
├── index.ts
└── logo.svg
```
The `logo.svg` file acts as the model provider’s avatar. During plugin service initialization, the static model asset pipeline uploads the file from `provider/{Provider}/logo.svg` to the path `models/{Provider}/logo`. The `/models/get-providers` API returns this asset URL as the provider’s `avatar` field.

## Configure Provider Model File
The `index.ts` file defines the provider’s supported models. The base structure uses required imports and model configuration:
```ts
import { ModelTypeEnum, type ProviderConfigType } from '../../type';

const models: ProviderConfigType = {
  provider: 'NewProvider',
  list: [
    {
      type: ModelTypeEnum.llm,
      model: 'new-provider-chat',
      maxContext: 128000,
      maxTokens: 8192,
      quoteMaxToken: 120000,
      maxTemperature: 1,
      responseFormatList: ['text'],
      vision: false,
      reasoning: false,
      reasoningEffort: false,
      toolChoice: true
    }
  ]
};

export default models;
```

## Model Configuration Parameters
All supported parameters for each model entry are defined explicitly in the configuration:
| Parameter | Type | Standard Template Value |
|-----------|------|---------------------------|
| provider | string | Unique provider identifier matching the directory name |
| type | ModelTypeEnum | `llm` for large language model use cases |
| model | string | Unique model identifier for the provider |
| maxContext | number | Maximum total context window size |
| maxTokens | number | Maximum output token limit per request |
| quoteMaxToken | number | Maximum token count for quoted content |
| maxTemperature | number | Maximum allowed temperature value, capped at 1 |
| responseFormatList | string[] | Supported response formats, set to `['text']` |
| vision | boolean | Whether the model supports visual input, set to `false` |
| reasoning | boolean | Whether the model supports native reasoning, set to `false` |
| reasoningEffort | boolean | Whether the model supports reasoning effort configuration, set to `false` |
| toolChoice | boolean | Whether the model supports tool calling, set to `true` |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
