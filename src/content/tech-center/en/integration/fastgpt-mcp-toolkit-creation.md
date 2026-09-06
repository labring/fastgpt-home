---
title: Create and Configure FastGPT MCP Toolkits
slug: /en/integration/fastgpt-mcp-toolkit-creation
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools
source_type: Official documentation
---

# Create and Configure FastGPT MCP Toolkits

## About FastGPT MCP Toolkits
FastGPT MCP toolkits enable integration of external Model Context Protocol (MCP) servers, allowing the platform to access and utilize tools hosted on those third-party servers. This guide uses the Amap MCP Server as a standard example, as referenced in official FastGPT documentation. MCP toolkits simplify connecting FastGPT to external tool servers without requiring custom code for most standard use cases.

## Step-by-Step MCP Toolkit Setup
This workflow follows the exact official steps for creating an MCP toolkit in FastGPT:
1.  Navigate to the FastGPT tool configuration dashboard and select the "New MCP Toolkit" option to launch the setup dialog.
2.  Obtain a valid MCP server URL. For the Amap MCP Server, the standard URL format is `https://mcp.amap.com/sse?key=[REDACTED_CREDENTIAL]`, where `xxx` is a placeholder for the user’s unique API key obtained from the Amap MCP Server provider.
3.  Paste the copied MCP URL into the designated input field within the setup dialog. A reference screenshot for this configuration step is available at `/imgs/mcp_tools1.png`.
4.  Click the "Parse" button. The FastGPT system will automatically scan the provided URL, discover all available tools hosted on the connected MCP server, and display them in a list within the dialog.
5.  Review the listed tools to confirm they match your intended functionality, then click the "Create" button to finalize the MCP toolkit configuration.

## Key Configuration Notes
The only required input for MCP toolkit setup is a valid, fully formatted MCP server URL. Invalid URLs will prevent the parse step from succeeding, resulting in no tools being listed in the dialog. Users must replace any placeholder values (such as the `xxx` API key in the Amap example URL) with their own unique credentials from the MCP server provider. Once created, the MCP toolkit will be available for use in FastGPT application workflows alongside native and other integrated tools.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/tools/mcp_tools)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
