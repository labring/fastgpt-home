---
title: FastGPT 4823 Bug Fix Details
slug: /en/deploy/fastgpt-4823-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4823
source_type: 官方文档
---

# FastGPT 4823 Bug Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT 4823 Patch Overview
This document covers the official bug fixes included in the FastGPT 4823 self-hosted update, as sourced directly from the official release notes. All fixes address core platform functionality gaps and errors, with no unlisted changes included. The patch resolves six distinct issues impacting dataset management, team collaboration, file parsing, and search indexing for self-hosted FastGPT deployments.

## Bug Fix Reference Table
| Affected Feature | Reported Issue | Resolution |
|------------------|----------------|------------|
| Dataset Subfolder Tag Filtering | Tag filtering failed to work correctly for nested subfolders | Corrected tag filter logic for nested directory structures |
| Markdown Document Parsing | Link splitting errors occurred during markdown reading | Temporarily reverted optimized markdown reading processing |
| Team Member Management | Team member list did not refresh after a user left the team | Fixed real-time synchronization logic for team member lists |
| PPTX File Parsing | Encoding errors caused PPTX file parsing failures | Corrected PPTX file encoding handling during parsing workflow |
| Dataset Full-Text Indexing | Full-text indexes remained after deleting individual dataset data entries | Added automated index cleanup logic for single dataset entry deletions |
| MongoDB Dataset Query Indexing | Mongo Dataset text indexes failed to take effect during data queries | Corrected MongoDB text index configuration and activation logic |

## Key Fix Impact Summary
Each resolved fix targets a specific functional pain point for FastGPT users. The subfolder tag filter fix improves organization of hierarchical dataset collections, the markdown parsing fix prevents broken link rendering in uploaded documents, the team member list fix ensures accurate visibility of active team participants, the PPTX parsing fix restores reliable ingestion of PowerPoint files, the full-text index cleanup fix prevents unused index data from accumulating in the database, and the MongoDB index fix ensures that search queries for dataset entries use the intended text indexes correctly.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4823)
