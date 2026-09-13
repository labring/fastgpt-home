---
title: Configure and Use FastGPT MCP Toolkit Calls
slug: /en/integration/fastgpt-mcp-toolkit-calls
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools
source_type: Official documentation
---

# Configure and Use FastGPT MCP Toolkit Calls

## MCP Toolkit Integration Overview
FastGPT supports invoking complete MCP Toolkits, allowing the integrated AI to automatically select the optimal tool from the toolkit for task execution. This workflow eliminates manual per-tool configuration, as the AI handles tool selection, data retrieval, and response generation using toolkit execution results.

## Step-by-Step Configuration Steps
Follow these concrete steps to set up an MCP Toolkit integration:
1.  Access the FastGPT workflow builder interface.
2.  Click the MCP Toolkit option in the node catalog to add a Toolkit node to your workflow canvas.
3.  Connect the MCP Toolkit node to a Tool Call node to establish the required execution data flow.
4.  Use the provided visual references to validate your setup:
    ![](/imgs/mcp_tools7.png)
    ![](/imgs/mcp_tools8.png)
The first image shows the standalone MCP Toolkit node, while the second displays the node connected to a Tool Call node.

## AI Execution and Response Flow
Once the nodes are properly configured, the integrated AI will autonomously manage the full tool usage lifecycle. First, the AI evaluates the user’s input to identify the most appropriate tool within the attached MCP Toolkit. Next, the AI executes the selected tool, retrieves the necessary operational data, and generates a final response based on the tool’s execution results. No additional manual tool configuration is required beyond the initial node setup.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
