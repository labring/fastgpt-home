---
title: Resolved Bug Fixes for FastGPT v4.15.0
slug: /en/deploy/fastgpt-v4150-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Resolved Bug Fixes for FastGPT v4.15.0

This document details all resolved bugs, API adjustments, and configuration fixes for the FastGPT v4.15.0 release, for technical engineers and self-hosted operators.

## Bug Fix Breakdown
| Fix ID | Issue Description |
|--------|-------------------|
| 1 | Fixed an issue where a model response error in Agent V2 mode caused steps to execute repeatedly. |
| 2 | Fixed missing charset in text responses when previewing or downloading Dataset source files. |
| 3 | Fixed abnormal default values in Workflow single-node debugging. |
| 4 | Fixed abnormal `defaultConfig` override behavior in model configuration. |
| 5 | Fixed TTS playback errors when adapting to the latest OpenAI SDK. |
| 6 | Fixed oversized chunks that could occur when Dataset data chunks contained code blocks. |
| 7 | Fixed abnormal multimodal file link retrieval from models. |
| 8 | Fixed potential security risks related to the indexing API, HTTP tool parsing, and private S3 object keys. |
| 9 | Fixed abnormal MCP tool expansion for tool calls after interactive nodes. |
|10| Fixed abnormal tool call parameter schemas for array and object types in Workflow tools. |
|11| Fixed UI offset in publish channel portals. |
|12| Fixed the v1/completions API where `quoteList` in `nodeResponse` did not return `q` and `a`. |
|13| Fixed session stream resume issues, including form restoration, file list restoration, node response preservation, duplicate interaction appending, temporary history titles, and cross-app chat leakage. |
|14| Stop-session prompts are now synchronized with the backend generation state, and the warning toast shown during stop has been removed. |
|15| The v1/chat/completions API previously filtered out `q`/`a`/`index` when returning `nodeResponse`; this version restores those fields. |

## API Behavior Updates
Several API endpoints received targeted fixes to improve consistency:
- The v1/completions API now properly returns `q` and `a` fields within the `quoteList` parameter of `nodeResponse` objects.
- The v1/chat/completions API restores the previously filtered `q`, `a`, and `index` fields in `nodeResponse` responses.
- Session stream resume functionality now correctly restores form data, file lists, and node responses, prevents duplicate interaction appending, fixes temporary history title issues, and blocks cross-app chat leakage.
- Stop-session prompts now align with backend generation state, and the on-screen warning toast during stop operations has been removed.

## Configuration and Tooling Fixes
All core platform and tooling issues have been fully resolved:
- Agent V2 mode no longer repeats steps following model response errors.
- Dataset source file previews and downloads now include the correct charset in text responses.
- Workflow single-node debugging uses correct default values instead of abnormal defaults.
- Model configuration `defaultConfig` override behavior now functions as intended.
- TTS playback works correctly with the latest OpenAI SDK.
- Dataset data chunking no longer produces oversized chunks for content with code blocks.
- Multimodal file link retrieval from models operates without abnormal behavior.
- Security risks related to the indexing API, HTTP tool parsing, and private S3 object keys have been mitigated.
- MCP tool expansion for tool calls after interactive nodes functions correctly.
- Workflow tool call parameter schemas for array and object types no longer exhibit abnormal behavior.
- UI offset issues in publish channel portals have been resolved.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
