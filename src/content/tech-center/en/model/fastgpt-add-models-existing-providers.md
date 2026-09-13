---
title: Add Models to Existing FastGPT Provider Configurations
slug: /en/model/fastgpt-add-models-existing-providers
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: Official documentation
---

# Add Models to Existing FastGPT Provider Configurations

## Overview
This guide covers adding new custom models to pre-configured FastGPT provider definitions, without creating entirely new provider entries. All modifications are made to static provider files within the FastGPT codebase.

## Step-by-Step Configuration
1.  Locate the target provider's definition file at `packages/infrastructure/src/static-data/models/provider/[ProviderName]/index.ts`, replacing `[ProviderName]` with the target provider (e.g., `OpenAI`).
2.  Import required TypeScript types from the shared type module:
    ```ts
    import { ModelTypeEnum, type ProviderConfigType } from '../../type';
    ```
3.  Locate the `list` array in the provider configuration object. Clone an existing model entry matching the new model's type, provider family, and use case, then adjust fields to align with the model's official documentation. A full template for model entries across all supported types is shown below:
    ```ts
    import { ModelTypeEnum, type ProviderConfigType } from '../../type';

    const ttsVoices = [
      {
        label: 'Default voice',
        value: 'default'
      }
    ];

    const models: ProviderConfigType = {
      provider: 'ExampleProvider',
      list: [
        {
          type: ModelTypeEnum.llm,
          model: 'example-chat',
          maxContext: 128000,
          maxTokens: 16384,
          quoteMaxToken: 120000,
          maxTemperature: 1,
          responseFormatList: ['text', 'json_schema'],
          vision: true,
          reasoning: false,
          reasoningEffort: false,
          toolChoice: true
        },
        {
          type: ModelTypeEnum.embedding,
          model: 'example-embedding',
          defaultToken: 512,
          maxToken: 8192,
          normalization: true
        },
        {
          type: ModelTypeEnum.rerank,
          model: 'example-rerank',
          maxToken: 8192
        },
        {
          type: ModelTypeEnum.tts,
          model: 'example-tts',
          voices: ttsVoices
        },
        {
          type: ModelTypeEnum.stt,
          model: 'example-stt'
        }
      ]
    };

    export default models;
    ```

## Common Model Configuration Fields
Use the following reference table for standard model fields, as defined in the FastGPT type system:
| Field                | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| `type`               | Model type from `ModelTypeEnum`: `llm`, `embedding`, `rerank`, `tts`, or `stt` |
| `model`              | Actual model ID used in requests                                               |
| `name`               | Optional display name; defaults to `model` when omitted                        |
| `maxContext`         | Maximum LLM context length                                                     |
| `maxTokens`          | Maximum LLM output length                                                      |
| `quoteMaxToken`      | Maximum token budget FastGPT can use for cited Dataset content                 |
| `maxTemperature`     | Maximum temperature; use `null` when the model does not support temperature    |
| `responseFormatList` | Supported response formats, such as `text`, `json_object`, and `json_schema`   |
| `vision`             | Whether vision input is supported                                              |
| `reasoning`          | Whether this is a reasoning model                                              |
| `reasoningEffort`    | Whether reasoning effort can be configured                                     |
| `toolChoice`         | Whether tool choice is supported                                               |
| `fieldMap`           | Field-name mapping for non-standard OpenAI-compatible APIs                     |
| `defaultConfig`      | Default request parameters sent with the model request                         |
| `defaultToken`       | Default chunk token count for Embedding models                                 |
| `maxToken`           | Maximum input token count for Embedding/Rerank models                          |
| `normalization`      | Whether Embedding vectors should be normalized                                 |
| `voices`             | Available voice list for TTS models                                            |

## Automatic Build Defaults
When FastGPT builds the static model list, several default values are automatically applied to new model entries:
- The `provider` field is populated from the parent provider configuration
- The `name` field defaults to the `model` field value if no explicit value is provided
- Standard LLM capability switches are added, including dataset processing, classification, extraction, tool calling, and evaluation

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/model-presets)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
