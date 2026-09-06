---
title: Delete FastGPT Chat Messages via OpenAPI
slug: /en/api/fastgpt-openapi-delete-chat-message
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Delete FastGPT Chat Messages via OpenAPI

## Overview
This documentation covers the FastGPT OpenAPI Message Delete endpoint, which enables programmatic deletion of individual chat messages from a FastGPT application’s chat history. This endpoint supports automated cleanup of chat records, compliance-focused record removal, and custom chat history management workflows. All requests must use the DELETE HTTP method and include valid API key authentication. The base endpoint URL for this operation is `http://localhost:3000/api/core/chat/record/delete`.

## Request Parameters
All required parameters must be included in the request to successfully delete a chat message. The following table outlines each valid parameter:
| Parameter | Location | Data Type | Required | Description |
|-----------|----------|-----------|----------|-------------|
| appId | Query String | String | Yes | Unique identifier for the target FastGPT application |
| chatId | Query String | String | Yes | Unique identifier for the active chat session containing the target message |
| contentId | Query String | String | Yes | Unique identifier for the specific chat message to delete |
| Authorization | Request Header | String | Yes | Bearer token authentication credential, formatted as `Bearer [apikey]` where [apikey] is your FastGPT account API key |

## Example Request and Response
The following curl command demonstrates a valid request to the delete endpoint, with placeholders for required values:
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/record/delete?contentId=[contentId]&chatId=[chatId]&appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
Replace all square-bracketed placeholders with your actual application, session, message, and API key details before executing the request.

A successful request returns a 200 OK HTTP status code, with the following JSON response structure:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
This response includes no additional operational data beyond the success confirmation, as the delete operation does not return details of the removed message.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
