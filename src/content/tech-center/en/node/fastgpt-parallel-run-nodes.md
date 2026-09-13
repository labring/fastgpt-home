---
title: Execute Parallel Batch Tasks With FastGPT Parallel Run Nodes
slug: /en/node/fastgpt-parallel-run-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_type: Official documentation
---

# Execute Parallel Batch Tasks With FastGPT Parallel Run Nodes

# Parallel Run Node Core Functionality
The Parallel Run node is a FastGPT workflow component that accepts an array as input, runs an identical sub-workflow for every array element simultaneously, then compiles all individual results into a single aggregated output. Unlike sequential batch processing, this node executes all sub-workflow instances concurrently to minimize total processing time for eligible tasks. A critical requirement for use with this node is that all task items within the input array must be fully independent, with no shared state or cross-item data dependencies. The node’s standard visual interface includes dedicated input and output ports, as referenced in the provided workflow diagram.

# Valid Batch Task Applications
This node is optimized for three core categories of batch workloads as outlined in official documentation: first, batch translation of discrete text snippets, where each snippet requires identical translation logic without reliance on other snippets in the batch; second, multi-webpage data scraping, where each target webpage is processed independently to extract structured information without interfering with other scrape operations; third, external API calls for bulk records, where each individual record triggers a separate API request with no shared session or state between requests. All tasks assigned to this node must not depend on output or intermediate results from other tasks in the batch.

# Step-by-Step Configuration
1. Add the Parallel Run node to your FastGPT workflow canvas via the official node library.
2. Connect an upstream workflow step that generates a flat array of independent task elements to the node’s array input port. Ensure the upstream output matches the required input format for the attached sub-workflow.
3. Attach a reusable sub-workflow to the node’s execution trigger port: this sub-workflow will automatically receive a single array element as its input on each concurrent run.
4. Connect the Parallel Run node’s aggregated output port to a downstream workflow step to process the combined results from all sub-workflow executions.
No additional configuration parameters are required beyond linking the correct ports and attaching the appropriate sub-workflow, as the node handles concurrent execution and result aggregation natively.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
