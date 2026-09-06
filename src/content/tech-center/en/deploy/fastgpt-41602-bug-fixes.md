---
title: Bug Fixes for FastGPT 4.16.02 Self-Hosted
slug: /en/deploy/fastgpt-41602-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41602
source_type: 官方文档
---

# Bug Fixes for FastGPT 4.16.02 Self-Hosted

This document details all bug fixes included in the FastGPT 4.16.02 self-hosted upgrade, addressing functional and stability issues across workflow tools, file handling, cloud storage, and data security.

## Quick Reference Fix Table
The following table summarizes each resolved issue for quick lookup:
| Component Category       | Resolved Bug                                                                 |
|--------------------------|--------------------------------------------------------------------------------|
| Workflow HTTP Tools      | Correctly restores default input mode for dynamic legacy HTTP tool parameters  |
| Workflow UI & Translations | Fixes incorrect initial configuration labels by preloading workflow translations during app creation |
| Workflow Parameter Rendering | Eliminates duplicate rendering of workflow tool parameters |
| Published App File Variables | Restores valid upload functionality for file variables after an app is published |
| Shared Workflow Tools | Fixes failed file uploads for shared workflow tool parameters |
| S3 Cloud Storage | Resolves upload, parsing, preview, or download failures when S3 object keys or filenames contain spaces or special characters including `%`, `#`, `?`, and slashes |
| System Default Models | Adds missing sensitive data filtering to prevent model API keys, request URLs, and internal configuration from being returned in system initialization responses |

## Workflow Tool and UI Improvements
This upgrade addresses multiple workflow-related bugs to improve user experience and reliability. Legacy HTTP workflow tools now properly restore the default input mode for dynamic parameters, eliminating unexpected behavior when reloading or editing workflow configurations. Workflow translation assets now preload automatically when creating a new app, resolving the prior issue of incorrect initial configuration labels for workflow elements. Additionally, duplicate rendering of workflow tool parameters is fully fixed, reducing visual clutter and ensuring consistent UI rendering for workflow tool settings.

## File and Cloud Storage Fixes
Two key fixes target file handling and cloud storage operations. First, file variables now accept valid uploads after an application is published, restoring core file-based functionality for deployed apps. Second, shared workflow tool parameters no longer fail during file uploads, enabling consistent cross-team use of shared workflow components. For S3 cloud storage, all file operations including upload, parsing, preview, and download now work correctly when object keys or filenames include spaces or special characters such as `%`, `#`, `?`, and slashes, resolving failed operations for users with non-standard file naming conventions.

## Sensitive Data Security Fix
A critical security update adds missing sensitive data filtering for system default models. Previously, sensitive details including model API keys, request URLs, and internal configuration data were exposed in system initialization responses; this fix ensures such data is properly filtered and not returned in these responses, enhancing the security of self-hosted FastGPT deployments.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41602)
