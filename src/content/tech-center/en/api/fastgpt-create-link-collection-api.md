---
title: Create Link-Based Dataset Collections via FastGPT API
slug: /en/api/fastgpt-create-link-collection-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Create Link-Based Dataset Collections via FastGPT API

### Overview
This API endpoint creates a new collection by fetching raw content from a provided web link, then splitting and processing the content for use in FastGPT. Content is fetched directly from the target webpage before being split. The endpoint accepts POST requests at the path `/api/core/dataset/collection/create/link` on your FastGPT instance. All requests require a valid Bearer [REDACTED_CREDENTIAL] token passed via the `Authorization` header.

### Request Parameters
All request body parameters follow the JSON format. Required parameters are marked explicitly:
| Parameter | Type | Required | Default Value | Description |
|-----------|------|----------|---------------|-------------|
| `link` | string | Yes | — | Full web URL to fetch content from |
| `datasetId` | string | Yes | — | Unique identifier of the target dataset to add the collection to |
| `parentId` | string | No | Root dataset directory | Parent collection ID; uses the root directory if not provided |
| `trainingType` | string | No | `chunk` | Content training mode, fixed to chunk-based splitting in standard usage |
| `chunkSettingMode` | string | No | `auto` | Chunk configuration mode; auto mode automatically splits content |
| `qaPrompt` | string | No | Empty string | Custom prompt for generating QA pairs from fetched content |
| `metadata.webPageSelector` | string | No | — | CSS selector to extract specific content from the target webpage, optional |

### Sample Request
The following curl command demonstrates a valid request:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create/link' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "link":"https://doc.fastgpt.io/guide/getting-started/quick-start",
    "datasetId":"6593e137231a2be9c5603ba7",
    "parentId": null,
    "trainingType": "chunk",
    "chunkSettingMode": "auto",
    "qaPrompt":"",
    "metadata":{
        "webPageSelector":".docs-content"
    }
}'
```

### Sample Successful Response
A successful request returns a 200 status code with the following JSON structure:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "collectionId": "65abd0ad9d1448617cba6031",
    "results": {
      "insertLen": 1,
      "overToken": [],
      "repeat": [],
      "error": []
    }
  }
}
```
The `collectionId` field contains the unique identifier of the newly created collection. The `results` object summarizes processing outcomes: `insertLen` counts successfully inserted content chunks, while `overToken`, `repeat`, and `error` track processing issues for the fetched content.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
