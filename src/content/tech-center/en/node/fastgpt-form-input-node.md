---
title: Collect User Input with FastGPT Form Input Nodes
slug: /en/node/fastgpt-form-input-node
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/form_input
source_type: Official documentation
---

# Collect User Input with FastGPT Form Input Nodes

# Core Functionality of FastGPT Form Input Nodes
The Form Input node is a user interaction node within FastGPT workflow builders. When triggered during workflow execution, the active conversation enters an "interactive" state. At this point, the current workflow state is saved, and workflow execution pauses until the end user completes their required interaction. Accompanying technical illustrations show that triggering the Form Input node hides the standard chat box, shifting the conversation into interactive mode.

# Step-by-Step Trigger and Data Flow
1. Add the Form Input node to your FastGPT workflow canvas and connect it to upstream workflow elements to define when it activates.
2. Trigger the workflow: upon reaching the Form Input node, the system saves the current workflow state and pauses execution. The chat box will be hidden, and the interactive form interface will load for the end user.
3. The end user fills out all required form fields as presented in the interactive prompt.
4. After completing all required fields, the end user clicks the submit button to finalize their input.
5. The Form Input node collects the full set of submitted form data, then passes this data to all subsequent nodes connected in the workflow for further processing.

# Key Operational Details
When the Form Input node is active, no further workflow execution occurs until the user submits their form data. The saved workflow state ensures that after submission, the workflow resumes exactly where it paused, with the collected form data available to downstream nodes. The submitted form data is passed unmodified to connected nodes, allowing downstream components to utilize the user-provided values directly.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/form_input)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
