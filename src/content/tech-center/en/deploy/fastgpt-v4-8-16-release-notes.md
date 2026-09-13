---
title: FastGPT v4.8.16 Feature and Fix Updates
slug: /en/deploy/fastgpt-v4-8-16-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4816
source_type: 官方文档
---

# FastGPT v4.8.16 Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Feature Additions
This release delivers a suite of new capabilities across plugins, commercial edition tools, and core workflow functionality. The SearXNG search plugin is now natively supported, alongside dedicated webhook plugins for DingTalk and WeCom bots. The sandbox environment includes a new global `createHmac` encryption method for custom script use. Workflow editors can now right-click to collapse all nodes at once. For the suggested questions feature, users gain the ability to select a target model and configure custom prompts. Commercial edition subscribers receive scheduled sync support for API Datasets and link collections, plus DingTalk SSO login configuration and Lark/Yuque Dataset import, with linked tutorial documentation for the SSO and dataset import features.

## Platform Behavior Improvements
Multiple core platform behaviors were refined to improve stability and reduce user-facing friction. The model selector interface has been updated for better usability. Server-side rendering (SSR) now pre-detects whether the client device is mobile or desktop, eliminating unnecessary page jitter during initial load. Variable initialization for both Workflow and Simple Mode was rewritten to remove listener-based initialization, which previously caused failures due to inconsistent render order. Workflow now automatically performs type conversion when receiving mismatched data types, preventing `undefined` values in downstream workflow steps.

## Resolved Bug Fixes
All critical bugs addressed in this release are summarized in the table below:
| Bug Description | Fix Applied |
|-------------------|-------------|
| Unable to auto-switch default language | Share links now force default language switch on page load |
| Array selector compatibility with pre-4.8.13 data | Restored cross-version data compatibility |
| Site sync Dataset not using link sync selector | Corrected selector usage for link-based dataset sync |
| Simple Mode to Workflow conversion missing system configs | Ensured system configuration items are migrated during conversion |
| Plugin standalone execution not applying initial variable values | Applied initial variables correctly for standalone plugin runs |
| Workflow modal components causing page offset after closing | Fixed modal layout to prevent page shift on closure |
| Plugin debug logs not saving plugin input parameters | Added input parameter storage to plugin debug logs |
| Template marketplace template errors | Resolved issues with select template marketplace templates |
| Incorrect image file URL when `NEXT_PUBLIC_BASE_URL` is set | Corrected image URL generation for configured base URL |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4816)
