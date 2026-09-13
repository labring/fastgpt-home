---
title: FastGPT v4820 Feature and Fix Updates
slug: /en/deploy/fastgpt-v4820-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4820
source_type: 官方文档
---

# FastGPT v4820 Feature and Fix Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Feature Additions
This release includes several high-impact new features for self-hosted FastGPT deployments:
1. **Visual model parameter configuration**: Replaces the legacy config file workflow, with over 100 pre-built model presets and one-click testing support for all model types. Full in-page channel configuration is planned for a future release; refer to the [model configuration guide](../../config/model/intro.en.mdx) for setup steps.
2. Native support for DeepSeek Reasoner model thinking process output
3. Usage record export functionality and dedicated dashboard for deployment monitoring
4. Markdown syntax extension for embedding audio and video via `audio` and `video` code blocks
5. Revised `max_tokens` calculation logic, detailed in a dedicated section below.

## System Behavior Improvements
Multiple backend and frontend behaviors have been refined to improve reliability and usability:
- Query rewriting now includes context filtering to prevent exceeding model context limits
- Page component extraction has been optimized to reduce unnecessary page component routing overhead
- Full-text search now operates in a case-insensitive manner
- QA generation and enhanced indexing workflows use streaming output to avoid timeout errors with certain large language models
- Automatic handling of empty assistant `content` fields (adds `null` value) and merging of consecutive text assistant messages to prevent parsing errors from unsupported model response formats
- Updated image host handling: Applies domain prefixes during conversation send instead of upload, eliminating broken image links following domain configuration changes.

## Updated Parameter Logic
The `max_tokens` parameter behavior has been adjusted to prioritize user-configured values, with clear context management:
| Parameter Name | Updated Core Behavior | Practical Example |
|----------------|------------------------|-------------------|
| `max_tokens` | Prioritizes the explicitly configured value; reduces conversation history length if the request exceeds the model's maximum context limit | A request specifying 8000 `max_tokens` will trim the conversation context to accommodate the specified token limit. |

## Resolved Bug Fixes
Two critical deployment issues have been fixed in this release:
- Member list bottom-loading functionality now works correctly in all supported scenarios
- Workflow recursive execution failures under specific conditional states have been resolved.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4820)
