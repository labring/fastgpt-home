---
title: Integrate Qwen Local Model with FastGPT
slug: /en/deploy/local-qwen-model-integration-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Integrate Qwen Local Model with FastGPT

## Overview
FastGPT supports integration of custom local large language models via direct edits to its core configuration file. This guide outlines the exact steps to add the qwen-chat local model to your FastGPT deployment, with configuration aligned to OneAPI channel model naming standards.

## Step-by-Step Configuration
1. Locate your FastGPT `config.json` configuration file.
2. Navigate to the `llmModels` array within the file.
3. Insert or update the Qwen chat model entry using the following validated JSON block:
```json
...
  "llmModels": [
    {
      "model": "qwen-chat",
      "name": "Qwen",
      "avatar": "/imgs/model/Qwen.svg",
      "maxContext": 125000,
      "maxResponse": 4000,
      "quoteMaxToken": 120000,
      "maxTemperature": 1.2,
      "charsPointsPrice": 0,
      "censor": false,
      "vision": true,
      "toolChoice": true,
      "functionCall": false,
      "customCQPrompt": "",
      "customExtractPrompt": "",
      "defaultSystemChatPrompt": "",
      "defaultConfig": {}
    }
  ],
...
```
> Note: The `model` field must exactly match the channel model name configured in your connected OneAPI instance.

## Configuration Parameter Reference
All supported parameters for the custom LLM entry are defined below, using exact values from the example:
| Parameter | Data Type | Description | Example Value |
|-----------|-----------|-------------|---------------|
| `model` | string | Exact match to OneAPI channel model name | `qwen-chat` |
| `name` | string | Display name for the model in FastGPT UI | `Qwen` |
| `avatar` | string | Relative path to the model's logo asset | `/imgs/model/Qwen.svg` |
| `maxContext` | integer | Maximum total context token limit for conversations | 125000 |
| `maxResponse` | integer | Maximum allowed response token length per request | 4000 |
| `quoteMaxToken` | integer | Maximum token limit for cited content | 120000 |
| `maxTemperature` | float | Upper bound for the temperature parameter | 1.2 |
| `charsPointsPrice` | integer | Points per 1k tokens (Commercial Edition only) | 0 |
| `censor` | boolean | Toggle built-in content moderation | `false` |
| `vision` | boolean | Enable support for image input | `true` |
| `toolChoice` | boolean | Support explicit tool calling workflows | `true` |
| `functionCall` | boolean | Fallback function calling support (overridden by `toolChoice`) | `false` |
| `customCQPrompt` | string | Custom classification prompt for non-tool-call models | `""` |
| `customExtractPrompt` | string | Custom content extraction prompt | `""` |
| `defaultSystemChatPrompt` | string | Default system prompt for all chat conversations | `""` |
| `defaultConfig` | object | Default parameters sent with every API request | `{}` |

## Activate the Configured Model
After saving your modified `config.json` file, restart your FastGPT service to apply the new configuration. Once the service is back online, navigate to the FastGPT application configuration panel, where you can now select the Qwen model from the list of available large language models.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
