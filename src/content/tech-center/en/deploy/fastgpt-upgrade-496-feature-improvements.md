---
title: FastGPT Self-Hosted Upgrade 496 Feature Improvements
slug: /en/deploy/fastgpt-upgrade-496-feature-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT Self-Hosted Upgrade 496 Feature Improvements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core Data & Workflow Improvements
This release strengthens data handling and processing for FastGPT deployments. Workflow data type conversion robustness and compatibility have been enhanced, reducing runtime errors when passing mixed data types between connected workflow nodes. The dataset content chunking strategy has been adjusted: large tables are now split into independent chunks rather than merged into oversized blocks, preventing processing timeouts and improving retrieval precision. Python sandbox code execution now supports larger data inputs, removing prior size limitations for sandboxed code environments. Additionally, dataset tool call results now automatically prepend image domain names, resolving broken image link display in tool output previews.

## Frontend Component Updates
Two UI component updates improve customization and compliance for deployed applications. The breadcrumb component now includes a new configuration option to toggle whether the final trail step is clickable, allowing teams to tailor navigation behavior for their user interfaces. The iframe embed component has been updated to include a built-in microphone permission declaration, ensuring compliance with browser permission requirements for embedded content that uses audio input.

## Deployment & Third-Party Integration Fixes
This section covers deployment workflow and third-party messaging formatting improvements. The GitHub Action runner base image has been upgraded to Ubuntu 24, providing updated system dependencies and security patches for self-hosted deployment pipelines. A formatting bug has been resolved: extraneous leading and trailing newlines are no longer added to auto-replies sent via Lark, WeChat Official Account, and other supported third-party messaging channels, improving output readability.

For the breadcrumb component configuration, use the following parameter:
| Parameter Name | Description | Minimum Supported Version |
|----------------|-------------|---------------------------|
| last_step_clickable | Enables or disables interactivity for the final breadcrumb trail item | 496 |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496)
