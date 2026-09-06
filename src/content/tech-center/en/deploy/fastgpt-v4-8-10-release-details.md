---
title: FastGPT v4.8.10 Release Feature and Fix Details
slug: /en/deploy/fastgpt-v4-8-10-release-details
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4810
source_type: 官方文档
---

# FastGPT v4.8.10 Release Feature and Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core Workflow and Platform New Features
This release adds multiple workflow-focused and core platform enhancements:
- Template marketplace launch
- Drag-and-drop auto-alignment and snapping for workflow nodes
- New user selection node (unsupported in Debug mode)
- Added `uid` global variable for workflows
- Workflow undo and redo functionality
- Replaced auto-save with session-based workflow edit history
- Workflow version renaming support
- Deprecated the legacy "App Call" workflow node, replaced with a standalone plugin-compatible node
- Plugins now support usage instruction configuration
- Plugin custom inputs now include radio button options
- HTTP node added `text/plain` mode, timeout configuration, additional Body types, and updated variable selection for params and headers
- Workflow export/import now supports direct JSON file sharing
- Added verification code security checks

## Commercial Feature Additions
Exclusive commercial features include:
- Lark bot integration
- WeChat Official Account integration
- Self-service invoice request functionality
- SSO customization options

## Deprecated Workflow Node Reference Table
| Deprecated Component | Replacement | Key Supported Capabilities |
|----------------------|-------------|------------------------------|
| Workflow "App Call" node | Standalone plugin-style node | Pass global variables, user-uploaded files, matches core plugin functionality |

## Improvements and Bug Fixes
### Key Improvements
- Workflow loop validation to prevent idle spinning and enable fully concurrent branch execution
- Nested workflow execution to prevent parameter pollution
- Data type constraints for select global variables
- Fixed path loading errors during tab switching via node selection updates
- Updated React Markdown component with Base64 image support
- Improved chat dialog performance
- Radio buttons auto-scroll to selected position on open
- Recursive child directory disabling when disabling a dataset collection
- Updated SSE response code handling
- Improved copy functionality without SSL certificates
- Refreshed dataset list and detail page UIs
- Added support for running without network configuration
- Updated .env.template MongoDB documentation for clarity
- Added new payment mode
- Updated default user avatars

### Critical Bug Fixes
- Fixed prompt mode tool calls including `0:` prefix markers in non-stream mode
- Fixed chat log authentication restrictions for app administrators
- Fixed Milvus dataset export failures
- Fixed app copy not copying system configurations
- Fixed overly lenient image recognition URL parsing regex
- Fixed content extraction data type mismatches
- Fixed incorrect workflow run time statistics
- Fixed `undefined` tool call outputs in stream mode
- Corrected Reranker and Home host typographical errors
- Fixed i18n display issues
- Prevented duplicate global variable key definitions
- Fixed global variable persistence failures in Debug mode and via API
- Resolved OpenAPI `detail=false` mode returning tool call results instead of only text
- Fixed repeated dataset tag loading
- Fixed custom separators not applying during web link refetch
- Fixed plugin runtime extra global variable pollution

### Documentation Updates
- Added QA documentation
- Updated feishu.md documentation
- Revised baseURL documentation

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4810)
