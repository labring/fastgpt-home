---
title: FastGPT Agent Loop and Workflow Bug Fixes
slug: /en/deploy/fastgpt-agent-loop-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# FastGPT Agent Loop and Workflow Bug Fixes

**Introduction to v4.15.2 Bug Fixes**
This document details critical bug fixes released in FastGPT v4.15.2, focused on resolving agent loop instability, workflow state corruption, and dataset integration issues for self-hosted deployments. All fixes align with core platform behavior for interactive sessions, nested workflows, and execution tracing.

**Key Session & Interaction Fixes**
This category addresses gaps in interactive session resumption and nested workflow ask handling:
1.  Fixed incomplete interactive sessions failing to resume when the `history` parameter is set to 0. Regular requests automatically exclude chat history, but when the most recent conversation round contains an unfinished interaction, FastGPT retains the nearest human-AI pair long enough to detect and restore the interaction before applying the configured history filtering.
2.  Resolved an issue where ask answers in nested workflows were not restored as matching tool responses. New interaction records now use the `askId` field to associate ask calls with subsequent user answers, while legacy `planId` records remain fully readable for backward compatibility.
3.  Fixed a bug where subsequent tools continued executing after an ask call in the same model response paused the agent loop, eliminating unintended tool side effects before the user provides a response.

**Workflow State & Error Handling Fixes**
These fixes improve reliability of nested workflow execution and error visibility:
1.  Eliminated duplicate tool responses and workflow plan snapshots after resuming a child interaction. Tool results are now updated in-place using the `toolCallId` identifier, and workflow plans are updated via `planId`, preventing duplicate tool cards or plan entries after a page refresh.
2.  Ensured parent-node execution errors are no longer hidden when a workflow node generates child execution details. Parent errors are now preserved in SSE events, final workflow results, and execution traces for full visibility.
3.  Fixed an issue where `workflowDispatchDeep` was not restored if the workflow observer failed before dispatch began, preventing subsequent workflows from inheriting an incorrect nesting depth.

**Dataset Search Compatibility Fix**
Addressed a bug where Agent Dataset search operations failed to read split dataset parameters from the main workflow. This update adds full compatibility with the latest Dataset search parameter structure, ensuring consistent behavior between main and nested workflow data retrieval.

**Relevant Configuration & Field Reference**
The following parameters and identifiers are modified or stabilized in this release:
| Parameter/Field Name    | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `history`               | Controls chat history inclusion in requests; set to 0 to exclude all history |
| `askId`                 | Unique identifier linking ask calls to their corresponding user answers  |
| `planId`                | Legacy workflow plan tracking identifier, maintained for backward compatibility |
| `toolCallId`            | Unique identifier for in-place updates of tool call execution results    |
| `workflowDispatchDeep`  | Tracks current workflow nesting depth to ensure correct execution state |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
