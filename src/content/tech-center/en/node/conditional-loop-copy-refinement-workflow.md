---
title: Set Up Conditional Loop AI Copy Refinement Workflows
slug: /en/node/conditional-loop-copy-refinement-workflow
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Set Up Conditional Loop AI Copy Refinement Workflows

# Overview
This documentation details configuring a FastGPT Conditional Loop node to automate iterative AI copy refinement until a predefined quality threshold is met. The workflow leverages per-iteration scoring to evaluate revised copy, eliminating manual rework by automatically initiating additional refinement rounds until the output meets required standards.

# Step-by-Step Implementation
Follow these concrete, source-aligned steps to build the copy refinement loop:
1.  **Set Loop Type**: Select `Conditional Loop` as the loop type for the target Loop node.
2.  **Configure Loop Body Sub-Workflow**:
    - Deploy an `AI Chat` node labeled *Copy Refinement* to accept initial draft inputs.
    - Deploy a second `AI Chat` node labeled *Evaluation* to generate a numeric quality score for the refined copy.
    - Deploy a `Condition` node with two distinct routing paths:
      - Passing score: Route to an `Assigned Reply` node to format the final copy for user output, then connect this node to a `Loop Break` node to terminate the loop immediately.
      - Failing score: Do not establish any downstream connections; the loop will automatically initiate a new iteration using the polished draft generated in the current round.
3.  **Configure Loop Outputs**:
    - Navigate to the Loop node’s **Outputs** configuration panel, then add a custom output variable named `final_text`.
    - Reference the reply output of the *Copy Refinement* AI Chat node for this variable. All downstream workflow nodes can use the `final_text` variable to retrieve the final approved copy once the loop exits.

# Execution Flow Details
Post-execution, full granular details of each iteration are accessible in the "Complete Response" panel, as referenced in the included workflow execution screenshot. The standard execution sequence follows two core phases:
1.  **First Iteration**: The loop runs `Loop Start` → *Copy Refinement* → *Evaluation* → `Condition`. If the generated score fails to meet requirements, no break trigger occurs, and the system automatically starts a new iteration with the refined draft from the first round.
2.  **Second Iteration**: The sub-workflow runs again using the updated draft. If the score meets the predefined threshold, the workflow routes to `Assigned Reply`, triggers the `Loop Break` node, and the loop terminates safely.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
