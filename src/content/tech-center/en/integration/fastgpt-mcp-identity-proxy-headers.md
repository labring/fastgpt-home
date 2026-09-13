---
title: Configure Identity Proxy Headers for FastGPT MCP Servers
slug: /en/integration/fastgpt-mcp-identity-proxy-headers
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/mcp_server
source_type: Official documentation
---

# Configure Identity Proxy Headers for FastGPT MCP Servers

## Overview
FastGPT uses transport layer headers instead of tool arguments to pass proxy identity information for Model Context Protocol (MCP) servers. This approach provides secure, standardized authentication for team members accessing MCP resources. Only two dedicated headers are supported for proxy identity validation, and either header alone is sufficient for successful authentication. If both headers are provided, they must resolve to the same FastGPT team member.

## Supported Proxy Identity Headers
The following headers are accepted by FastGPT for proxy identity configuration:

| Header                          | Value                      | Description                                                      |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------- |
| `x-fastgpt-auth-proxy-username` | Team member login username | Recommended; this is usually the member's login email address    |
| `x-fastgpt-auth-proxy-tmb-id`   | FastGPT team member ID     | Use this when your system already stores FastGPT team member IDs |

Either header is sufficient for authentication. If both headers are provided, they must resolve to the same FastGPT team member.

## Client Configuration Examples
For MCP clients that support custom request headers, add a `headers` field to your MCP server configuration. Below is a sample configuration using a Streamable HTTP endpoint and the recommended username header:
```json
{
  "mcpServers": {
    "fastgpt": {
      "url": "https://fastgpt.example.com/api/mcp/app/<MCP_KEY>/mcp",
      "headers": {
        "x-fastgpt-auth-proxy-username": "[REDACTED_PRIVATE_DATA]"
      }
    }
  }
}
```
To authenticate using a FastGPT team member ID instead of a login username, replace the `headers` block with the following entry:
```json
{
  "x-fastgpt-auth-proxy-tmb-id": "<TEAM_MEMBER_ID>"
}
```

## Connection-Specific Header Behavior
There are key differences in how header values are processed between Streamable HTTP and SSE MCP connections:
- Streamable HTTP endpoints read and validate proxy identity headers for every individual request, so header changes take effect immediately for new requests.
- SSE connections capture proxy identity at the time the connection is established. If you update your proxy identity headers, you must reconnect the SSE session to apply the new authentication settings.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/mcp_server)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
