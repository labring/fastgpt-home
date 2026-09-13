---
title: FastGPT v4.16.2 Official New Feature Details
slug: /en/deploy/fastgpt-v4162-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162
source_type: 官方文档
---

# FastGPT v4.16.2 Official New Feature Details

## User Experience and Core Administration Updates
This release includes three key user-facing and administrative enhancements. First, full Korean language support is now available for the FastGPT platform interface, expanding localization for regional user bases. Second, a native account deletion workflow has been added, allowing authorized users to permanently remove their account data directly through the platform’s user settings. Third, a critical overwrite warning prompt now triggers when switching Skill versions, preventing accidental data loss by confirming user intent before overwriting existing skill configurations.

## Workflow Toolkit Team Reuse Capability
A new configuration option has been added to the Team toolkit for creating Workflow Tools: users can now select an existing deployed App to reuse its pre-built application logic, rather than building workflows from scratch. This reduces redundant development work and streamlines team-based workflow creation by leveraging already validated application configurations.

## Document Parsing and Search Optimizations
### Supported Document Formats
The updated document parser now supports an expanded set of file formats, as detailed in the table below:
| File Category       | Supported Extensions |
|---------------------|----------------------|
| Word Processing Files | `.doc`, `.wps`, `.docm` |
| Presentation Files | `.ppt`, `.pps`, `.pot`, `.pptm`, `.ppsx`, `.ppsm` |
| Spreadsheet Files | `.xls`, `.xlsm`, `.xlsb` |
| OpenDocument Formats | `.odt`, `.ods`, `.odp` |
| Rich Text and E-books | `.rtf`, `.epub` |
During parsing, embedded images are extracted and uploaded to the configured object storage, with their secure references retained in the final parsed output. For unsupported image representations, the parser automatically falls back to extracting only parseable text content.

### BM25 Full-Text Search Integration
When Milvus is configured as the vector store for the FastGPT deployment, this release adds BM25 full-text search backed by the single-table `modeldata_v2` design. This optimized backend structure improves indexing efficiency and query response times for full-text search operations within the platform.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162)
