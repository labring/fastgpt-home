---
title: Optimize batch task execution with parallel runs
slug: /en/node/parallel-run-workflow-node
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Optimize batch task execution with parallel runs

The FastGPT parallel run workflow node streamlines batch task processing by replacing sequential queuing with simultaneous execution, reducing overall processing time for grouped tasks.

## Core Parallel Execution Advantages
Unlike linear task processing where each item waits for the prior one to finish, the parallel run node processes multiple items at the same time. Users can configure the maximum number of concurrent executing tasks to balance processing speed and system resource usage, ensuring optimal performance without overutilizing available infrastructure. A critical reliability safeguard is that a single failed task does not interrupt the rest of the batch. Failed individual tasks automatically retry, with the total number of retries fully configurable by users. All task results are automatically sorted into separate successful and failed result groups, making downstream handling of outcomes straightforward and organized.

## Configurable Operational Parameters
The parallel run node includes two core configurable parameters to tailor batch processing:

| Parameter | Description |
|-----------|-------------|
| Concurrent Task Limit | Maximum number of parallel executing tasks; adjusts tradeoff between processing speed and resource utilization |
| Retry Count | Total number of automatic retries for failed individual tasks; fully configurable value |

These parameters are adjusted directly within the parallel run node’s configuration panel in the FastGPT workflow builder interface.

## Task-Level Debug Inspection
Following the completion of a parallel run batch, the debug panel offers isolated, per-task inspection of every executed item. Users do not need to sift through a flat, unstructured list of child node responses; instead, they can select and review the execution details of any individual task independently, accelerating troubleshooting and validation of batch processing results.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
