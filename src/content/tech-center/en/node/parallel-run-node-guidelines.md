---
title: Parallel Run Node Operational Constraints and Best Practices
slug: /en/node/parallel-run-node-guidelines
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Parallel Run Node Operational Constraints and Best Practices

## Core Operational Restrictions
Parallel Run nodes have enforced placement rules to prevent workflow errors:
- A Parallel Run node cannot contain another Parallel Run or Batch Processing node.
- Form input, user selection, and other interactive nodes are blocked from being placed within the Parallel Run’s execution logic by the workflow editor.

## Variable and Output Behavior Rules
Global variable changes completed by successful parallel tasks are automatically written back to the main workflow flow. If a Variable Update node modifies an output on a node outside the Parallel Run container, that external output value is also written back after the associated task succeeds.
When multiple parallel tasks write to the same global variable or external node output, the final stored value depends on task completion order and is not guaranteed to be stable. For deterministic, consistent results, return values via the End node of each parallel task and use the Parallel Run’s aggregate outputs instead.

## AI Node Streaming Best Practices
It is strongly recommended to disable the "Return AI content" toggle on all AI Chat nodes placed within the Parallel Run execution logic. If left enabled, multiple parallel tasks will simultaneously stream AI content to the same chat window, resulting in garbled, interleaved text. For proper aggregated result delivery, add a single Specified Reply node after the Parallel Run node to emit final combined output from all parallel tasks.

### Step-by-Step: Configure AI Nodes for Parallel Execution
1.  Select any AI Chat node located inside the Parallel Run’s execution logic container.
2.  Access the node’s configuration settings panel.
3.  Toggle off the "Return AI content" option.
4.  Add a Specified Reply node outside the Parallel Run container to handle final result emission.

## Array Input Limit Configuration
The input array for Parallel Run nodes has a default maximum of 100 items. This limit is adjustable via your deployment’s configuration settings.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
