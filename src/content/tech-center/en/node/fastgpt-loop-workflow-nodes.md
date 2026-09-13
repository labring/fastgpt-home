---
title: Use FastGPT Loop Nodes for Batch Workflow Processing
slug: /en/node/fastgpt-loop-workflow-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop
source_type: Official documentation
---

# Use FastGPT Loop Nodes for Batch Workflow Processing

## Core Functional Capabilities
The FastGPT Loop node is a dedicated workflow component built to streamline batch processing of structured array data within FastGPT pipelines. Its core array batch processing features include accepting array-type data as input, automatically iterating through each individual element of the input array, preserving the original order of elements throughout processing, and offering optional parallel processing support to optimize performance for large datasets. For automated iteration, the node automatically triggers connected downstream workflow nodes for each array element, supports custom conditional termination rules to halt the loop early based on user-defined criteria, provides a built-in loop counting field to track iteration progress, and maintains consistent execution context across each iteration to ensure reliable processing of individual elements.

## Compatible Integrated Nodes
The Loop node integrates natively with four core FastGPT workflow node types to enable targeted, customized batch processing workflows: AI Chat nodes for generating tailored responses per array element, HTTP Request nodes for executing external API calls tied to each element, Content Extraction nodes for parsing and transforming element data, and Conditional nodes for adding branching logic within each loop iteration. This native compatibility allows users to build complete end-to-end batch processing pipelines without requiring external custom scripting or third-party tools.

## Step-by-Step Implementation Workflow
1.  Add a Loop node to your FastGPT workflow canvas from the built-in workflow node library.
2.  Connect an array-type data output from a preceding workflow node to the Loop node’s primary input port.
3.  Configure optional loop behavior settings:
    - Enable parallel processing to optimize performance for compatible workloads
    - Define conditional termination rules to halt the loop based on custom criteria
    - Reference the built-in loop count field to track iteration progress within downstream nodes
4.  Connect any combination of supported workflow nodes (AI Chat, HTTP Request, Content Extraction, Conditional) to the Loop node’s iteration output port to process individual array elements.
5.  Save and activate the workflow; the Loop node will automatically iterate through the input array, maintain execution context for each iteration, and trigger the connected downstream nodes for each element in the original input order.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
