---
title: Retrieve FastGPT File View Access Links
slug: /en/integration/fastgpt-file-read-link-retrieval
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Retrieve FastGPT File View Access Links

# API Overview
This GET API endpoint generates a temporary access link to view the original uploaded file linked to a specified file ID, as part of FastGPT third-party dataset integrations. This link enables direct viewing of the target file without requiring additional authentication beyond the provided API Bearer [REDACTED_CREDENTIAL]

# Request Specification
The API adheres to standard RESTful GET request conventions. All valid requests must include a valid authentication header and the unique identifier of the target file as a query parameter.
### Required Request Parameters
| Parameter Name | Location | Requirement | Description |
|----------------|----------|-------------|-------------|
| `id` | Query string | Required | Unique identifier of the target file to generate a read link for |
| `Authorization` | HTTP header | Required | Authentication token, formatted as `Bearer {{authorization}}` where `{{authorization}}` is your valid API token |

#### Example Curl Request
```bash
curl --location --request GET '{{baseURL}}/v1/file/read?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```
Before executing this request, replace `{{baseURL}}` with your FastGPT API base URL, `xx` with the unique ID of your target file, and `{{authorization}}` with your valid API Bearer [REDACTED_CREDENTIAL]

# Response Specification
The API returns a JSON-formatted response with standardized fields to indicate request outcome and return data. A successful request will return a 200 OK HTTP status code alongside the following structured response:
#### Example Successful Response
```json
{
  "success": true,
  "message": "",
  "data": {
    "url": "xxxx"
  }
}
```
### Response Field Breakdown
| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | Indicates if the request completed successfully; `true` for successful requests, `false` for failed requests |
| `message` | String | Provides additional context for the request outcome; an empty string is returned for successful requests |
| `data.url` | String | Direct access link to the original file. This link will automatically open the file when accessed in a compatible web browser or media viewer. |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
