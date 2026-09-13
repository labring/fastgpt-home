---
title: New Plugin Additions and Configurations for FastGPT 4.13.2
slug: /en/deploy/fastgpt-4132-plugin-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132
source_type: Official documentation
---

# New Plugin Additions and Configurations for FastGPT 4.13.2

## Overview
This section details the plugin and system tool updates included in the FastGPT 4.13.2 self-hosted deployment release. The update expands the platform’s native plugin library with 12 specialized tools and introduces a new configurable execution setting for system-level tools.

## New Plugin Tool Additions
The 4.13.2 release adds 12 distinct plugin tools to extend FastGPT’s functionality across multiple use cases:
- Perplexity Search tool
- Base64-to-file conversion tool
- MiniMax TTS file generation tool
- Openrouter Nano Banana image generation tool
- Redis cache operation tool
- Tavily Search tool
- SiliconFlow qwen-image and qwen-image-edit tools
- Lark Multidimensional Table operation suite
- YouTube subtitle extraction
- Alibaba Cloud Bailian qwen image edit
- Markdown-to-PPT tool
- Whisper speech-to-text tool

These new tools cover categories including web search, data conversion, audio processing, image generation, database operations, and document automation, allowing users to build more comprehensive AI workflows.

## System Tool Worker Configuration
Prior to this release, the execution environment for system tools was fixed with no user-adjustable settings. The 4.13.2 update adds support for configuring whether system tools run in a Worker node, enabling more flexible resource allocation for tool execution. The following configuration option is now available for administrators:

| Configuration Option | Purpose |
|-----------------------|---------|
| Worker execution toggle | Enables or disables running system tools within a Worker node |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4132)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
