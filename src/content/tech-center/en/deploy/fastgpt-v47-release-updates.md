---
title: FastGPT V4.7 Technical Release Updates
slug: /en/deploy/fastgpt-v47-release-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47
source_type: 官方文档
---

# FastGPT V4.7 Technical Release Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT V4.7 Technical Release Updates

## New Feature Additions
This release delivers targeted new capabilities for self-hosted FastGPT deployments:
- A tool calling node that allows LLMs to dynamically select workflow nodes or plugins based on user intent
- Updated classification and content extraction tools to support functionCall mode for compatible LLMs
- A new HTTP plugin for rapid plugin generation via OpenAPI specifications
- Expanded ReRank model compatibility to support Cohere's official rerank format
- Helm chart installation support for streamlined Kubernetes-based deployments
- Native variable substitution support for HTTP URLs

## Configuration Parameter Reference
For LLM models that support functionCall but not native toolCall, use the following explicit configuration settings:
| Configuration Field | Accepted Value | Usage Note |
|---------------------|----------------|------------|
| `functionCall`      | `true`         | Enables function call mode for supported LLMs |
| `toolChoice`        | `false`        | Disables explicit tool selection, uses default functionCall behavior |
Set `toolChoice: true` to switch to explicit tool selection mode instead.

## Bug Fixes & Operational Improvements
This release resolves critical and quality-of-life issues, plus enhances core performance:
- Restored proper functionality of community edition rerank model selection
- Fixed a bug where HTTP request bodies sent `undefined` when unused, causing failures for some GET requests
- Corrected extraction prompt hallucinations introduced in V4.6.9
- Fixed non-functional PG HNSW vector indexes, with a note that minor precision loss may occur; refer to the official PgVector documentation for index tuning guidance
- Resolved Safari browser voice input functionality issues
- Fixed frontend crashes caused by special regex characters in custom split rules
- Improved advanced workflow editor performance
- Extracted the workflow controller into separate packages for improved maintainability
- Refined manual dataset input and variable input dialogs for better usability
- Updated Docker deployment to auto-initialize replica sets
- Added automatic encoding detection for browser file reading to reduce garbled text output

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47)
