---
title: Integrate ChatGLM2 and M3E with FastGPT
slug: /en/deploy/fastgpt-chatglm2-m3e-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e
source_type: Official documentation
---

# Integrate ChatGLM2 and M3E with FastGPT

## Step-by-Step Configuration Update
All changes are applied to the `config.json` file of your self-hosted FastGPT deployment:
1. Locate the `config.json` file in your FastGPT deployment directory.
2. Open the file in a JSON-compatible text editor.
3. Add the ChatGLM2 model entry to the `llmModels` array alongside existing chat model entries.
4. Add the M3E embedding model entry to the `vectorModels` array alongside the default `text-embedding-ada-002` model.

## ChatGLM2 LLM Model Parameters
The ChatGLM2 model entry uses the following defined parameters, as specified in the configuration:
| Parameter | Exact Value | Function |
|-----------|-------------|----------|
| `model` | `chatglm2` | Internal unique model identifier |
| `name` | `chatglm2` | Display name for the model in the FastGPT interface |
| `maxToken` | `8000` | Maximum total token limit for the model |
| `price` | `0` | No associated token cost for this configuration |
| `quoteMaxToken` | `4000` | Maximum context quote token limit |
| `maxTemperature` | `1.2` | Upper bound for temperature parameter adjustments |
| `defaultSystemChatPrompt` | `""` | Empty default system prompt string |

## M3E Vector Embedding Model Parameters
The M3E embedding model entry includes these configuration parameters:
| Parameter | Exact Value | Function |
|-----------|-------------|----------|
| `model` | `m3e` | Internal unique embedding model identifier |
| `name` | `M3E (for testing)` | Display name for the embedding model |
| `price` | `0.1` | Token cost per unit for embedding operations |
| `defaultToken` | `500` | Default token allocation per embedding request |
| `maxToken` | `1800` | Maximum token limit for individual embedding requests |

## Full Configuration Snippet
The updated partial structure of `config.json` will match the following:
```json
"llmModels": [
  // Other chat models
  {
    "model": "chatglm2",
    "name": "chatglm2",
    "maxToken": 8000,
    "price": 0,
    "quoteMaxToken": 4000,
    "maxTemperature": 1.2,
    "defaultSystemChatPrompt": ""
  }
],
"vectorModels": [
    {
      "model": "text-embedding-ada-002",
      "name": "Embedding-2",
      "price": 0.2,
      "defaultToken": 500,
      "maxToken": 3000
    },
    {
      "model": "m3e",
      "name": "M3E (for testing)",
      "price": 0.1,
      "defaultToken": 500,
      "maxToken": 1800
    }
],
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
