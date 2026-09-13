---
title: Retrieve FastGPT File Details via API
slug: /en/integration/fastgpt-api-file-details
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Retrieve FastGPT File Details via API

## Endpoint Overview
This GET API endpoint retrieves detailed metadata for a specific file or folder within a FastGPT dataset. It is designed to fetch core resource information including identifiers, names, timestamps, and hierarchy details.

## Request Specifications
The endpoint follows standard REST API conventions for read operations. The full request URL format is `{{baseURL}}/v1/file/detail?id={target-id}`. Below is a breakdown of required request components:

| Parameter Type | Name | Required | Description |
|----------------|------|----------|-------------|
| Query Param | id | Yes | Unique identifier of the target file or folder |
| Header | Authorization | Yes | Bearer token for authentication, formatted as `Bearer {{authorization}}` |

A complete working request example is provided below:
```bash
curl --location --request GET '{{baseURL}}/v1/file/detail?id=xx' \
--header 'Authorization: Bearer {{authorization}}'
```
Replace `{{baseURL}}` with your FastGPT instance’s base URL, `{{authorization}}` with your valid API bearer token, and `xx` with the target resource’s unique ID.

## Response Schema and Example
All successful responses return a JSON object with three top-level fields:
1. `success`: Boolean indicating if the request completed successfully
2. `message`: Status message string, empty for successful requests
3. `data`: Object containing detailed metadata for the requested resource

The `data` object includes the following fields, as defined in the source documentation:
- `id`: Unique identifier for the file or folder
- `name`: Display name of the resource
- `parentId`: ID of the parent folder; a `null` value indicates the root directory
- `type`: Resource type, either `file` or `folder`
- `updateTime`: ISO 8601 formatted timestamp of the last resource update
- `createTime`: ISO 8601 formatted timestamp of the resource’s initial creation

A sample successful response is shown below:
```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "xxxx",
    "name": "test.json",
    "parentId": "xxxx",
    "type": "file",
    "updateTime": "2024-11-26T03:05:24.759Z",
    "createTime": "2024-11-26T03:05:24.759Z"
  }
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
