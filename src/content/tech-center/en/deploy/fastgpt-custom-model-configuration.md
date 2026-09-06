---
title: Add and Configure Custom FastGPT Models
slug: /en/deploy/fastgpt-custom-model-configuration
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: 官方文档
---

# Add and Configure Custom FastGPT Models

## Add and Configure Custom FastGPT Models

## Overview
If FastGPT's built-in models do not meet your deployment requirements, you can add custom model configurations. If the submitted `Model ID` matches an existing built-in model ID, the entry will modify the existing model rather than creating a new one. Two configuration methods are available: web-based admin form entry, or direct configuration file editing. The file method is ideal for replicating consistent model setups across multiple FastGPT instances, as it enables quick bulk configuration.

## Configuration Methods
### Web Form Setup
Use the FastGPT admin interface's model configuration form to add custom models. The form will automatically prompt for relevant metadata based on your selected model category. Two sample form screenshots are provided in the official documentation to guide setup.

### Configuration File Setup
For automated or bulk configuration, edit the model configuration files directly. Each custom model entry follows a standardized JSON structure, with fields tailored to the model's functional category. All custom model entries share these base fields:

| Field | Type | Description |
|-------|------|-------------|
| `model` | string | Unique model ID, matches the model name used in API channels |
| `metadata.isCustom` | boolean | Marks the model as a custom configuration |
| `metadata.isActive` | boolean | Toggles the model's availability in the FastGPT UI |
| `metadata.provider` | string | Model provider category; use built-in values or "Other" |

#### Model-Specific Fields
- **Language Models**: Add `maxContext`, `maxResponse`, `quoteMaxToken`, `maxTemperature`, `charsPointsPrice`, `censor`, `vision`, `toolChoice`, `functionCall`, `customCQPrompt`, `customExtractPrompt`, `defaultSystemChatPrompt`, `defaultConfig`, and `fieldMap`.
- **Embedding Models**: Include `defaultToken` (default text split token count) and `maxToken` (maximum allowed token count).
- **Rerank Models**: Require `type` set to `"rerank"`, plus optional `requestUrl` and `requestAuth` for custom API endpoints.
- **Text-to-Speech Models**: Require `type` set to `"tts"`, a `voices` array of voice options with `label` and `value` fields, and `charsPointsPrice`.
- **Speech-to-Text Models**: Use the core base schema with no additional type-specific required fields.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/config/model/intro)
