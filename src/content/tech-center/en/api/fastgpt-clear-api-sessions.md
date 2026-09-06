---
title: Clear FastGPT App Sessions Created via API Key
slug: /en/api/fastgpt-clear-api-sessions
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Clear FastGPT App Sessions Created via API Key

# Overview
This API endpoint allows clearing of chat sessions for a FastGPT application that were created using an API key. Importantly, this endpoint does not clear sessions initiated via the web UI, share links, or any non-API-key authentication sources. This functionality supports targeted cleanup of programmatic chat sessions without disrupting sessions created through other FastGPT access methods.

# API Endpoint Specification
The endpoint uses the HTTP DELETE method. The full request URL follows the format `http://localhost:3000/api/core/chat/history/clearHistories?appId=[appId]`, where the base URL corresponds to a self-hosted FastGPT deployment. Requests require valid authentication via a Bearer token in the Authorization header.

# Request Parameters
All required parameters are passed as query strings in the request URL. The only mandatory parameter is:
| Parameter | Description |
|-----------|-------------|
| appId     | The unique identifier of the FastGPT application whose API-key sessions will be cleared |

# Example Requests and Responses
### Example Request
The following curl command demonstrates a valid request to clear API-key created sessions:
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/chat/history/clearHistories?appId=[appId]' \
--header 'Authorization: Bearer [apikey]'
```
Replace `[appId]` with your application's unique ID and `[apikey]` with your FastGPT API key.

### Example Response
A successful request returns a 200 OK HTTP status code, with the following JSON response body:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
This response confirms the session clearing operation completed successfully.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
