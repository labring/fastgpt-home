---
title: Configure FastGPT Workflow Loop Body Parameters
slug: /en/node/fastgpt-workflow-loop-body-config
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop
source_type: Official documentation
---

# Configure FastGPT Workflow Loop Body Parameters

## Loop Body Core Overview
The FastGPT workflow loop node’s body configuration section defines the operational logic executed during each individual loop iteration. The included reference image displays the standard layout of this configuration panel.
![Loop body configuration](/imgs/fastgpt-loop-node-config.webp)
This section allows users to assemble a full workflow sub-flow within the loop structure, with all supported nodes operating independently during every pass of the loop.

## Supported Loop Body Node Types
Any compatible FastGPT workflow node can be added directly within the loop body. Confirmed supported node types include:
- AI Chat node
- HTTP Request node
- Content Extraction node
- Text Processing node, etc.
Each integrated node will run once per loop iteration, enabling tailored iterative processing logic to be built without restrictions on the type of workflow node used.

## Loop End Node Configuration
Proper configuration of the Loop Body End node is required to capture and aggregate loop iteration results. Follow these exact steps aligned with platform defaults:
1. Access the configuration panel for the Loop Body End node.
2. Use the provided dropdown menu to select the desired output variable for the current loop iteration.
3. Verify that the selected variable is marked as the collected result for the active loop iteration.
4. Understand that all results from individual loop iterations will be compiled into a single new array, which acts as the final output of the entire loop node workflow step.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
