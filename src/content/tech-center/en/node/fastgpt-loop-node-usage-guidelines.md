---
title: Loop Node Critical Usage Guidelines for FastGPT
slug: /en/node/fastgpt-loop-node-usage-guidelines
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Loop Node Critical Usage Guidelines for FastGPT

# Core Structural Restrictions for Loop Nodes
FastGPT Loop Nodes enforce strict structural constraints to avoid ambiguous execution flows. You cannot embed another Loop Node or Parallel Run node within the boundaries of an existing Loop Node. This prohibition eliminates nested loop complexity and ensures consistent, predictable workflow behavior during runtime.

# Output Behavior and Result Aggregation
By default, custom outputs configured on a Loop Node only retain values from the final iteration once the loop exits normally. The system does not automatically aggregate outputs from all iterations into a single combined array. For use cases requiring collected, aggregated data from every loop run, use this required workflow:
1.  Declare an array-type global variable outside the Loop Node container
2.  Add a Variable Update node inside the loop’s execution body
3.  Configure the Variable Update node to append the result of the current iteration to the pre-declared global array

# Variable and State Commit Rules
Following each successfully completed iteration, all changes made to global variables within the loop body are written back to the main workflow. If a Variable Update node modifies an output belonging to a node outside the loop container, that change is committed to the main workflow immediately after the iteration finishes. Failed iterations do not commit any variable or external output changes made during that run. When an interactive node pauses loop execution, all completed changes made before the pause are saved as a resumable checkpoint, allowing the loop to resume execution once the user submits required input.

# Loop Termination Safeguards
To prevent infinite loop conditions, conditional Loop Node configurations must include a reachable Loop Break node under specific execution conditions. FastGPT enforces a hard maximum iteration limit with a default value of 100. If the loop reaches this limit without exiting via a Loop Break node, it will automatically terminate and throw an explicit execution error.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
