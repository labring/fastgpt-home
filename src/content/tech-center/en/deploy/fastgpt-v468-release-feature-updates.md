---
title: Key FastGPT V4.6.8 Release Feature Updates
slug: /en/deploy/fastgpt-v468-release-feature-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468
source_type: 官方文档
---

# Key FastGPT V4.6.8 Release Feature Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New and Enhanced Workflow Nodes
This release introduces two new or updated workflow nodes, plus a core functionality improvement to the dataset search workflow. First, the Dataset Search Merge node is now available for integration into custom workflows. Second, the HTTP node has been completely redesigned with more flexible parameter input options. The updated node supports automatic input and output data type conversion, such as automatically converting JSON output to a string format compatible with other workflow nodes. Official documentation now includes additional usage examples for the redesigned HTTP node. Additionally, query rewriting functionality has been integrated directly into the Dataset search node, combining coreference resolution and query expansion into a single processing pass. For full details on this updated workflow node, refer to the official Dataset Search documentation.

## LLM Configuration and Streaming Improvements
Two critical updates streamline model configuration and output delivery:
### Unified LLM Configuration
Previously, LLM model configurations were segmented by model type: chat, classification, and extraction. This release unifies these configurations, allowing users to define default parameters for individual models via the `defaultConfig` field. This change eliminates parameter conflicts across different model types, replacing the prior model-type specific configuration logic. The following table outlines the key configuration field:
| Configuration Field | Purpose | Key Notes |
|----------------------|---------|-----------|
| `defaultConfig` | Sets default parameters for individual LLM models | Removes model-type specific configuration boundaries |

### Streaming Response Overhaul
The streaming response implementation has been updated to deliver smoother, more consistent text generation during chat and workflow runs. This update draws on established streaming output patterns, including those used in ChatNextWeb, to improve performance. It also resolves two previously reported streaming issues: garbled partial text outputs and interrupted streams that required a page refresh to fix.

## Resolved Bug Fixes
This release addresses two user-reported functional bugs:
1.  Voice input file upload failure, which prevented users from submitting audio files for processing
2.  Non-functional chat box regeneration, which blocked users from regenerating previous chat responses

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468)
