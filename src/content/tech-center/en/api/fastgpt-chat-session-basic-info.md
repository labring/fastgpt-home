---
title: Retrieve FastGPT Chat Session Basic Info
slug: /en/api/fastgpt-chat-session-basic-info
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Retrieve FastGPT Chat Session Basic Info

# Endpoint Overview
This GET API endpoint retrieves core basic information for an active FastGPT chat session, including session metadata, linked application configuration, and session variables. The endpoint runs on the local FastGPT host at port 3000, with the full request path `/api/core/chat/init`.

# Request Configuration
Use the following HTTP GET command to submit a request, substituting placeholder values with your actual platform and session details:
```bash
curl --location --request GET 'http://localhost:3000/api/core/chat/init?appId=[appId]&chatId=[chatId]' \
--header 'Authorization: Bearer [apikey]'
```
Required request parameters are detailed in the table below:
| Parameter | Description |
|-----------|-------------|
| appId | Unique application identifier for the target FastGPT application |
| chatId | Unique session identifier for the active chat conversation |
All authenticated requests must include an `Authorization` header with a valid Bearer API key to access the endpoint.

# Response Schema
A successful request returns a 200 HTTP status code with a JSON response body. The top-level response fields include `code` (set to 200 for successful requests), `statusText`, `message`, and a `data` object containing core session and application details. The `data` object includes the following fields:
- `chatId`: Unique session identifier matching the requested chatId
- `appId`: Unique application identifier matching the requested appId
- `variables`: Key-value store of session-specific variables (empty by default)
- `app`: Full configuration object for the linked FastGPT application, containing:
  - `chatConfig`: Interface and behavior settings for chat interactions, including question guidance, text-to-speech configuration, whisper speech-to-text settings, input guides, and file selection permissions
  - `chatModels`: Array of enabled AI models available for the application
  - `name`: Display name of the application
  - `avatar`: File path to the application's avatar image
  - `intro`: Short descriptive text for the application
  - `type`: Application deployment type (e.g., `advanced`)
  - `pluginInputs`: Array of configured plugin input parameters

A complete sample response matching this schema is available in the official FastGPT documentation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
