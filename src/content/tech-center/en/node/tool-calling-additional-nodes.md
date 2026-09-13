---
title: Control Tool Call Cycles and Workflow Variables
slug: /en/node/tool-calling-additional-nodes
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool
source_type: Official documentation
---

# Control Tool Call Cycles and Workflow Variables

## Additional Tool Calling Nodes Overview
When a Tool Calling node is integrated into a FastGPT workflow, two supplementary helper nodes are automatically unlocked: the Tool Calling Termination node and the Custom Variable node. These nodes expand the control and flexibility of tool calling workflows, refining the end-to-end tool integration experience for technical users.

## Tool Calling Termination Node
The Tool Calling Termination node is designed to forcibly halt the current tool call cycle. It must be placed directly after an active Tool Calling node in the workflow canvas. When the workflow execution reaches this node, all pending or scheduled subsequent tool calls are immediately canceled. No additional tools will be invoked for the current workflow run, and the AI will not generate a final response summary using the results from any previously executed tool calls. A visual reference illustrating proper node placement is available at the path `/imgs/flow-tool6.png`.

### Step-by-Step Usage
1. Add a Tool Calling node to your FastGPT workflow canvas.
2. Access the node palette: the Tool Calling Termination node will only appear in the palette if a Tool Calling node is already present in the workflow.
3. Connect the output port of a configured Tool Calling node to the input port of the Tool Calling Termination node.
4. Save and run the workflow. Upon reaching the Tool Calling Termination node, the current tool call cycle will terminate without further tool invocations or AI summary generation.

## Custom Variable Node
The Custom Variable node is automatically made available when a Tool Calling node is added to the workflow. This node supports expanded data management for tool call sequences, allowing users to handle custom workflow variables tied to tool input and output data. All configuration for this node is completed via the standard FastGPT workflow variable editing interface, aligned with the platform's native variable handling rules.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
