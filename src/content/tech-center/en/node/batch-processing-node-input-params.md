---
title: Configure Batch Processing Node Input Parameters
slug: /en/node/batch-processing-node-input-params
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop
source_type: Official documentation
---

# Configure Batch Processing Node Input Parameters

## Batch Processing Node Input Overview
The FastGPT Batch Processing workflow node enables iterative execution of a custom sub-flow over a structured collection of data. This document details the mandatory input parameters required to configure the node for reliable operation, as defined in the official FastGPT workflow documentation. All parameters listed below are required for the node to function as intended.

## Required Input Parameters
The Batch Processing node has two mandatory core input parameters:
| Input Name | Supported Data Types | Mandatory Status | Description |
|------------|----------------------|------------------|-------------|
| Array | `Array<string>`, `Array<number>`, `Array<boolean>`, `Array<object>` | Required | The collection of data items to iterate over during each loop cycle. Every entry in the connected array will trigger one full run of the defined loop body sub-flow. |
| Loop Body | N/A | Required | Defines the sub-flow executed for every individual array item. The loop body must be bounded by two specific nodes: Loop Body Start (marks the beginning of the per-iteration workflow) and Loop Body End (marks the end of the per-iteration workflow). The Loop Body End node includes an optional output variable for passing processed iteration data out of the loop. |

## Step-by-Step Input Configuration
1. Add a Batch Processing node to your FastGPT workflow canvas.
2. Connect a compatible upstream data source to the Array port of the Batch Processing node. Confirm the connected data matches one of the supported array types listed in the parameters table to avoid configuration errors.
3. Construct the loop body sub-flow:
   a. Place a Loop Body Start node immediately adjacent to the Batch Processing node to mark the start of the per-iteration processing logic.
   b. Add all required workflow nodes to implement the per-item processing tasks between the Loop Body Start and Loop Body End nodes.
   c. Place a Loop Body End node after the final processing step to close the iteration loop. If you need to export processed data from each loop cycle, enable and configure the optional output variable on the Loop Body End node.
4. Validate that both mandatory inputs are connected and the loop body sub-flow is properly bounded by the start and end markers.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
