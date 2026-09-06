---
title: Update VectorModels Config for FastGPT v4.2.1
slug: /en/deploy/fastgpt-v421-vector-models-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/421
source_type: 官方文档
---

# Update VectorModels Config for FastGPT v4.2.1

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Update VectorModels Config for FastGPT v4.2.1

## Overview
This technical update applies to self-hosted FastGPT deployments that use custom configuration files. The change modifies the `VectorModels` configuration field to streamline model selection and add standardized token limit controls.

## Required Configuration Parameters
The updated `VectorModels` field requires two new parameters alongside existing core fields. The table below lists all parameters for the configuration array:
| Parameter Name | Type | Description | Valid/Default Guidelines |
|----------------|------|-------------|--------------------------|
| `model` | string | Unique internal model identifier | As specified by your chosen embedding model |
| `name` | string | User-facing display name for the model | Custom label for administrative use |
| `price` | number | Usage cost per unit | Numeric value matching your pricing structure |
| `defaultToken` | integer | Default token count for direct chunking | User-defined value aligned with chunking needs |
| `maxToken` | integer | Maximum supported token limit for the model | Recommended not to exceed 3000 |

## Sample Updated Configuration
A valid example of the updated `VectorModels` field is provided below:
```json
"VectorModels": [
    {
      "model": "text-embedding-ada-002",
      "name": "Embedding-2",
      "price": 0,
      "defaultToken": 500,
      "maxToken": 3000
    }
]
```
This example uses the `text-embedding-ada-002` model, but the structural format applies to all configured vector models.

## Configuration Rationale
This update simplifies model configuration by removing redundant multiple-choice options for embedding tasks. Administrators only need to select the single most suitable model for their deployment’s needs, reducing configuration complexity while enforcing consistent token handling across all embedding operations.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/421)
