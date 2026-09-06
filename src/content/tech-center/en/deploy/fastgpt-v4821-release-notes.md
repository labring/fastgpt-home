---
title: FastGPT Version 4821 Full Release Notes
slug: /en/deploy/fastgpt-v4821-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4821
source_type: 官方文档
---

# FastGPT Version 4821 Full Release Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Core Features
This update delivers targeted functional enhancements:
- Plugin inventory now includes clear indicators for deprecated and deleted plugins
- Chat logs support source categorization, title-based search, and full export capabilities
- Global variables can be reordered via intuitive drag-and-drop actions
- New official model presets: Doubao 1.5 and Alibaba Embedding v3
- Vector models now support normalization configuration for unnormalized models such as Doubao embeddings
- AI chat nodes can output and share thinking process results with downstream workflow nodes
- Embedded chat widget automatically adapts to window positioning
- LLM models now support three additional configurable parameters

## Configurable LLM Model Parameters
The following newly supported parameters are available for LLM model configuration:
| Parameter Name | Functional Purpose |
|----------------|-------------------|
| `top_p` | Nucleus sampling probability threshold for model output control |
| `response_format` | Defines the desired output format for model responses |
| `json_schema` | Enforces JSON schema validation for structured model outputs |

## Usability & Privacy Improvements
Several quality-of-life and privacy-focused updates are included:
- Improved error messaging for unconfigured LLM or embedding models to streamline troubleshooting
- Added support for non-streaming mode thinking process output
- Implemented null pointer protection for unconfigured TTS voice settings to prevent crashes
- Switched markdown link parsing to strict matching mode to reduce false positive detections
- Reduced data fetch scope for unauthenticated users to enhance system privacy

## Resolved Bug Fixes
This update addresses the following stability and functionality issues:
- Fixed Simple Mode: switching to a non-vision model now correctly disables image recognition
- Resolved o1/o3 model field mapping failure during testing, which previously caused runtime errors
- Fixed null pointer exception in WeChat Official Account chat integration
- Corrected incorrect display of multiple audio and video file attachments
- Fixed share link authentication error that caused infinite redirect loops

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4821)
