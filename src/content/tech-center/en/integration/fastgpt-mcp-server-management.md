---
title: Set Up and Manage FastGPT MCP Servers
slug: /en/integration/fastgpt-mcp-server-management
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/mcp_server
source_type: Official documentation
---

# Set Up and Manage FastGPT MCP Servers

## MCP Server Management Overview
FastGPT’s MCP Server tool provides centralized oversight for model control plane deployments. After logging into the FastGPT platform, navigate to the Studio module and select MCP Server to access the dedicated management page. This page displays all configured MCP Servers, alongside the total number of applications each server is associated with, providing clear visibility into deployment distribution.
![MCP Server Management Landing Page](/imgs/mcp_server1.png)

## Step-by-Step MCP Server Configuration
To set up a new MCP Server, follow this workflow using the platform’s native interface:
1.  Access the MCP Server management page via the Studio module, as outlined in the overview section.
2.  Locate the new server creation workflow, which opens the configuration interface.
3.  Enter a custom display name for the new MCP Server to support easy identification within the management dashboard.
4.  Select the specific FastGPT applications that should be linked to this MCP Server, to organize workloads under a single control plane.
The configuration interface includes dedicated fields for these two core settings, as demonstrated in the accompanying screenshots:
![Custom Server Name Input Field](/imgs/mcp_server2.png) ![Application Association Selection Interface](/imgs/mcp_server3.png)

## Configuration Parameter Details
The following table lists the configurable fields available when creating an MCP Server, as defined in the FastGPT platform:
| Parameter Name | Official Description |
| --- | --- |
| Server Name | A user-defined display name for the MCP Server, used to distinguish between multiple deployed control planes |
| Associated Applications | A selection of existing FastGPT applications to associate with the MCP Server, enabling unified management of linked workloads |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/mcp_server)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
