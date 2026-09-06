---
title: Resolved Issues in FastGPT 4.14.9 Upgrade
slug: /en/deploy/fastgpt-4-14-9-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149
source_type: Official documentation
---

# Resolved Issues in FastGPT 4.14.9 Upgrade

This document lists all confirmed bug fixes included in the FastGPT 4.14.9 self-hosted upgrade release, covering issues across workflow execution, plugin integration, model invocation, UI rendering, and deployment stability.

## Workflow & Plugin Corrections
This section addresses core workflow and plugin-related issues:
- Fixed missing preservation of plugin execution details when a workflow nested a plugin, and removed all tool-type prefixes from relevant output data.
- Resolved an error where updating and saving an MCP toolkit prevented correct tool calls, caused by an incorrect toolId lookup during initialization.
- Corrected incorrect value substitution in workflow variables that contained special characters (`$.`).
- Fixed a version retrieval error that occurred when referencing an agent tool within a workflow.
- Restored lost form input content in workflow preview mode after re-opening the preview dialog.
- Added missing selectable condition options for the `arrayAny` type in the condition evaluator.
- Fixed missing file link variables in the start node for video/audio custom file type workflows.
- Resolved partial context concatenation errors in AgentV2 workflow execution.

## Model Invocation & API Tooling Fixes
The following table outlines corrected model and API-related issues:
| Fix Category | Specific Resolution |
|--------------|---------------------|
| Model Parameter Cleanup | Removed unsupported model parameters when switching from a model that supports specific parameters to one that does not, eliminating model invocation failures caused by retained invalid parameters. |
| API Dataset Search | Restored the missing search box in the API Dataset file list to improve file discovery. |
| Markdown Rendering | Fixed unescaped user input messages that failed to properly render in Markdown format. |

## UI & Chat History Corrections
This section fixes display and rendering issues for shared links and chat history:
- Corrected incorrect rendering of AI responses in chat history when closing a shared link's display status, ensuring consistent chat log presentation.

## Deployment & Stability Fixes
This section addresses deployment and login-related stability issues:
- Fixed an async session issue in the login endpoint that produced repetitive, unwanted error logs in server outputs.
- Corrected a failure to apply custom fields defined in subscription plans, ensuring correct plan configuration application.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4149)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
