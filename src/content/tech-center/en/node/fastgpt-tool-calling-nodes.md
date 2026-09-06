---
title: Configure and Use FastGPT Tool Calling Nodes
slug: /en/node/fastgpt-tool-calling-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool
source_type: Official documentation
---

# Configure and Use FastGPT Tool Calling Nodes

## Overview of FastGPT Tool Calling Nodes
Tool calling nodes in the FastGPT advanced workflow editor enable structured invocation of external tools within custom workflow pipelines. These nodes act as a bridge between your workflow logic and connected tools, with built-in controls to align tool execution with your workflow requirements.

## Step-by-Step Tool Connection and Configuration
1. Access the advanced workflow editor in your FastGPT deployment.
2. Locate the tool calling connection point on a configured tool calling node.
3. Drag outward from this connection point to reveal eligible tools, which display a diamond-shaped icon at their top edge.
4. Select a target eligible tool, then connect its top diamond icon to the bottom diamond connection point of the original tool calling node, as shown in reference images flow-tool3.png and flow-tool4.png.
5. Once connected, the linked tool automatically separates its dedicated inputs from standard workflow inputs.
6. Edit the `description` field associated with the tool calling node to refine the conditions under which the connected tool will be invoked.

## Advanced Workflow Usage and Debugging
By default, after a connected tool finishes execution, its raw output is returned to the connected AI model for summarization and integration back into the workflow. To bypass this AI summarization step, place the tool calling node at the very end of the tool’s dedicated workflow branch. For example, after a Dataset search node runs, route its results directly to an HTTP request node without sending the search results back to the tool calling node for AI processing, as shown in reference image flow-tool5.png.
Debugging tool calling workflows is primarily an iterative, trial-and-error process. Start with a small number of connected tools, optimize their configuration and connection logic, then gradually expand the number of tools in your workflow to avoid complexity and simplify troubleshooting.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
