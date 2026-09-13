---
title: Retrieve FastGPT API Dataset File Trees
slug: /en/integration/fastgpt-api-dataset-file-tree
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Retrieve FastGPT API Dataset File Trees

## Overview
This document details the official FastGPT third-party API dataset file tree retrieval endpoint, which provides a structured list of files and directories linked to a configured external data source. This endpoint allows developers to programmatically browse the contents of a connected dataset without accessing the FastGPT web interface directly.

## Request Specifications
### Request URL and Method
The endpoint uses a POST request to the following path:
`{{baseURL}}/v1/file/list`
Replace `{{baseURL}}` with your FastGPT instance's base API URL, and include a valid bearer token in the Authorization header.

### Request Body Parameters
All request body parameters are optional, with default behaviors defined below:
| Parameter Name | Data Type | Default Behavior |
|----------------|-----------|------------------|
| parentId | string or null | If omitted or set to null, uses the configured basePath of the dataset as the root directory for the list |
| searchKey | string | If left empty, returns all items in the target directory; when populated, filters results to match the provided keyword |

### Example Request
```bash
curl --location --request POST '{{baseURL}}/v1/file/list' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{"parentId": null, "searchKey": ""}'
```

## Response Format
A successful request returns a JSON object with three top-level fields:
1. `success`: A boolean flag confirming successful execution of the request
2. `message`: A string providing status context; returns an empty string for successful requests
3. `data`: An array of item objects, each representing a file or directory with these properties:
   - `id`: Unique alphanumeric identifier for the item
   - `parentId`: Unique identifier of the item's parent directory
   - `type`: String indicating the item type, e.g. "file"
   - `name`: Display name of the item
   - `updateTime`: ISO 8601 timestamp of the item's last modification
   - `createTime`: ISO 8601 timestamp of the item's initial creation
   - `hasChild`: Boolean indicating if the item contains child items

### Example Response
```json
{
  "success": true,
  "message": "",
  "data": [
    {
      "id": "xxxx",
      "parentId": "xxxx",
      "type": "file",
      "name": "test.json",
      "updateTime": "2024-11-26T03:05:24.759Z",
      "createTime": "2024-11-26T03:05:24.759Z",
      "hasChild": false
    }
  ]
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
