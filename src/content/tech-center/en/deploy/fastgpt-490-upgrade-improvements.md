---
title: Key Technical Improvements for FastGPT 490 Upgrade
slug: /en/deploy/fastgpt-490-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490
source_type: 官方文档
---

# Key Technical Improvements for FastGPT 490 Upgrade

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Unlimited Dataset Indexing
Previously, FastGPT dataset indexing included a hard limit on custom index creation. This update removes that restriction, enabling unlimited custom indexes for dataset configuration. Input text indexes, which are automatically generated during dataset ingestion, will now update independently without disrupting existing custom indexes, eliminating manual reconfiguration overhead after index updates.

## Markdown Parsing Quality Fixes
The markdown parsing engine has been updated to handle Chinese-language content more accurately. The new logic detects Chinese punctuation characters placed immediately after hyperlinks and inserts consistent spacing between the link and following punctuation, improving readability of formatted documentation and chatbot responses that include both links and Chinese text.

## Core Feature & API Optimizations
### Prompt-Mode Tool Calls
Prompt-mode tool calls now natively support reasoning models, expanding compatibility for workflows combining logical reasoning with external tool integrations. Enhanced format validation for tool call outputs also reduces instances of empty or malformed responses, leading to more reliable tool execution.

### HTTP Body Adaptation
FastGPT’s HTTP request handling has been updated to support string object types in HTTP request bodies, broadening compatibility with third-party tools and custom integrations that use this data format.

## Backend Performance Improvements
Two key backend changes have been implemented to streamline large file handling: first, MongoDB file read streams have been merged to reduce redundant computational overhead. Second, storage chunk handling has been optimized to speed up large file retrieval. These changes result in significantly faster read times for large documents; specifically, the read time for 50MB PDF files is improved threefold.

### Quick Reference Improvement Table
| Improvement Category          | Specific Implementation Details |
|--------------------------------|----------------------------------|
| Dataset Indexing                | Unlimited custom indexes allowed; auto-updated input text indexes do not impact custom indexes |
| Markdown Parsing                | Detects Chinese punctuation after links and adds proper spacing |
| Prompt Tool Calls               | Supports reasoning models; enhanced format detection reduces empty outputs |
| File Read Performance           | Merged Mongo file read streams; optimized storage chunks for faster large file reads (50MB PDF read time improved 3x) |
| HTTP Body Adaptation            | Adds support for string object types |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490)
