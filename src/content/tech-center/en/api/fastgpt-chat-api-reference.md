---
title: Set up and use FastGPT Chat API
slug: /en/api/fastgpt-chat-api-reference
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Set up and use FastGPT Chat API

## Retrieve Your FastGPT App ID
Every chat application on FastGPT has a unique App ID, a required identifier for all Chat API requests. You can locate your App ID directly in the URL of your app’s details page. The App ID appears as a dedicated path segment within this URL, as shown in the official documentation’s referenced screenshot.

## Authentication Methods
FastGPT supports three primary authentication workflows for Chat API requests:
1.  **Recommended Body Authentication**: When calling the `chat/completions` endpoint, include your API key and the target `appId` directly in the request body. This is the standard, fully supported authentication method.
2.  **OpenAI SDK Compatibility Authentication**: For clients built to align with OpenAI's API specifications, use the `Authorization` header formatted as `Bearer <apiKey>-<appId>`. Important: the `-<appId>` suffix is only a transport compatibility layer and is not stored on the FastGPT platform.
3.  **Team Member Proxy Authentication**: If you need to route requests through a specific team member, the team owner must enable the `authProxy` flag when creating or editing the associated API key. The proxied team member must already have explicit permission to access the target application and its chat functionality.

## API Endpoint Configuration & Troubleshooting
FastGPT offers two Chat API endpoint versions: v1 and v2. Version 2 was introduced in FastGPT 4.9.4, while version 1 is no longer actively maintained. If you encounter a 404 error when submitting API requests, verify your BaseUrl configuration: some client packages require appending `/v1` to the base platform URL to correctly resolve the endpoint path.

## Required Request Parameters
| Parameter | Usage Location | Mandatory/Optional | Official Notes |
|-----------|----------------|-------------------|----------------|
| `appId` | Request body | Mandatory | Unique identifier for the target chat application |
| `apiKey` | Request header or request body | Mandatory | Valid FastGPT platform API key |
| `Authorization` | Request header | Optional | Use `Bearer <apiKey>-<appId>` for OpenAI SDK compatibility; suffix not stored |
| `authProxy` | Team API key settings | Optional (team-only) | Enable to proxy requests through a specific team member |
| BaseUrl | Client configuration | Optional | Append `/v1` to resolve 404 endpoint errors |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
