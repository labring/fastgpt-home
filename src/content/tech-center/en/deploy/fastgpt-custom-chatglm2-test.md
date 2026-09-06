---
title: Test Custom ChatGLM2 Models on FastGPT
slug: /en/deploy/fastgpt-custom-chatglm2-test
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Test Custom ChatGLM2 Models on FastGPT

**API Request Overview**
This section details the official API request format for testing a custom ChatGLM2 model integrated with FastGPT. All requests use a POST method targeting the `/v1/chat/completions` endpoint on your deployed FastGPT domain.

**Required Request Headers**
Two standard headers are mandatory for all test requests:
1.  `Authorization: Bearer [REDACTED_CREDENTIAL]`: Preserve the `sk-` prefix and use either the example token or your valid custom API token for authentication.
2.  `Content-Type: application/json`: Ensures the request body is properly parsed by the endpoint.

**Step-by-Step Test Command**
Use the following exact curl command to send a test chat completion request. Replace `https://domain` with your FastGPT deployment’s public domain:
```bash
curl --location --request POST 'https://domain/v1/chat/completions' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "model": "chatglm2",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```
After executing this command, the endpoint will return a standard chat completion response compatible with FastGPT’s custom model integration.

**Critical Configuration Rules**
There are two non-negotiable requirements for successful testing:
1.  The `Authorization` header must use a valid token with the `sk-` prefix format, matching your FastGPT API credentials.
2.  The `model` field in the request body must exactly match the custom model name configured in the One API panel. Using an incorrect model name will cause the request to fail.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
