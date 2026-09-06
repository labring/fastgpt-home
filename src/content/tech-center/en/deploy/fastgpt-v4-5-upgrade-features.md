---
title: FastGPT V4.5 New Features and Improvements
slug: /en/deploy/fastgpt-v4-5-upgrade-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45
source_type: 官方文档
---

# FastGPT V4.5 New Features and Improvements

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core Performance Enhancements
This release includes two key performance-focused upgrades. First, the PgVector extension has been upgraded to support HNSW indexing, which delivers improved dataset search speed for vector-based queries commonly used in FastGPT’s retrieval-augmented generation workflows. Second, the TextSplitter component has been updated to use a recursive splitting approach, replacing the previous splitting logic to more effectively break down large text inputs into appropriately sized chunks for model processing, reducing errors during text parsing and improving overall content retrieval accuracy.

## Workflow Feature Updates
Several workflow-related improvements expand customization and control:
1. The AI Chat node now includes a new toggle option labeled "Return AI Content". This setting allows users to prevent AI-generated responses from being sent directly to the browser, enabling custom routing or processing of AI output within complex workflows—such as saving responses to an external database before displaying content to end users. A reference table for this field is below:
| Field Name | Control Type | Functional Purpose |
|------------|--------------|--------------------|
| Return AI Content | Boolean Toggle | Disables direct browser delivery of AI response content |
2. The Question Classifier node now supports selecting from a list of available models, letting users choose the optimal model for their specific classification tasks instead of relying on a fixed default.
3. Advanced orchestration UX performance has been improved, reducing processing delays for multi-step workflow executions and streamlining the user interface for workflow configuration.

## Resolved Bug Fixes
A critical authentication issue affecting shared links has been fixed. This update resolves cases where shared dataset or chat links failed to properly validate user access permissions, ensuring secure and consistent access to shared FastGPT resources without unexpected access denials or unauthorized viewing.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45)
