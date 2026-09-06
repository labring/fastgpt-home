---
title: Key FastGPT Self-Hosted Upgrade Performance Improvements
slug: /en/deploy/fastgpt-upgrade-performance-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497
source_type: 官方文档
---

# Key FastGPT Self-Hosted Upgrade Performance Improvements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Document and Database Performance Fixes
This upgrade includes targeted optimizations for document parsing and database query operations. The Doc2x document parsing module now features enhanced error message capture, which provides detailed failure information for failed parsing jobs to streamline troubleshooting. Additionally, the module’s timeout duration has been extended to support processing of larger document files without premature job termination. For PostgreSQL vector database deployments, the vector query logic has been adjusted to force usage of preconfigured vector indexes, preventing unindexed full-table scans and improving search efficiency for vector-based retrieval tasks.

## Timing and Data Retrieval Updates
Two critical timing and retrieval improvements have been implemented: First, conversation time statistics now accurately return the total end-to-end workflow execution time, replacing the previous partial segment timing reporting that undercounted total processing length. Second, audio parsing duration data is now retrieved directly from the ai_proxy service, aligning duration tracking with proxy-side processing metrics to ensure consistency across distributed deployments. The chat log list API has also been refactored to handle scenarios with very large numbers of messages in a single conversation, reducing latency and preventing request timeouts for long chat histories.

## Token Count Calculation Optimizations
The AI model token count calculation logic has been updated to prioritize accuracy by using official API-provided usage values when available. If API usage values are not accessible, the system falls back to GPT-3.5 estimation for token count calculations. A quick reference for the token count workflow is below:
| Trigger Condition | Token Count Source |
|-------------------|---------------------|
| API usage values present | Official API-reported token counts |
| No API usage values available | GPT-3.5 estimation model |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497)
