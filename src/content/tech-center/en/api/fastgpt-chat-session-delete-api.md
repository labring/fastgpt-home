---
title: Delete FastGPT Chat Sessions via OpenAPI
slug: /en/api/fastgpt-chat-session-delete-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Delete FastGPT Chat Sessions via OpenAPI

## Overview
This documentation covers the FastGPT OpenAPI endpoint for deleting an existing chat session. This endpoint permanently removes all stored chat history tied to a specified session ID for a target FastGPT application. All requests to this endpoint require valid API key authentication and required unique identifiers for the application and target session.

## Request Specification
This endpoint accepts a DELETE HTTP request with query parameters for authentication and target identification. The full request URL follows the format: `http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]`. The following table lists all required query parameters:

| Parameter | Description |
|---|---|
| appId | Unique application identifier for the FastGPT deployment |
| chatId | Unique session identifier for the chat history to delete |

Additionally, requests must include an `Authorization` header with a valid FastGPT API key, formatted as `Bearer [apikey]`. A complete working curl request example is provided below:
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/delHistory?chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
Replace all bracketed placeholders with actual values from your FastGPT deployment.

## Response Specification
All successful requests return a JSON response with a 200 OK HTTP status code. The standard response structure includes four top-level fields:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
The `code` field returns 200 to confirm successful session deletion. The `statusText` and `message` fields will be empty strings for successful requests, while the `data` field will always be null upon a successful deletion.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
