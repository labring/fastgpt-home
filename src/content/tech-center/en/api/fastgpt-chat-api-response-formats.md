---
title: Understand FastGPT Chat API Response Formats
slug: /en/api/fastgpt-chat-api-response-formats
page_type: API
source: https://doc.fastgpt.cn/en/openapi/chat
source_type: Official documentation
---

# Understand FastGPT Chat API Response Formats

The FastGPT chat completion API offers four configurable response types, controlled by the `detail` and `stream` boolean request parameters, plus typed event streaming for full workflow visibility. All responses adhere to standardized JSON or Server-Sent Event (SSE) formats based on the selected configuration.

## Core Response Configurations
The table below breaks down each response mode by its flag settings and key fields:
| Response Mode | Flag Settings | Key Fields |
|---------------|---------------|------------|
| Standard Non-Stream Low-Detail | `detail=false`, `stream=false` | Top-level `id`, `model`, `usage` (with `prompt_tokens`, `completion_tokens`, `total_tokens`), and a `choices` array containing the final assistant message and `finish_reason`. |
| Streamed Low-Detail | `detail=false`, `stream=true` | Line-delimited SSE payloads where each `data:` prefixed entry includes partial content chunks in `choices[].delta.content`, with `finish_reason` set to `null` until completion. |
| Standard Non-Stream Full-Detail | `detail=true`, `stream=false` | Full workflow metadata including a `responseData` array with module-specific metrics, cited `quoteList` sources, complete conversation history in `completeMessages`, alongside standard top-level fields. |
| Streamed Full-Detail | `detail=true`, `stream=true` | Typed SSE events with distinct `event` headers for workflow steps, content chunks, and final metrics. |

## Event Stream Event Types
For streamed full-detail responses, each SSE transmission includes a defined `event` type and structured `data` payload:
- `flowNodeStatus`: Provides real-time workflow step updates, with `status` (e.g., `running`) and `name` (e.g., `Dataset search`, `AI Chat`) fields.
- `answer`: Carries partial or final response content, matching the low-detail streamed format. The final `answer` event sets `finish_reason` to `stop`, followed by a `[DONE]` payload to signal response completion.
- `flowResponses`: Returns final workflow execution data, including module run times and detailed cited source information.

## Sample Response Snippets
All response formats use exact, standardized structures pulled from the API. A standard non-stream low-detail response includes a top-level `usage` object with token count metrics and a `choices` array with the final assistant message. Streamed low-detail responses use line-delimited `data:` prefixed payloads, with each chunk containing a partial content string in `choices[].delta.content`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/chat)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
