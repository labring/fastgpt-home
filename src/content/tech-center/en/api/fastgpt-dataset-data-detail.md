---
title: Retrieve Single FastGPT Dataset Data Details
slug: /en/api/fastgpt-dataset-data-detail
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Retrieve Single FastGPT Dataset Data Details

# Endpoint Overview
This OpenAPI endpoint retrieves full details for a single dataset data entry stored in a FastGPT knowledge base. It is designed for developers needing to fetch specific, granular data about an individual dataset record without retrieving entire dataset batches. The endpoint uses an authenticated GET request to access FastGPT's core dataset API layer.

# Request Configuration
All requests require a valid Bearer [REDACTED_CREDENTIAL] token and a valid target data ID. The base endpoint URL for local FastGPT instances is `http://localhost:3000/api/core/dataset/data/detail`.

## Required Parameters
| Parameter | Location | Type | Description |
|-----------|----------|------|-------------|
| id | Query String | String | Unique identifier of the target dataset data entry |
| Authorization | Header | String | Bearer token for API authentication, formatted as `Bearer {{authorization}}` |

# Step-by-Step Request Example
Use the following curl command to send a valid request, replacing the placeholder ID and authorization token with actual values:
```bash
curl --location --request GET 'http://localhost:3000/api/core/dataset/data/detail?id=65abd4b29d1448617cba61db' \
--header 'Authorization: Bearer {{authorization}}' \
```
- The `--location` flag follows any redirects returned by the API server.
- The `--request GET` flag specifies the HTTP method for the request.
- The query string parameter `id` targets the specific dataset data entry with the given unique ID.
- The Authorization header includes a placeholder bearer token that must be replaced with a valid FastGPT API token.

# Response Structure
A successful request returns a JSON object with a 200 status code. The top-level response fields include `code`, `statusText`, `message`, and `data`. The `data` object contains all core details of the requested dataset entry:
- `id`: Unique identifier of the dataset data entry
- `q`: Primary text content of the dataset entry
- `a`: Associated answer content (empty in standard test responses)
- `chunkIndex`: Index position of the data chunk within its source file
- `indexes`: Array of index metadata entries for the dataset chunk
- `datasetId`: Unique ID of the parent dataset
- `collectionId`: Unique ID of the parent collection within the dataset
- `sourceName`: Filename of the original source file uploaded to FastGPT
- `sourceId`: Unique identifier of the original source file
- `isOwner`: Boolean indicating if the requesting user owns the dataset entry
- `canWrite`: Boolean indicating if the requesting user has write permissions for the entry

The `indexes` array contains objects with fields `type`, `dataId`, `text`, and `_id`, matching the structure shown in the sample response.
> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
