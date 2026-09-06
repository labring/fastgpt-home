---
title: FastGPT 497 Official New Feature Details
slug: /en/deploy/fastgpt-497-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497
source_type: 官方文档
---

# FastGPT 497 Official New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## API and Configuration Enhancements
Self-hosted production deployments now support specifying a custom file path for the `config.json` configuration file, removing fixed directory constraints for configuration management. API requests can use the special `NO_RECORD_HISTORIES` value for the `chatId` field to prevent the system from recording conversation history for the current interaction. The following table outlines the valid `chatId` parameter behavior:

| Parameter Field | Accepted Value | System Behavior |
|------------------|----------------|------------------|
| `chatId`         | `NO_RECORD_HISTORIES` | Disables conversation history storage |
| Any valid string | Default behavior | Stores conversation history as standard |

Additional configuration updates include native support for Jina AI model system setup, and usage-based billing for rerank model inference, aligning cost tracking with actual model utilization.

## Workflow and Dataset Improvements
Dataset-powered responses now include inline citations appended to the end of each referenced paragraph, improving source transparency for end users. The workflow editor now features an auto-align function accessible via right-click, which automatically organizes connected nodes to reduce manual layout time. MCP tools have received two key updates: support for the HTTP Streamable protocol, and the ability to edit tool names within the MCP Server to support clients that do not recognize Chinese characters, expanding cross-client compatibility.

## Business and Operational Features
New operational and commercial tools include support for subscription plan redemption codes, simplifying license distribution for team and enterprise deployments. Alipay has been added as a native payment method for FastGPT transactions, and short link analytics tracking is now available to monitor engagement metrics for generated shortened links.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/497)
