---
title: FastGPT 4912 Technical Upgrade Feature Details
slug: /en/deploy/fastgpt-4912-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912
source_type: 官方文档
---

# FastGPT 4912 Technical Upgrade Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Enhanced AI Proxy Monitoring
This update adds integrated visual and tabular monitoring for AI proxy operations, enabling admins to track model call and performance metrics in real time. Available metrics include total model call volume, latency percentiles, and error rates, with filterable time ranges and sortable table columns for granular analysis. A sample of available monitoring metrics is listed below:
| Metric Category       | Supported Metrics                                                                 |
|-----------------------|-----------------------------------------------------------------------------------|
| Call Performance      | Total requests, average latency, p95/p99 latency values                           |
| Model Usage           | Requests per model type, endpoint utilization                                    |
| Error Tracking        | Failed call count, error code breakdown                                          |

## Secure Node Authentication Updates
HTTP nodes and Model Control Protocol (MCP) integrations now include dedicated, separate Auth Configuration settings. A critical security improvement here is that plaintext authentication credentials are never sent back to frontend clients; all credential storage and validation occurs server-side only, eliminating exposure risks in shared workflow environments.

## Workflow and Model Capability Enhancements
Several core workflow and model-related improvements are included:
1. Question classification and content extraction prompts now automatically include results from the previous conversation round, providing additional contextual guidance to reduce ambiguous outputs.
2. Conditional workflow nodes now support variable references, allowing dynamic branching logic based on prior workflow output variables.
3. Pro edition subscribers gain access to LLM-based automatic chunk-boundary detection during dataset chunking, which optimizes text segmentation for improved retrieval accuracy.
4. Native support for the Doubao 1.6 series models and updated Qwen model configurations is added, expanding the range of compatible large language models.

## Centralized Admin Dashboard Analytics
A new admin dashboard with built-in data analytics is now available, providing platform administrators with a centralized view of usage metrics, model performance trends, and workflow execution data. This removes the need for third-party logging and monitoring tools for basic platform oversight.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912)
