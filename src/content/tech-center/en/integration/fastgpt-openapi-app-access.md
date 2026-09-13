---
title: Authenticate and Access FastGPT Apps via OpenAPI
slug: /en/integration/fastgpt-openapi-app-access
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/openapi
source_type: Official documentation
---

# Authenticate and Access FastGPT Apps via OpenAPI

## API Key Credential Overview
In FastGPT, the API entry under the Publish Channels menu displays API Keys available to the currently signed-in member. These API Keys serve as member-level credentials for OpenAPI calls, and app-scoped API Keys are no longer created for platform use. All valid API Keys for OpenAPI access are accessible exclusively via this menu for the signed-in user.

## Request Configuration Standards
There are two approved implementation patterns for targeting FastGPT applications via the `chat/completions` OpenAPI endpoint. The recommended approach is to include the `appId` parameter directly in the request body when making calls. For third-party applications that only support OpenAI SDK-style key configuration, a compatibility format is provided: use the `apiKey-appId` structure for authentication. Full official details for both formats are available in the linked OpenAPI Introduction documentation.

## Quick Reference Parameter Table
| Endpoint | Required Field | Implementation Notes |
|---|---|---|
| `chat/completions` | `appId` | Include in request body (recommended standard implementation) |
| `chat/completions` | Authentication Key | Format key as `<member-api-key>-<target-app-id>` for SDK compatibility |

## Step-by-Step Implementation
1. Sign in to your FastGPT account, then navigate to the Publish Channels menu and select the API entry to view your available member API Keys.
2. For standard OpenAPI calls to the `chat/completions` endpoint, include the `appId` field in the request body alongside your API key authentication.
3. For third-party tools using OpenAI SDK-style configuration, format your authentication key by combining your member API Key and the target application ID with a hyphen, then use this formatted key for all SDK authentication setup.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/openapi)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
