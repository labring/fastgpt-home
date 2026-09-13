---
title: Configure Parallel Task Execution in FastGPT Workflows
slug: /en/node/parallel-run-node-parameters
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Configure Parallel Task Execution in FastGPT Workflows

## Overview
The Parallel Run node is a FastGPT workflow component designed for batch processing array-based datasets. It executes a dedicated sub-flow for every item in a supplied input array, typically sourced from an upstream node’s array output. The node includes configurable controls for concurrent task limits and automated retry handling, enabling reliable batch processing while managing deployment resource load.

## Configuration Parameters
All parameters for the Parallel Run node are required, with the following defined defaults and behavior:
| Parameter            | Required | Default | Description                                                                                                  |
| -------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Array                | Yes      | -       | The items to process, usually from an upstream node's array output. Elements can be strings, numbers, objects, etc. |
| Max concurrency      | Yes      | 5       | How many tasks are allowed to run at the same time. Range: 1 to the upper limit (set by the deployment, default 10) |
| Max retries per task | Yes      | 3       | How many times to retry a failed task. Range: 0–5. `0` disables retries                                      |
| Execution Logic      | Yes      | -       | The sub-flow to run, wrapped between the fixed Start and End anchors. You can place any nodes in between     |

## Execution Logic & Constraints
The Execution Logic parameter defines the core task run for each array item. This sub-flow must be enclosed between the platform-provided Start and End anchor nodes, and any valid FastGPT workflow node can be placed within this boundary. Each item in the configured Array parameter will trigger an independent instance of this sub-flow. Key operational constraints for the node’s parameters include:
- Max concurrency ranges from a minimum of 1 up to a deployment-defined upper limit (default 10)
- Max retries per task ranges from 0 (no automatic retries for failed tasks) to a maximum of 5 total attempts per failed task

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
