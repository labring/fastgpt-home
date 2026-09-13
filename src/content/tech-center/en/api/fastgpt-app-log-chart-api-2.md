---
title: Retrieve FastGPT App Chart Data via API
slug: /en/api/fastgpt-app-log-chart-api-2
page_type: API
source: https://doc.fastgpt.cn/en/openapi/app
source_type: Official documentation
---

# Retrieve FastGPT App Chart Data via API

## API Endpoint Overview
This POST API endpoint retrieves aggregated chart metrics for a specified FastGPT application, including user activity, chat session performance, and application feedback data. The endpoint is `https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData`. All requests require a valid Bearer [REDACTED_CREDENTIAL] token using your FastGPT API key, with `Content-Type: application/json` set in the request headers.

## Request Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `appId` | string | Unique identifier of the target FastGPT application |
| `dateStart` | ISO 8601 datetime | Start of the query time range |
| `dateEnd` | ISO 8601 datetime | End of the query time range |
| `source` | array of strings | Filter logs by deployment source; allowed values include `test`, `online`, `share`, `api`, `cronJob`, `team`, `feishu`, `official_account`, `wecom`, `mcp` |
| `offset` | integer | User retention offset, using the unit defined in `userTimespan` |
| `userTimespan` | string | Aggregation span for user metrics; valid values: `day`, `week`, `month`, `quarter` |
| `chatTimespan` | string | Aggregation span for chat metrics; valid values: `day`, `week`, `month`, `quarter` |
| `appTimespan` | string | Aggregation span for application metrics; valid values: `day`, `week`, `month`, `quarter` |

## Response Structure
A successful API call returns a 200 OK status with a JSON object containing three top-level metric arrays:
1.  `userData`: Aggregated periodic user activity data, matching the span set in `userTimespan`
    - `timestamp`: Unix millisecond timestamp of the aggregation period
    - `summary`: Metric summary for the period, including active user count, new user count, retained user count, total points consumed, and user count broken down by source
2.  `chatData`: Aggregated periodic chat performance data, matching the span set in `chatTimespan`
    - `timestamp`: Unix millisecond timestamp of the aggregation period
    - `summary`: Metric summary including total chat messages, session count, error count, and total points consumed
3.  `appData`: Aggregated periodic application performance and feedback data, matching the span set in `appTimespan`
    - `timestamp`: Unix millisecond timestamp of the aggregation period
    - `summary`: Metric summary including positive feedback count, negative feedback count, total chat count, and total response time

## Example Request and Response
A sample authenticated request is shown below:
```bash
curl --location --request POST 'https://cloud.fastgpt.cn/api/proApi/core/app/logs/getChartData' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "appId": "68c46a70d950e8850ae564ba",
  "dateStart": "2025-09-19T16:00:00.000Z",
  "dateEnd": "2025-09-27T15:59:59.999Z",
  "offset": 1,
  "source": [
      "test",
      "online",
      "share",
      "api",
      "cronJob",
      "team",
      "feishu",
      "official_account",
      "wecom",
      "mcp"
  ],
  "userTimespan": "day",
  "chatTimespan": "day",
  "appTimespan": "day"
}'
```
A sample successful response matches the structure defined in the response parameters, with top-level `data` containing the three metric arrays.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/app)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
