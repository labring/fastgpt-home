---
title: Retrieve FastGPT Chat Message Run Details
slug: /en/api/fastgpt-chat-message-run-details
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Retrieve FastGPT Chat Message Run Details

# Overview
This document details the FastGPT OpenAPI endpoint for retrieving granular runtime execution data for a specific chat message within an active conversation session. The endpoint returns breakdowns of each modular step executed during the generation of a chat response, including execution time, resource usage, and conversation context.

# Request Configuration
## Example Request
Use the following curl command to send a valid request, replacing placeholder values with your actual identifiers:
```bash
curl --location --request GET 'http://localhost:3000/api/core/chat/record/getResData?appId=[appId]&chatId=[chatId]&dataId=[dataId]' \
--header 'Authorization: Bearer [apikey]'
```

## Required Parameters
All parameters are mandatory for a successful request:
| Parameter | Location | Description |
|-----------|----------|-------------|
| appId | Query string | Unique application identifier for the FastGPT deployment |
| chatId | Query string | Unique identifier for the active chat session |
| dataId | Query string | Unique identifier for the target chat message |
| Authorization | HTTP header | Authentication token formatted as `Bearer [apikey]` using your FastGPT API key |

# Response Structure
A successful request returns a JSON object with four top-level fields: `code`, `statusText`, `message`, and `data`. The `data` field is an array of module execution records, with each entry containing details about a single workflow or chat module run.

## Core Module Properties
All module entries share these standard fields:
- `id`: Unique identifier for the individual module run
- `nodeId`: Unique identifier for the corresponding workflow node
- `moduleName`: Display or internal name of the executed module
- `moduleType`: Functional classification of the module
- `runningTime`: Total execution duration in seconds

## AI Chat Module Extended Fields
For AI chat module runs, additional properties are available:
- `totalPoints`: Total credit points consumed during module execution
- `model`: Name of the large language model used for the response
- `tokens`: Total number of tokens processed during the run
- `query`: Original user input submitted to the chat module
- `maxToken`: Configured maximum token limit for the module
- `historyPreview`: Array of recent conversation turns, with each entry containing `obj` (speaker role such as Human or AI) and `value` (message content)
- `contextTotalLen`: Total count of conversation turns included in the request context

## Sample Response
The complete response structure matches the official documentation example, including sample data for a workflow start module and an AI chat module run.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
