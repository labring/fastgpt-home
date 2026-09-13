---
title: FastGPT 496 Update New Feature Details
slug: /en/deploy/fastgpt-496-update-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496
source_type: 官方文档
---

# FastGPT 496 Update New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## MCP Integration Enhancements
FastGPT now supports external programmatic invocation of deployed applications via the MCP protocol, enabling third-party systems to integrate FastGPT workflows directly into their existing toolchains. Additionally, users can now create custom tools using the MCP Server-Sent Events (SSE) protocol, which supports real-time, event-driven tool execution within FastGPT workflows. This update expands the platform’s interoperability with external services and custom tooling without requiring custom API wrapper development.

## Batch Execution Node Human-in-the-Loop Support
Prior to this update, batch execution nodes did not allow interactive steps during individual loop iterations. The 496 update adds native support for interactive nodes within the batch execution node, meaning each cycle of the batch process can pause to solicit human input before proceeding. This is ideal for workflows that require manual validation, such as curated content generation or sensitive data approval, where automated processing alone cannot meet quality or compliance standards. Users can configure interactive nodes to trigger at any point within a batch loop, ensuring full human oversight at scale.

## UI Restructuring and New Model Presets
Two critical usability and functionality updates are included here:
First, the platform has introduced a secondary Studio menu, with the toolbox functionality merged into this new menu to simplify navigation. Previously, users needed to navigate multiple nested menus to access the toolbox; now it is directly accessible within the dedicated secondary Studio menu, reducing click-through time for common workflow tasks.
Second, the system now includes pre-built system configuration presets for four new large language models: grok3, GPT4.1, o-series, and Gemini 2.5. These presets standardize model integration parameters, eliminating manual setup for users looking to leverage these models in their FastGPT applications. A summary of the new model configurations is below:

| Model Name          | Supported System Configuration |
|---------------------|--------------------------------|
| grok3               | LLM model preset               |
| GPT4.1              | LLM model preset               |
| o-series            | LLM model preset               |
| Gemini 2.5          | LLM model preset               |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/496)
