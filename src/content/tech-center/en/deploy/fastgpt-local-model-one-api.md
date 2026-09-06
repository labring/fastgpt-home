---
title: Integrate Local Models For FastGPT Via One API
slug: /en/deploy/fastgpt-local-model-one-api
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Integrate Local Models For FastGPT Via One API

# Prerequisite Setup
Before integrating local Xinference models via One API for FastGPT, complete the initial deployment and configuration of your One API instance. Refer to the official One API configuration documentation for detailed setup steps. This ensures your One API environment is ready to accept custom model integrations.

# Configure Xinference Model Channel
Within your One API administrative interface, add a new model channel to connect to your deployed Xinference service. Use the following required configuration details:
1. Set the **Base URL** field to your deployed Xinference service endpoint.
2. Enter your custom model name as the model’s unique UID; for example, use `qwen-chat` as specified in the reference material.
A provided setup screenshot illustrates the exact fields and layout for this configuration step.

# Validate the Integration
To verify your configured model channel works correctly, use the following curl command to send a test chat completion request. Replace placeholder values with your actual instance details:
```bash
curl --location --request POST 'https://[oneapi_url]/v1/chat/completions' \
--header 'Authorization: Bearer [oneapi_token]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "model": "qwen-chat",
  "messages": [{"role": "user", "content": "Hello!"}]
}'
```
Important parameter notes:
- Replace `[oneapi_url]` with the public or internal address of your One API instance.
- Replace `[oneapi_token]` with your valid One API authentication token.
- The `model` field in the request JSON must exactly match the custom model name you entered when creating the One API channel. This ensures One API routes the request to the correct Xinference model.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
