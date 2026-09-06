---
title: FastGPT V4.8.9 Release Feature and Fix Summary
slug: /en/deploy/fastgpt-v4-8-9-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/489
source_type: 官方文档
---

# FastGPT V4.8.9 Release Feature and Fix Summary

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core New Features
This release delivers foundational platform updates:
- File upload configuration overhaul: Image upload functionality is now governed by system-wide settings instead of relying on vision model availability.
- AI chat and tool call nodes now include an **Enable image recognition** toggle. When enabled, the system automatically extracts images from chat uploads and image URLs embedded in user questions.
- New document parsing node for automated workflow processing.
- Bulk deletion option for all conversation starters.
- QA splitting now supports custom chunk sizes, with an optimized fix for GPT-4o-mini generating minimal output when using large chunks.

## Commercial Edition Enhancements
Commercial tier users gain expanded management tools:
- Team notification account binding to receive critical platform alerts
- Dataset collection tagging for organized, tag-based dataset categorization
- Dataset search node filtering by tags and file creation date
- Ability to transfer app owner permissions between authorized users

## Usability and Performance Improvements
Two key updates to streamline platform usage:
- Lazy loading for chat messages to reduce unnecessary network data transfer
- Cleared file selection cache to allow re-selection of the same file without prior selection conflicts

## Resolved Bug Fixes
The following critical issues are resolved in this release:
| Bug Category               | Resolved Issue                                                                 |
|----------------------------|--------------------------------------------------------------------------------|
| Dataset Management         | Dataset file upload progress failing to reach 100% under unstable networks or with multiple files |
| Dataset Management         | Incorrect upload progress updates for dataset files |
| Dataset Management         | Dataset page resetting to first page during rebuilds |
| Dataset Management         | OpenAPI authentication issues for dataset list endpoints |
| Workflow Nodes             | Plugin dynamic variable default values not displaying correctly |
| Workflow Nodes             | Tool call temperature and max response parameters failing to apply configuration |
| Workflow Nodes             | Function call mode requiring `content` parameter in assistant role messages (deprecated FC mode only) |
| App and Chat               | Error displayed when accessing the last conversation of a deleted app via chat |
| App and Chat               | Unable to submit feedback on new conversations via shared links |
| File Handling              | File selection cache not cleared, preventing re-selection of identical files |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/489)
