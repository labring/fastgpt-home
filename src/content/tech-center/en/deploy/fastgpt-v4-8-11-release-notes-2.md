---
title: Official FastGPT v4.8.11 Release Notes
slug: /en/deploy/fastgpt-v4-8-11-release-notes-2
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# Official FastGPT v4.8.11 Release Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Workflow & UI Enhancements
This release adds core workflow tools and polish: a Form input node for runtime data entry, a Loop execution node for batch array processing (limited to 50 serial items), and collapsible workflow nodes. Simple Mode now includes a local change history recording mode. UI improvements include scroll-based chat history loading (replacing the 30-message limit), a trackpad-priority mode toggle in the workflow canvas bottom-right corner, right-click comment addition, and auto-selection of the user question as the initial value for some nodes. Performance and safety updates include a 20-level workflow nesting limit to prevent configuration-induced infinite loops, improved workflow handler performance, and fixed shortcut behavior (no copy/undo triggers during debug testing). Additional polish includes removed extra `#` characters when copying workflow nodes, normal textarea scrolling instead of zooming, trimmed leading/trailing spaces from input fields, stream output persistence across browser tabs, return to the last remembered tab on workflow re-entry, and prompt editor dynamic height expansion with auto-complete tool descriptions. The workflow canvas also prevents trackpad browser zoom.

## Model, API & Sandbox Configurations
New model support and API improvements are included: OpenAI o1 models are now supported, requiring a `defaultConfig` override to set `temperature`, `max_tokens`, and `stream` (o1 does not support streaming mode). The sandbox adds the global `strToBase64` string-to-Base64 method. AI chat node dataset citations now default to `role=system`, except for nodes with pre-configured custom prompts which retain `role=user`. Other API fixes include resolved `createDataset` API `intro` field assignment, enhanced external dataset APIs, and proper handling of hyperlinks starting with `//`. A parameter table for o1 model setup is below:
| Configuration Field | Required Setting | Notes |
|----------------------|------------------|-------|
| `defaultConfig`      | Override target parameters | Must set `temperature`, `max_tokens`, and `stream` |
Updated documentation includes `configuration.md` revisions, and iOS Safari voice input accuracy is improved.

## Plugin & Child App Updates
Plugin system expansions include support for uploading system files and designating specific fields as tool responses. A dedicated Tool call parameter node enables fully custom tool call parameter declarations, plus a BI chart plugin and Surya OCR recognition node example. Child app nesting now supports non-stream mode configuration; Simple Mode can select workflows as plugins, and always enforces non-stream mode for child app calls. Debug mode returns detailed execution data for child app calls, and all nested child app logs are preserved across modes. Chat logs now display team members, and the commercial edition adds team member group management. The Jest unit testing framework is also added to the codebase.

## Resolved Bug Fixes
Critical and minor bugs are resolved, including dataset selection permission issues, errors triggered by empty `chatId` session starts with user selections, null `function` and `type` fields in toolCall during stream mode with toolChoice, non-synced site custom separators, tool call history storage issues, infinite redirect loops on the chat page, non-persisting global variables across tool calls, incorrect rerank documentation URLs, and chat dialog rendering performance issues.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811)
