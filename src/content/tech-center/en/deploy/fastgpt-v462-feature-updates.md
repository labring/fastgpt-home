---
title: Detailed FastGPT V4.6.2 Feature Update Overview
slug: /en/deploy/fastgpt-v462-feature-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/462
source_type: 官方文档
---

# Detailed FastGPT V4.6.2 Feature Update Overview

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Functional Additions
This release includes two new core features. First, full-text indexing is now available, which requires a ReRank model. Work is ongoing to make this feature accessible in the community edition, and the associated model API is somewhat specialized. Second, plugin sources have been added to the platform, though they are not expected to see official production use until the V4.7 or V4.8 software releases.

## Enhanced Document Parsing
PDF parsing functionality has been improved in this update. DOCX file parsing has been refined to convert documents to Markdown format while preserving all embedded images within the converted content.

## Full-Text Indexing Requirements
The following table outlines mandatory requirements and associated notes for enabling full-text indexing in V4.6.2:
| Component | Mandatory Requirement | Additional Notes |
|-----------|-----------------------|------------------|
| Full-text indexing | Included in V4.6.2 | New core search capability |
| Dependent Model | ReRank model | Required for core functionality |
| Model API | Specialized implementation | API has specialized operational needs |
| Community Edition Support | In active development | Planned for future platform releases |

## Text Splitter Function Refinements
The TextSplitter function has been fixed and improved in this release, with refined logic that resolves prior edge-case errors and streamlines text segmentation workflows for document processing and query handling.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/462)
