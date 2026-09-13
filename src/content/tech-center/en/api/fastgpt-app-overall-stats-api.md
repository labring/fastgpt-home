---
title: Retrieve FastGPT App Overall Usage Statistics
slug: /en/api/fastgpt-app-overall-stats-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/app
source_type: Official documentation
---

# Retrieve FastGPT App Overall Usage Statistics

## API Overview
This GET-based API endpoint returns aggregated, high-level usage metrics for a specified FastGPT application. It pulls three core metrics: total unique users, total chat interactions, and total platform points consumed. The endpoint is intended for programmatic retrieval of app performance and usage data without accessing the FastGPT web dashboard.

## Request Configuration
Use the following curl command template to send a valid request. Replace the placeholder `appId` value with your target application’s unique ID, and replace `apikey` with your active FastGPT API key.
```bash
curl --location --request GET 'https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData?appId=68c46a70d950e8850ae564ba' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]'
```
The following table outlines required request parameters:
| Parameter | Location | Details |
|-----------|----------|---------|
| appId | Query string | Unique identifier for the FastGPT application. Required to target the correct app for statistics retrieval. |
| Authorization | HTTP Header | Must be formatted as `Bearer ${apikey}`, where `apikey` is your personal or team API key for FastGPT cloud access. |

## Response Schema
A successful request returns a JSON object with top-level metadata and a `data` field containing the aggregated metrics. The exact successful response format is shown below:
```json
{
    "code": 200,
    "statusText": "",
    "message": "",
    "data": {
        "totalUsers": 0,
        "totalChats": 0,
        "totalPoints": 0
    }
}
```
The following table defines the fields within the `data` object:
| Field | Type | Description |
|-------|------|-------------|
| totalUsers | Integer | Total count of unique end users who have initiated chats with the target application. |
| totalChats | Integer | Total number of chat interactions or messages exchanged through the application. |
| totalPoints | Integer | Total number of FastGPT platform points consumed by all usage of the application. |
Top-level response fields include `code` (HTTP status code, with 200 indicating a successful request), `statusText` (empty on successful calls), and `message` (empty on successful retrieval of statistics).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/app)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
