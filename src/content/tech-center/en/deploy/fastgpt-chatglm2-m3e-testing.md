---
title: Test Custom ChatGLM2 and M3E Models on FastGPT
slug: /en/deploy/fastgpt-chatglm2-m3e-testing
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e
source_type: Official documentation
---

# Test Custom ChatGLM2 and M3E Models on FastGPT

## Authentication and Model Configuration
All API test requests require standard HTTP headers for authentication and content type. Include the `Authorization: Bearer <your-api-key>` header, replacing the placeholder value `[REDACTED_CREDENTIAL]` with your actual FastGPT API key. Also set the `Content-Type: application/json` header to ensure proper request parsing. Every test request’s `model` field in the JSON body must exactly match the custom model name you entered in your One API integration; do not use generic values unless your model is configured with the default names provided here.

## Test M3E Embedding Endpoint
The M3E embedding model uses the `/v1/embeddings` API endpoint. To send a test request, use a POST HTTP method with the following required JSON payload parameters:
- `model`: String matching your configured M3E model name (default: `m3e`)
- `input`: Array of one or more text strings to generate vector embeddings for.

The exact curl command for a basic M3E test is:
```bash
curl --location --request POST 'https://domain/v1/embeddings' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "model": "m3e",
  "input": ["What is FastGPT"]
}'
```
Replace `https://domain` with your actual deployed FastGPT domain or API gateway URL.

## Test ChatGLM2 Chat Completion Endpoint
The ChatGLM2 large language model uses the `/v1/chat/completions` API endpoint. A valid test request requires a POST method with these required JSON payload parameters:
- `model`: String matching your configured ChatGLM2 model name (default: `chatglm2`)
- `messages`: Array of message objects, each with `role` and `content` fields.

The exact curl command for a basic ChatGLM2 test is:
```bash
curl --location --request POST 'https://domain/v1/chat/completions' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "model": "chatglm2",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```
As with the embedding test, update `https://domain` to your live FastGPT domain and replace the placeholder API key with your valid key.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2-m3e)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
