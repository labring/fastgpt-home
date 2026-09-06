---
title: FastGPT V4.4.5 New Feature Update Details
slug: /en/deploy/fastgpt-v4-4-5-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/445
source_type: 官方文档
---

# FastGPT V4.4.5 New Feature Update Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core Conversation Feature Additions
FastGPT V4.4.5 adds next-step suggestion functionality for deployed chatbots. When enabled, the connected large language model will automatically generate 3 predicted follow-up questions based on the current conversation context. This feature supports more natural, flowing user conversations by proactively suggesting relevant follow-up topics, reducing the need for users to manually craft new prompts to continue interactions.

## Commercial Edition Enhanced Capabilities
This update expands commercial edition functionality in two key areas. First, share link access controls are now available, alongside hook-based identity verification. This verification method allows integration with the user’s existing internal user management systems, enabling validated access to shared chatbot links without requiring custom code changes.
Second, API key management has been significantly improved. The following new fields and constraints are now supported for API keys:
| API Key Configuration Field | New V4.4.5 Feature |
| --- | --- |
| Alias | Custom display name for easy identification of individual API keys |
| Quota Limits | Configurable usage quotas to restrict API call volume per key |
| Expiration Date | Set a specific validity period, with automatic key revocation upon expiration |
| Built-in AppId | Pre-included application identifier, eliminating the need for separate app connection setup |

## Workflow Configuration Consolidation
Prior to V4.4.5, global variables and opening message settings required separate, distinct configuration nodes within chatbot workflow flows. This update combines these two elements into a single unified workflow node. This consolidation simplifies the setup process for new chatbots, reduces configuration clutter, and allows users to adjust both global variable values and opening prompt text in a single centralized location.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/445)
