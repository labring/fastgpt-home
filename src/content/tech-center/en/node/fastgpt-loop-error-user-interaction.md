---
title: Manage Loop Errors and User Input in FastGPT Workflows
slug: /en/node/fastgpt-loop-error-user-interaction
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run
source_type: Official documentation
---

# Manage Loop Errors and User Input in FastGPT Workflows

## Loop Error and Interaction Core Features
FastGPT workflow loop nodes include two built-in features to support robust, user-integrated loop execution, designed to simplify complex loop workflows without custom coding.

## Preserving Prior Iteration Logs
When a loop fails during any iteration, all run logs and generated results from successfully completed prior iterations are retained. Users can access the full step-by-step execution trace through the "Execution Details" interface to quickly identify and resolve the source of the failure. This log preservation behavior is active by default for all loop nodes, with no additional configuration required to enable it.

## User Interaction in Loop Workflows
Loop nodes natively support embedding user input nodes such as "Form Input" directly within their workflow structure. When the loop reaches a user input node, execution will temporarily pause automatically. Once the required user input is submitted through the platform's interaction interface, the loop will resume running from the exact point where it paused.
### Step-by-Step Interactive Loop Process
1. Add a user input-compatible node (for example, "Form Input") inside the loop's workflow configuration.
2. Trigger or deploy the loop-enabled workflow.
3. The loop will pause automatically upon reaching the user input node.
4. Complete the requested input via the platform's native user interaction tools.
5. The loop resumes execution immediately after input is successfully submitted.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
