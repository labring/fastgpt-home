---
title: Update FastGPT Chat Session Pin Status
slug: /en/api/fastgpt-update-chat-session-pin-status
page_type: API与文档
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: 官方文档
---

# Update FastGPT Chat Session Pin Status

## Endpoint Details

This section covers the FastGPT API endpoint for updating the pinned status of a chat session. The endpoint accepts HTTP PUT requests at the URL: `http://localhost:3000/api/core/chat/history/updateHistory`. All requests must include the following headers:
- `Authorization: Bearer [apikey]`: Authenticate using your FastGPT API key, replacing [apikey] with your actual key.
- `Content-Type: application/json`: Specifies the JSON format of the request body.

## Request Parameters

The following table lists all required parameters for the request body:
| Parameter | Type | Description |
|-----------|------|-------------|
| appId | String | Unique identifier for the FastGPT application |
| chatId | String | Unique identifier for the target chat session |
| top | Boolean | Toggle for session pin status; `true` pins the session, `false` unpins it. |

## Example Request and Response

A valid curl request to update a chat session’s pin status is:
```bash
curl --location --request PUT 'http://localhost:3000/api/core/chat/history/updateHistory' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appId": "appId",
    "chatId": "chatId",
    "top": true
}'
```

A successful request returns a 200 OK HTTP status code with the following JSON response:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```

The successful response includes empty `statusText` and `message` fields, and the `data` field is always null.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/openapi/chat)
