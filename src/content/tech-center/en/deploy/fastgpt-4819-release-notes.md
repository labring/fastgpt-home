---
title: FastGPT Version 4819 Release Updates
slug: /en/deploy/fastgpt-4819-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4819
source_type: 官方文档
---

# FastGPT Version 4819 Release Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Feature Additions
This release includes four key new features to expand platform functionality:
- Workflow Dataset search now supports filtering results by dataset permissions, enabling users to narrow results to only accessible datasets.
- Lark and Yuque dataset viewers can directly access the original source content of imported documents, improving transparency for referenced materials.
- A new Workflow Wait plugin has been added, which pauses workflow execution for a specified number of milliseconds before resuming automated processing.
- Lark bot integration now supports configuration of a private Lark server URL, for deployments using self-hosted Lark instances.

## Usability & Infrastructure Improvements
Several updates were made to improve platform performance and consistency:
- Member list pagination loading has been optimized to reduce server load and improve user experience for large member lists.
- Unified pagination loading code has been implemented across all platform list views, ensuring consistent behavior across the application.
- The chat page loading behavior now includes a configurable option to run as a standalone page, allowing flexible deployment of chat interfaces.
- Member avatar data has been migrated to the member database table, centralizing user profile data and improving overall data integrity.

## Bug Fix Resolutions
A total of seven critical bugs were resolved in this release, including:
- Fixed Yuque file library import issue where nested file contents could not be expanded.
- Fixed Workflow editor bug where LLM parameters could not be disabled.
- Addressed Workflow editor code execution node template restoration issue.
- Improved HTTP interface object string parsing compatibility for broader tool integration.
- Fixed API file upload (localFile) endpoint where the image expiration flag was not being cleared correctly.
- Resolved workflow import issue where number input types could not be overridden.
- Fixed bug where some model provider logos were not displaying correctly.

## Configurable Options
The following configurable options are available for this release:
| Option Name | Description |
|-------------|-------------|
| Private Lark Server URL | Sets a custom API endpoint for self-hosted Lark bot integrations |
| Standalone Chat Page | Toggles whether the chat interface loads as a dedicated standalone page |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4819)
