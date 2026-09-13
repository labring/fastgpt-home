---
title: Implement conditional workflow branching via TF Switch node
slug: /en/node/conditional-workflow-tf-switch-node
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tfswitch
source_type: Official documentation
---

# Implement conditional workflow branching via TF Switch node

## Overview
The TF Switch node provides conditional execution control for FastGPT workflows. It runs an IF-style evaluation on any selected workflow variable, then routes subsequent workflow steps to the appropriate branch. When the defined condition is satisfied, the IF branch executes its attached workflow tasks. If the condition is not met, the configured ELSE branch runs instead. A provided reference example uses the "Dataset Citation" variable: if this variable has a length of 0, the IF branch triggers, otherwise the ELSE branch activates.

## Step-by-Step Configuration
Follow these steps to set up the TF Switch node using the reference example:
1. Add the TF Switch node to your FastGPT workflow canvas via the builder interface.
2. Select the target variable to evaluate, using the "Dataset Citation" variable as the specified example.
3. Define the conditional check: for the reference use case, validate that the length of the "Dataset Citation" variable equals 0.
4. Connect your desired workflow tasks to the IF and ELSE branch outputs: assign the sequence of steps that should run when the condition is satisfied to the IF branch, and fallback workflow steps to the ELSE branch.
5. (Optional) Add additional conditional branches to support more complex routing, following the same logical structure as standard programming IF statements.

## Conditional Branch Guidelines
All conditional logic for the TF Switch node adheres to standard programming IF statement conventions. Each added condition targets a specific workflow variable and evaluates a boolean check. You can configure multiple conditional branches beyond the default IF and ELSE pair, with each branch triggering only when its associated condition is satisfied. The ELSE branch acts as the default fallback for any scenario where none of the defined conditional checks pass.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tfswitch)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
