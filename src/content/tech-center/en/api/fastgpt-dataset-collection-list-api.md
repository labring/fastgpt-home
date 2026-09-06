---
title: Retrieve FastGPT Dataset Collection List via API
slug: /en/api/fastgpt-dataset-collection-list-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Retrieve FastGPT Dataset Collection List via API

# API Endpoint Overview
This endpoint retrieves a paginated list of collections within a specified FastGPT dataset. The official API path is `/api/core/dataset/collection/listV2`, and all requests must use the HTTP POST method. A valid Bearer token must be included in the `Authorization` header for authentication, and the request content type must be set to `application/json`.

# Request Parameters & Example
Below is the complete curl request example for this API:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/listV2' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "offset":0,
    "pageSize": 10,
    "datasetId":"6593e137231a2be9c5603ba7",
    "parentId": null,
    "searchText":""
}'
```
The following table details all supported request parameters:
| Parameter | Type | Required | Description |
|---|---|---|---|
| offset | number | Yes | Pagination offset for result set |
| pageSize | number | Optional | Maximum number of items per page, maximum allowed value is 30 |
| datasetId | string | Yes | Unique identifier of the target dataset |
| parentId | string \| null | Optional | Filter collections by their parent folder ID; use `null` to fetch top-level collections |
| searchText | string | Optional | Fuzzy search term to match collection names or associated tags |

# Response Structure & Example
A successful API request returns a JSON object with the following top-level fields:
- `code`: Numeric status code, 200 indicates success
- `statusText`: Short status message
- `message`: Detailed response message
- `data`: Container for result data, including `list` (array of collection objects) and `total` (total count of matching collections)

Each collection object in the `list` array contains the following fields, as shown in the official example response:
- `_id`: Unique identifier of the collection
- `parentId`: Parent folder ID, or `null` for top-level collections
- `tmbId`: Thumbnail image identifier
- `type`: Collection type (e.g. `virtual` for manual entries, `link` for external links)
- `name`: Display name of the collection
- `updateTime`: Last updated timestamp in ISO 8601 format
- `dataAmount`: Total number of data items in the collection
- `trainingAmount`: Number of trained data items
- `externalFileId`: External file unique identifier (for linked collections)
- `tags`: Array of associated tag strings
- `forbid`: Boolean indicating if the collection is disabled
- `trainingType`: Training mode for the collection (e.g. `chunk`)
- `permission`: Object containing access control details, including `value` (permission bitmask), `isOwner`, `hasManagePer`, `hasWritePer`, `hasReadPer`

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
