---
title: Set up and run conditional loops in FastGPT workflows
slug: /en/node/fastgpt-conditional-loop-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Set up and run conditional loops in FastGPT workflows

# Conditional Loop Node Overview
Conditional loop nodes are a core workflow building block in FastGPT designed to repeat a segment of workflow logic based on dynamic conditions, rather than iterating over a predefined array of data. This loop type is ideal for scenarios where execution should continue until a specific runtime condition is met, rather than processing a fixed set of inputs.

# Core Operational Requirements & Behavior
Conditional loops execute the workflow segment contained within the Loop Start node repeatedly based on runtime conditions, rather than iterating over a fixed array, until a Loop Break node is executed during an iteration. A mandatory platform validation rule applies to all conditional loop containers: every loop must include at least one Loop Break node inside its boundary. If this requirement is not met, saving or running the workflow will result in a validation error that blocks further workflow editing or execution.

# Step-by-Step Configuration Workflow
1.  Add a Loop Start node to your FastGPT workflow canvas to define the outer boundary of the conditional loop container.
2.  Add all required workflow logic nodes inside the Loop Start container, and connect them to define the sequence of actions to repeat during each loop cycle.
3.  Insert at least one Loop Break node within the loop container, and configure its trigger condition to define when the loop should terminate.
4.  Connect the Loop Break node to downstream workflow nodes outside the loop container to pass processed data or trigger post-loop execution logic.
5.  Connect the final node inside the loop container back to the Loop Start node to complete the loop cycle, unless the Loop Break node triggers an exit before this step.

# Iteration Data Injection
During each iteration of the conditional loop, the Loop Start node automatically outputs a built-in tracking variable: `Current Loop Count`. This value is a 1-based integer, meaning the first loop cycle returns a count of 1, with each subsequent cycle incrementing the value by 1. This variable can be referenced by any node within the loop container to adjust runtime behavior per loop cycle.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
