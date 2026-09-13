---
title: Verify FastGPT MCP Identity Proxy Configuration
slug: /en/integration/fastgpt-mcp-identity-proxy-verification
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/mcp_server
source_type: Official documentation
---

# Verify FastGPT MCP Identity Proxy Configuration

## Identity Proxy Verification Overview
After deploying and configuring the FastGPT MCP Server’s identity proxy, validation is required to confirm that only authorized, active team members can invoke published tools. Unlike the tool list, which only exposes static metadata such as tool names and parameter schemas, FastGPT performs real-time rechecks of team membership and application read permissions for every individual tool call. This means successful tool invocation is the only definitive way to confirm the identity proxy configuration works as intended.

## Step-by-Step Verification Procedure
Follow these concrete steps to validate your identity proxy setup:
1. Connect to your MCP client configured to interact with the FastGPT MCP Server.
2. Review the exposed tool list to confirm your published tools are visible, confirming basic server connectivity.
3. Select a target tool and initiate a tool call, including any required identity proxy request headers as defined in your configuration.
4. Confirm the tool call executes without errors. A successful call verifies two core conditions: the proxied user is an active team member, and they hold read permission for the target FastGPT application.

## Troubleshooting Authorization Errors
If the tool list loads correctly but a tool call returns an authorization error, use the following structured checks to diagnose and resolve the issue:
1. Confirm that identity proxy is enabled for the FastGPT MCP Server.
2. Verify the username or team member ID included in the request header is accurate and matches a valid team member.
3. If both username and team member ID headers are present in the request, ensure they identify the same team member.
4. Check that the team member remains active in the team that originally published the MCP Server.
5. Validate that the team member has been granted read permission for the FastGPT application associated with the tool being called.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/mcp_server)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
