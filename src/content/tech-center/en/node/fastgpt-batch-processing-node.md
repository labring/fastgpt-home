---
title: Automate Array Iteration in FastGPT Workflows
slug: /en/node/fastgpt-batch-processing-node
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop
source_type: Official documentation
---

# Automate Array Iteration in FastGPT Workflows

# What Is the Batch Processing Node?
The Batch Processing node, released in FastGPT V4.8.11, is a visual workflow component designed to automate iterative processing of array-type input data. It mirrors loop structures found in traditional programming languages, presented as a drag-and-drop UI element for workflow building. A visual reference for the node is available at `/imgs/fastgpt-loop-node.png`. In technical terms, individual workflow nodes operate like discrete functions or API endpoints, each serving as a single processing step. Connecting multiple nodes constructs a sequential, step-by-step workflow that produces a final AI-generated output, and the Batch Processing node functions as a specialized function to automate repeated execution of a targeted workflow segment.

# Core Operational Logic
When activated, the node accepts an array-type input, processes one element at a time, and automatically triggers any connected downstream workflow nodes for each individual element. This cycle repeats continuously until every entry in the input array has been fully processed. This eliminates the need to manually configure repetitive execution logic, streamlining workflows that require consistent processing across multiple data entries.

# Standard Implementation Steps
Follow these structured steps to integrate the Batch Processing node into your workflow:
1. Add the Batch Processing node to your FastGPT workflow canvas via the official node library.
2. Map a pre-defined array-type data variable as the node’s input source.
3. Connect all required downstream processing nodes to the Batch Processing node’s execution output port to define the processing workflow for each array element.
4. Trigger the workflow; the node will iterate over each array element, pass the element to connected downstream nodes, and complete execution once all array elements have been handled.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
