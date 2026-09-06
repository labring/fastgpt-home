---
title: Enable FastGPT app exposure via MCP protocol
slug: /en/integration/fastgpt-mcp-server-configuration
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/mcp_server
source_type: Official documentation
---

# Enable FastGPT app exposure via MCP protocol

## Overview of FastGPT MCP Server
MCP (Model Context Protocol) was released by Anthropic in early November 2024. It standardizes consistent communication between AI models and external systems, reducing integration complexity. Following official OpenAI support for MCP, widespread adoption across AI vendors has commenced. FastGPT’s MCP Server feature enables users to expose multiple pre-built FastGPT applications via the MCP protocol for external consumption by connected AI models.

## Core MCP Component Overview
The MCP framework consists of two primary components: MCP Client and MCP Server. The MCP Client acts as the AI model consumer, leveraging MCP client tools to grant AI models the ability to call external system integrations. The MCP Server hosts and executes these external integrations, making them available to connected MCP clients. For FastGPT, the MCP Server exposes configured FastGPT applications as callable external tools for MCP-compatible AI models.

## Supported Transport Protocols
FastGPT supports two MCP transport protocols tailored to deployment type:
| Transport Type          | Supported Deployment Scenario               |
|-------------------------|---------------------------------------------|
| Streamable HTTP         | All standard FastGPT deployments            |
| SSE (Server-Sent Events)| Self-hosted deployments via standalone MCP Server service |

## Quick Configuration Steps
1. Access the FastGPT platform’s administration or publishing dashboard.
2. Navigate to the MCP Server configuration panel.
3. Select one or more existing FastGPT applications to expose via the MCP protocol.
4. Enable the MCP Server feature to activate publicly accessible MCP endpoints.
For self-hosted deployments requiring SSE transport:
1. Deploy the official standalone MCP Server service alongside your FastGPT instance.
2. Configure the standalone service to target your selected FastGPT applications.
3. Start the standalone MCP Server service to enable the SSE transport endpoint.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/mcp_server)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
