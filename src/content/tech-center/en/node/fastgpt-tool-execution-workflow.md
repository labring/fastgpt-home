---
title: Understand FastGPT Tool Node Execution Workflow
slug: /en/node/fastgpt-tool-execution-workflow
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool
source_type: Official documentation
---

# Understand FastGPT Tool Node Execution Workflow

## Tool Execution Prerequisites
To run FastGPT tool nodes, two mandatory prerequisites must be satisfied for valid invocation:
1. A structured tool description: This document tells the large language model (LLM) the core function of the tool, allowing the LLM to evaluate whether invocation is appropriate using contextual conversation semantics.
2. Defined tool parameters: Some tools require specific input values when called. Every configured tool parameter includes two critical properties:

| Parameter Property | Official Definition |
|---------------------|---------------------|
| `parameter description` | Explanatory context for the LLM to understand the parameter’s purpose and required usage |
| `required` | Boolean flag indicating if the parameter must be provided prior to tool execution |

## Tool Invocation Decision Scenarios
The LLM’s decision to call a tool is based on the tool description, parameter descriptions, and required status of each parameter, with four distinct scenarios:
1. **Tools without parameters**: The LLM makes its invocation decision solely using the tool’s description. A common example is the get current time tool, which requires no external inputs.
2. **Tools with parameters**:
   - No required parameters: The tool can be executed even if no matching contextual parameters are available. Note that the LLM may occasionally fabricate plausible parameter values in this case.
   - Has required parameters: If no suitable parameter values are present in the conversation context, the LLM may skip invoking the tool. Targeted prompt engineering can be used to guide end users to provide the required parameters.

## Formal Tool Calling Logic
Models that support function calling can invoke multiple tools in a single conversation turn. The end-to-end execution flow for tool nodes is documented in the following diagram:
![FastGPT Tool Execution Flow](/imgs/flow-tool2.png)
This flow aligns with the decision frameworks outlined above, ensuring consistent tool invocation behavior across supported LLM configurations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/tool)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
