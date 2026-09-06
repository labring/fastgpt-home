---
title: Set Up FastGPT GPT-Compatible Chat API
slug: /en/api/fastgpt-gpt-compatible-chat-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Set Up FastGPT GPT-Compatible Chat API

## GPT-Compatible FastGPT Chat API Overview
FastGPT’s v1 chat API is fully compatible with the official GPT chat interface. Teams with existing standard GPT API integrations can migrate to FastGPT without rewriting core request logic, requiring only two key configuration adjustments: updating the API base URL and replacing the authorization header. Two core constraints apply to all requests: first, the `model` and `temperature` parameters are ignored, as their values are controlled entirely by your FastGPT workflow configuration. Second, standard responses do not include raw token consumption data.

## Key Parameter Rules
The following parameters and their behaviors are defined for the FastGPT v1 chat API:
| Parameter | Behavior |
|-----------|----------|
| `model` | Ignored; value set via FastGPT workflow configuration |
| `temperature` | Ignored; value set via FastGPT workflow configuration |
| `detail` | Set to `true` to enable extended response data for manual token calculation |

## Step-by-Step Integration Workflow
1. Update your existing GPT API request’s base URL to the FastGPT v1 chat API endpoint.
2. Configure the request’s Authorization header to use your FastGPT API key, formatted as `Bearer <your-fastgpt-api-key>`.
3. Construct your chat request payload using standard GPT chat message formats, excluding the `model` and `temperature` fields, as these are managed through your FastGPT workflow configuration.
4. If you need to track token usage, add the `detail=true` parameter to your request payload.
5. Submit the API request. If `detail=true` was included, extract the `responseData` field from the returned JSON payload to manually calculate total token consumption.

## Token Usage Tracking Notes
Unlike the official GPT API, the FastGPT v1 chat API does not return pre-calculated token consumption values in standard responses. To retrieve the data required for token calculation, you must explicitly enable the `detail=true` parameter. Once enabled, the response will include extended metadata that can be used to manually compute total token usage for the request.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
