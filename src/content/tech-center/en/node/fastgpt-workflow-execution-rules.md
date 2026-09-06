---
title: Understand FastGPT Workflow Core Execution Rules
slug: /en/node/fastgpt-workflow-execution-rules
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/intro
source_type: Official documentation
---

# Understand FastGPT Workflow Core Execution Rules

# Core Workflow Execution Fundamentals
FastGPT Workflows initiate exclusively from the [Workflow Start] node, which triggers automatically when a user submits a question. There is no fixed exit point for workflows: a workflow completes either when all active nodes cease execution, or when no nodes run during a given operational cycle.

# Node Connections and Line States
Nodes in FastGPT Workflows have two types of connections: incoming predecessor lines and outgoing successor lines. For example, the [Dataset search] node has one left-side predecessor line and one right-side successor line, while the [AI Chat] node only has a left-side predecessor line.
All workflow lines support three defined states:
| Line State | Description |
|------------|-------------|
| waiting    | Connected node is waiting to execute |
| active     | Connected node is ready to execute |
| skip       | Connected node should be skipped |

# Node Execution Rules and Walkthrough
The formal rules governing node execution are:
1.  If any predecessor line has `waiting` status, the node remains in a waiting state.
2.  If any predecessor line has `active` status, the node will execute its configured logic.
3.  If no predecessor lines are marked `waiting` or `active`, the node is skipped entirely.
4.  After a node finishes executing, its successor lines are updated to either `active` or `skip` status, and all of its predecessor lines are reset to `waiting` in preparation for future cycles.

A standard execution walkthrough for the sample workflow proceeds as:
1.  The [Workflow Start] node completes execution and sets its successor line to `active` status.
2.  The [Dataset search] node detects its single predecessor line is `active`, executes its configured logic, then updates its successor line to `active` and resets its predecessor line to `waiting`.
3.  The [AI Chat] node detects its predecessor line is `active` and executes, at which point the workflow concludes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/intro)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
