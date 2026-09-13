---
title: Configure and Call Individual FastGPT MCP Tools
slug: /en/integration/fastgpt-mcp-individual-tool-calls
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools
source_type: Official documentation
---

# Configure and Call Individual FastGPT MCP Tools

## Core Functionality of Individual MCP Tool Calls
FastGPT’s Model Context Protocol (MCP) integration supports direct, isolated invocation of individual tools for targeted data retrieval. This capability allows AI assistants to automatically select the optimal tool based on user query intent, execute the tool to fetch precise data, and synthesize the raw tool output into a natural language response. This workflow reduces unnecessary complexity for straightforward use cases, where only a single tool is needed to fulfill the user’s request. The included visual assets demonstrate this process: a primary diagram showing the individual tool call interface, plus two supplementary screenshots displaying example execution results.

## Example Tool Use Cases
Two reference tools, maps_weather and maps_text_search, are used to illustrate individual tool call functionality. Two distinct user queries trigger each tool appropriately:
1. A query asking for real-time weather conditions for a specific location will prompt the assistant to invoke the maps_weather tool to retrieve current weather data.
2. A query seeking local points of interest near a specified location will trigger the maps_text_search tool to fetch relevant location-based results.
The embedded table in the source material displays the successful execution and response generation for each of these example use cases, with two screenshots showing the end-to-end output for each query-tool pair.

## Step-by-Step Individual Tool Call Workflow
For engineers implementing individual MCP tool calls, this standardized process applies:
1. Configure the target individual tool (such as maps_weather or maps_text_search) within the FastGPT tool management dashboard.
2. Formulate a natural language user query that directly aligns with the tool’s intended functionality.
3. Submit the query to the FastGPT assistant, which analyzes the query to identify the most appropriate matching tool.
4. The assistant executes the selected tool to retrieve the requested data set.
5. The raw structured output from the tool is formatted into a clear, human-readable response for the end user.

This workflow ensures that developers can quickly integrate individual tools into custom FastGPT assistants, with minimal overhead for tool selection and execution logic. Technical decision makers can leverage this functionality to build targeted assistants for specific data retrieval tasks, without requiring full multi-tool orchestration for every use case.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
