---
title: Resolved Bugs for FastGPT 4.14.0 Upgrade
slug: /en/deploy/fastgpt-4140-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140
source_type: Official documentation
---

# Resolved Bugs for FastGPT 4.14.0 Upgrade

## Overview
This document details all resolved software bugs included in the FastGPT 4.14.0 self-hosted upgrade, covering core application logic, workflow operations, UI interactions, and cloud storage integrations. All fixes address issues reported in prior FastGPT versions to improve system stability and user experience.

## Core Application Fixes
Several critical core application bugs were resolved in this release:
- The prompt editor now correctly parses content containing special syntax, eliminating previous parsing failures.
- Claude tool call execution no longer fails due to parameter errors caused by indices starting at 1.
- S3 storage avatar deletion no longer throws runtime errors when using an empty deletion key, preventing workflow process blockages.
- Exported chat logs now include all user and assistant feedback records, fixing the prior gap in complete log exports.

## Workflow and UI Interaction Fixes
Workflow and user interface issues were addressed to improve operational reliability:
- Workflow dependencies now refresh immediately when upstream input or output configurations are modified, resolving prior delayed refresh issues.
- The cursor no longer jumps to the end of the input field when typing in the workflow welcome message configuration box.
- Combining interactive nodes with consecutive batch execution no longer causes workflow logic errors.
- Edit history snapshot functionality is restored after performing a workflow Redo operation, fixing the prior inability to push new snapshots.
- HTTP custom input configurations are no longer lost during workflow saves or reloads.

## Quick Reference Bug Fix Table
| Bug Category               | Resolution Details                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------|
| Prompt Editor Parsing       | Correctly handles content with special syntax                                        |
| Claude Tool Calls           | Fixes parameter errors from 1-indexed tool call indices                              |
| S3 Avatar Deletion          | Eliminates workflow blockages from empty deletion keys                               |
| Workflow Dependencies       | Real-time refresh on upstream I/O changes                                           |
| Exported Chat Logs          | Includes full feedback records in exports                                            |
| Welcome Message Input       | Stops cursor jumping to input end during typing                                      |
| Interactive Batch Runs      | Resolves workflow logic errors from combined interactive nodes and batches           |
| Redo Operation History      | Restores edit history snapshot functionality post-Redo                              |
| HTTP Custom Input           | Prevents loss of custom input configurations                                        |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4140)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
