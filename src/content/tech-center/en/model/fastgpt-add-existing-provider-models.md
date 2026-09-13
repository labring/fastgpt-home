---
title: Add Valid Models to FastGPT Provider Presets
slug: /en/model/fastgpt-add-existing-provider-models
page_type: 模型接入
source: https://doc.fastgpt.cn/en/plugin/model-presets
source_type: 官方文档
---

# Add Valid Models to FastGPT Provider Presets

## Mandatory Pre-Addition Verification
Before creating or updating a model preset, you must validate the model using only official sources. Approved verification materials include official model documentation, official model-list APIs, and official pricing or model pages. Do not use search results, third-party blog posts, or content aggregator pages as confirmation that a model exists. This ensures all added models are legitimate and match their documented capabilities.

## Supported Model Types & Quick Reference
FastGPT model presets support five standardized model types. Use the table below to select the correct type for your model, then complete all required fields defined by the schema for that type:
| Model Type |
|------------|
| `llm` |
| `embedding` |
| `rerank` |
| `tts` |
| `stt` |
*Note: You must select the type based on the model's real functional capabilities and fill in all required fields specified by the schema for the selected type.*

## Preset Maintenance & Step-by-Step Workflow
Follow these official guidelines when adding or managing existing provider model presets:
1.  Validate the model’s legitimacy using only approved official sources before proceeding.
2.  Select the correct model type from the supported list, and complete all required fields specified by the schema for that type.
3.  Do not remove preview, experimental, or dated models unless official documentation explicitly marks them as deprecated, retired, unavailable, or no longer recommended.
4.  For open catalog providers including OpenRouter, Ollama, HuggingFace, and Other, retain all local placeholders and user-customizable models. Do not delete these entries.
5.  Preserve the existing ordering style used in each provider’s preset file. Newer or more capable models are typically placed first in the list.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/plugin/model-presets)
