---
title: Update Chat Message User Feedback via API
slug: /en/api/fastgpt-update-chat-feedback
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Update Chat Message User Feedback via API

# Overview
This API endpoint enables updating user feedback (like or dislike) for individual chat messages within a FastGPT chat session. All requests must use the POST HTTP method, with authentication provided via a bearer API key. The official endpoint URL is `http://localhost:3000/api/core/chat/feedback/updateUserFeedback`, and requests require two standard headers: `Authorization: Bearer [apikey]` and `Content-Type: application/json`.

# Request Parameters
The following table lists all required and optional parameters for the request body:
| Parameter | Required | Description |
|-----------|----------|-------------|
| appId | Yes | Unique identifier for the target FastGPT application |
| chatId | Yes | Unique identifier for the active chat session |
| dataId | Yes | Unique identifier for the specific chat message to update feedback for |
| userGoodFeedback | No | Optional. Set to "yes" to mark the message as liked. Omit this field to remove an existing like feedback. |
| userBadFeedback | No | Optional. Set to "yes" to mark the message as disliked. Omit this field to remove an existing dislike feedback. |

# Example Requests
There are four common use cases for this endpoint:
1.  Submit a like for a message: Include the `userGoodFeedback: "yes"` field in the request body.
2.  Remove a like for a message: Omit the `userGoodFeedback` field.
3.  Submit a dislike for a message: Include the `userBadFeedback: "yes"` field in the request body.
4.  Remove a dislike for a message: Omit the `userBadFeedback` field.

Sample curl commands for submitting like and dislike feedback are below:
### Like a Message
```bash
curl --location --request POST 'http://localhost:3000/api/core/chat/feedback/updateUserFeedback' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appId": "appId",
    "chatId": "chatId",
    "dataId": "dataId",
    "userGoodFeedback": "yes"
}'
```
### Dislike a Message
```bash
curl --location --request POST 'http://localhost:3000/api/core/chat/feedback/updateUserFeedback' \
--header 'Authorization: Bearer [apikey]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appId": "appId",
    "chatId": "chatId",
    "dataId": "dataId",
    "userBadFeedback": "yes"
}'
```

# Response Format
A successful request returns a standard JSON response with a 200 HTTP status code. The response data field will always be null for this endpoint:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
Non-200 status codes indicate request errors, though specific error message formats are not defined in this endpoint's documentation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
