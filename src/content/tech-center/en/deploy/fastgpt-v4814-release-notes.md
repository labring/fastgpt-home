---
title: FastGPT v4814 Full Release Notes
slug: /en/deploy/fastgpt-v4814-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4814
source_type: 官方文档
---

# FastGPT v4814 Full Release Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Feature Additions
This release includes multiple new capabilities across core application functionality and commercial tiers:
- Workflow auto-trigger for conversation rounds when entering chat or clicking "Start conversation"
- Rewritten `chatContext` system with chat testing log generation and persistent conversations across page refreshes
- Toggleable original source text visibility for shared applications
- New doc2x plugin integration
- Traditional Chinese language localization support
- Custom UID parameter support for share links and chat API endpoints
- Commercial tier Microsoft OAuth login authentication

## Configurable Share Link Parameters
The following parameters are now supported for share link and chat API configurations:
| Parameter Name | Functionality | Supported Contexts |
|----------------|---------------|---------------------|
| `allow_view_source` | Controls end-user access to original dataset source material | Shared application links |
| `custom_uid` | Accepts a custom user identifier for tracking and attribution | Shared links, chat API requests |

## Usability & Infrastructure Improvements
Several targeted enhancements boost stability and user experience:
- Polished workflow UI details for improved visual clarity
- Implemented diff-based storage for app edit history to prevent browser memory overflow during extended editing sessions
- Updated code entry point to include a direct register link, eliminating the need for initial visit execution
- Enhanced workflow validation with additional missing value checks
- Added a maximum retry limit for dataset indexing tasks
- Resolved image path and diagram rendering issues
- Updated Milvus vector database documentation for self-hosted deployments

## Resolved Bug Fixes
Critical bugs from prior releases are addressed in this update:
- Fixed chunking strategy that was dropping level-4 headings, and added support for level-5 headings
- Corrected MongoDB unique index configuration for dataset collections
- Fixed error state triggered when deselecting dataset citations in chat responses
- Fixed issue where converting Simple Mode apps to workflows failed to use the latest edit history
- Resolved missing form input description text rendering
- Fixed API support for Base64-encoded image files

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4814)
