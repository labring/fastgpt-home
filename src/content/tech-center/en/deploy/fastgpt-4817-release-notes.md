---
title: FastGPT 4817 Full Official Release Notes
slug: /en/deploy/fastgpt-4817-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4817
source_type: 官方文档
---

# FastGPT 4817 Full Official Release Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core New Features
This release adds targeted functionality for workflow expansion, commercial deployment, and analytics:
- Simple Mode tool calls now support array-type plugins, enabling structured data handling for integrated third-party tools.
- Workflow auto-save on abnormal exit prevents permanent loss of unsaved workflow configurations during unexpected crashes or interruptions.
- Commercial edition administrators can configure the official template marketplace directly through the admin panel, simplifying template distribution across teams.
- Commercial edition admins may set custom workflow variables to support business system authentication integration, enabling secure cross-system workflow connectivity.
- The search test API now supports query rewriting, improving search result relevance for natural language user queries.
- Workflow token tracking splits input and output tokens separately for granular cost monitoring, with a critical fix for billing systems that failed to record output tokens for some prior requests.

## LLM Parameter & UI Configuration Updates
This section includes revised model parameter controls and usability improvements:
LLM model parameters now support disabling both `max_tokens` and `temperature` fields, giving deployments full control over exposed model settings. A reference table for the updated parameter behavior is below:
| Parameter | Previous Behavior | Current Behavior |
|-----------|-------------------|------------------|
| `max_tokens` | Mandatory fixed input field | Optional field, can be fully disabled |
| `temperature` | Mandatory fixed input field | Optional field, can be fully disabled |

Additional improvements include:
- Markdown size check updated: content exceeding 200K characters no longer uses the Markdown component, eliminating application crashes from large markdown content.
- Dataset search parameters: slider controls now support direct manual input, allowing for more precise parameter adjustment beyond standard slider snap points.
- The available models display UI has been revised for improved readability and faster load times.
- MongoDB queries now include virtual fields, expanding data query flexibility for custom dataset integrations.

## Resolved Bug Fixes
Four critical and minor bugs are resolved in this release:
- Fixed an issue where the File response API omitted the `Content-Length` header, causing Alibaba vision models to fail image recognition when uploading files from cross-origin sources.
- Removed hidden leading and trailing line breaks from condition node strings, fixing condition evaluation failures caused by unintended whitespace.
- Fixed a variable update node bug where non-string data types could not be automatically converted when manually entering update content.
- Resolved an issue where Doubao models were unable to execute tool calls properly.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4817)
