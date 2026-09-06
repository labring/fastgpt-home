---
title: FastGPT V4.6.5 New Features and Fixes
slug: /en/deploy/fastgpt-v465-feature-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/465
source_type: 官方文档
---

# FastGPT V4.6.5 New Features and Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Workflow Nodes
This release adds four dedicated workflow automation nodes with official documentation guides:
1. [Query Rewriting Node](../../../guide/build/workflow/nodes/coreferenceResolution.en.mdx): Refines user input queries to enhance retrieval accuracy and response relevance within workflow pipelines
2. [Text Editor Node](../../../guide/build/workflow/nodes/text_editor.en.mdx): Supports in-line text manipulation, formatting, and content transformation for intermediate workflow steps
3. [Classifier Node](../../../guide/build/workflow/nodes/tfswitch.en.mdx): Routes workflow execution paths based on predefined content classification criteria
4. [Custom Feedback Node](../../../guide/build/workflow/nodes/custom_feedback.en.mdx): Enables structured user feedback collection to iterate on workflow output quality

## Enhanced Content Extraction Node
The existing Content Extraction node receives two critical functional updates, summarized in the parameter table below:
| Parameter | New Supported Capability |
|-----------|---------------------------|
| Model Selection | Allows selection of a dedicated model for content extraction tasks, replacing the fixed default model |
| Field Enumerations | Permits definition of explicit output fields to structure extracted content into predefined, standardized categories |

## Parsing and Performance Optimizations
Two key infrastructure and document parsing improvements are included:
1. DOCX document parsing now supports conversion of embedded tables to Markdown format, preserving structured table data from source DOCX files with greater accuracy
2. Resolved a CPU-intensive thread blocking issue caused by the html2md processing pipeline, eliminating unexpected resource contention during HTML-to-Markdown conversion workflows

## Bug Resolutions
This release addresses two key workflow interface and functionality issues:
1. Fixed inaccurate or incomplete prompt extraction descriptions within the advanced orchestration interface, correcting context gaps for prompt-based workflow steps
2. Improved advanced orchestration connection line interactions to streamline visual workflow design and reduce user friction when building complex pipelines

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/465)
