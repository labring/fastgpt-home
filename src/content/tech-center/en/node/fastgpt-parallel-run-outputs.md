---
title: Understand FastGPT Parallel Run Node Outputs
slug: /en/node/fastgpt-parallel-run-outputs
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Understand FastGPT Parallel Run Node Outputs

## Overview of Parallel Run Node Outputs
The Parallel Run node executes multiple concurrent instances of a configured workflow task, and its output schema provides structured, predictable data to manage task results, filter failures, and implement conditional workflow logic. All output fields preserve the order of the original input tasks, ensuring consistent downstream processing.

## Output Parameter Reference
The following table defines all available outputs from the Parallel Run node:
| Output          | Type            | Description                                                                                                                                                |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Success Results | `Array<any>`    | Outputs of successful tasks only, ordered by input index. Failed items are filtered out. **This is what you usually reference downstream.**                |
| Full Results    | `Array<object>` | Has the **same length as the input**. Each item is `{ success, message, data }`: on success `success=true` and `data` is the value; on failure `success=false`, `message` holds the error and `data` is `null` |
| Status          | `string`        | Overall status: `success` (all succeeded), `partial_success` (some failed), `failed` (all failed). Useful for branching                                    |

## Practical Usage Guidelines
Each output field serves a distinct workflow purpose:
1. **Success Results**: This is the primary output for most downstream workflow steps, as it automatically excludes failed task runs and retains only valid, successful data in input order.
2. **Full Results**: Use this output when you need complete visibility into every task’s outcome, including failures. Since the array length matches the number of input tasks, you can map each result entry back to its original input task for auditing or error reporting.
3. **Status Field**: The top-level status string enables conditional branching. For example, route workflows to different sub-processes based on whether all tasks succeeded, some failed, or all failed, using the predefined `success`, `partial_success`, and `failed` values.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
