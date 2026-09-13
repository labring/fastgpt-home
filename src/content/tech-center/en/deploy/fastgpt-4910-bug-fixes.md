---
title: FastGPT 4910 Targeted Bug Fix Details
slug: /en/deploy/fastgpt-4910-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910
source_type: 官方文档
---

# FastGPT 4910 Targeted Bug Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT 4910 Targeted Bug Fix Details

This page documents the targeted bug fixes included in the FastGPT 4910 platform update, resolving seven distinct functional and display inconsistencies across core workflows. All changes are limited to fixing reported issues without adding new platform features.

## Categorized Resolved Issues
The fixed issues span six platform functional areas:
- Multi-dataset full-text search score sorting
- Streaming chat response `finish_reason` metadata capture
- Tool call mode reasoning output persistence
- Dataset `indexSize` parameter application
- Two-level nested workflow preview citation rendering
- XLSX-to-Markdown conversion leading space formatting
- Markdown file Base64 image extraction and storage

## Step-by-Step Verification Checks
To confirm each fix is active after upgrading to FastGPT 4910, run these targeted validation steps:
1.  **Multi-dataset Search**: Execute a cross-dataset full-text search, then verify results are sorted by relevance score in the correct order.
2.  **Stream Response Metadata**: Enable streaming chat mode, then check that the `finish_reason` field in the response payload matches the expected completion state.
3.  **Tool Call Reasoning**: Use tool call mode in a test workflow, run a prompt, and confirm reasoning output is saved to chat history or logs.
4.  **`indexSize` Parameter**: Edit a dataset’s index settings, set a custom `indexSize` value, save changes, and verify the setting persists in the dataset overview.
5.  **Nested Workflow Citations**: Build a workflow with 2 levels of nesting, run a test, and confirm preview citations and context display correctly.
6.  **XLSX Conversion**: Upload an XLSX file, convert to Markdown, and check no extra leading spaces appear in the output.
7.  **Base64 Image Handling**: Upload a Markdown file with embedded Base64 images, confirm images are extracted and stored correctly.

## Critical Fix Context
Several fixes address commonly reported configuration and workflow pain points: the `indexSize` parameter now correctly applies configured values, eliminating the prior issue where custom index settings failed to take effect. The stream response fix resolves cases where incorrect `finish_reason` values were captured during streaming sessions, while the tool call mode fix ensures reasoning output is no longer lost during workflow execution.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910)
