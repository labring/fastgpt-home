---
title: Retrieve Single File Content via FastGPT API
slug: /en/integration/fastgpt-api-retrieve-single-file-content
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Retrieve Single File Content via FastGPT API

## API Endpoint Overview
This GET endpoint enables third-party systems to provide file content or a publicly accessible file link for FastGPT dataset indexing and retrieval. The endpoint uses your deployment's base URL (`{{baseURL}}`) and targets the path `/v1/file/content`.

## Request Specification
The request requires a valid authentication token and a target file ID. Use the following example curl command to send a request:
```bash
curl --location --request GET '{{baseURL}}/v1/file/content?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```
The following table outlines required request components:
| Component | Type | Required | Details |
|-----------|------|----------|---------|
| HTTP Method | GET | Yes | Must use the GET HTTP method |
| Endpoint Path | `/v1/file/content` | Yes | Exact API path for the single file content endpoint |
| Query Parameter `id` | String | Yes | Unique identifier of the target file to retrieve content for |
| Authorization Header | String | Yes | Must use the format `Bearer {{authorization}}`, where `{{authorization}}` is a valid FastGPT API access token |

## Response Specification
A successful request returns a JSON object with the following structure:
```json
{
  "success": true,
  "message": "",
  "data": {
    "title": "Document Title",
    "content": "FastGPT is an LLM-based Dataset Q&A system with out-of-the-box data processing and model calling capabilities. It also supports visual Workflow orchestration for complex Q&A scenarios!\n"
  }
}
```
The `data` object contains file-related details, with the following fields:
| Field | Type | Optional | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Display name for the file. If not provided, the system will attempt to extract the filename from the `previewUrl` field. |
| `content` | String | Yes | Full extracted text content of the file. If provided, this field takes priority over `previewUrl`. |
| `previewUrl` | String | Yes | Publicly accessible link to the source file. The system will automatically download and parse content from this URL if `content` is not provided. |

### Critical Usage Notes
- Either `content` or `previewUrl` must be included in the response; at least one is required, otherwise an error will occur.
- If both `content` and `previewUrl` are provided, the system will use the direct `content` value instead of fetching content from the URL.
- When `previewUrl` is used, the system will cache parsed file results to improve performance for subsequent requests.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
