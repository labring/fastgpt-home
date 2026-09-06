---
title: Implement Interactive User Selection in FastGPT Workflows
slug: /en/node/fastgpt-user-selection-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/user-selection
source_type: Official documentation
---

# Implement Interactive User Selection in FastGPT Workflows

## User Selection Node Overview
The User Selection node is an interactive workflow node within FastGPT’s build toolkit. When triggered during workflow execution, the node transitions the associated conversation into an interactive state. During this state, the current workflow state is saved to preserve progress, and workflow execution is paused until the user completes their interaction. When the node triggers, the standard chat input field in the conversation interface is hidden, as shown in the referenced visual documentation.

## Interactive Session Operation
Once activated, the conversation operates in a restricted interactive mode, rather than the default free-text chat input setup. The workflow remains paused in this mode until the user submits their selected option.

## Post-Selection Execution Flow
This step-by-step process outlines how the node operates after user input:
1. The user selects a predefined option from the available choices in the interactive interface.
2. The User Selection node evaluates the submitted selection against the configured branch mappings.
3. The workflow resumes execution by running the branch corresponding to the user’s chosen option, such as the preconfigured "Yes" branch demonstrated in the example.
The included reference images illustrate both the hidden chat input during the interactive phase and the successful execution of the matching workflow branch following a user’s selection.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/user-selection)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
