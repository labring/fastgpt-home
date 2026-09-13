---
title: Retrieve FastGPT Dataset Details via API
slug: /en/api/fastgpt-dataset-detail-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Retrieve FastGPT Dataset Details via API

## Endpoint Overview
This GET API endpoint retrieves full metadata and configuration details for a single FastGPT dataset. The endpoint is hosted at `http://localhost:3000/api/core/dataset/detail`, and requires a valid Bearer token passed via the Authorization header for authentication.

## Request Parameters
| Parameter | Required | Description |
|-----------|----------|-------------|
| id | Yes | Unique alphanumeric identifier for the target FastGPT dataset |

## Sample Request
Use the following curl command to send a request to the endpoint:
```bash
curl --location --request GET 'http://localhost:3000/api/core/dataset/detail?id=6593e137231a2be9c5603ba7' \
--header 'Authorization: Bearer {{authorization}}' \
```
Replace `{{authorization}}` with a valid FastGPT API bearer token, and update the `id` query parameter to match the unique identifier of the target dataset.

## Response Details
A successful request returns a 200 HTTP status code with the following structured response:
The top-level response object includes four core properties:
- `code`: Numeric HTTP status code for the request
- `statusText`: Short status message (empty for successful requests)
- `message`: Detailed response message (empty for successful requests)
- `data`: Object containing all dataset metadata and configuration settings

The `data` object includes the following fields:
- `_id`: Unique dataset identifier matching the requested ID
- `parentId`: Parent dataset identifier, null for top-level datasets
- `teamId`: Unique identifier for the associated team
- `tmbId`: Team workspace identifier
- `type`: Fixed dataset type identifier, set to `dataset`
- `status`: Operational status of the dataset, e.g. `active`
- `avatar`: Relative file path to the dataset's avatar image
- `name`: Human-readable display name for the dataset
- `vectorModel`: Configuration object for the dataset's embedding model, including model identifier, display name, cost per 1000 characters, default and maximum token limits, and priority weight
- `agentModel`: Configuration object for the dataset's associated LLM, including model identifier, display name, context window limits, response token limits, and usage cost
- `intro`: Plain text description of the dataset (empty in sample requests)
- `permission`: Access control level for the dataset, e.g. `private`
- `updateTime`: ISO 8601 formatted timestamp of the most recent dataset update
- `canWrite`: Boolean indicating if the requesting user has write permissions for the dataset
- `isOwner`: Boolean indicating if the requesting user is the original owner of the dataset

### Sample Response
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "_id": "6593e137231a2be9c5603ba7",
    "parentId": null,
    "teamId": "65422be6aa44b7da77729ec8",
    "tmbId": "65422be6aa44b7da77729ec9",
    "type": "dataset",
    "status": "active",
    "avatar": "/icon/logo.svg",
    "name": "FastGPT test",
    "vectorModel": {
      "model": "text-embedding-ada-002",
      "name": "Embedding-2",
      "charsPointsPrice": 0,
      "defaultToken": 512,
      "maxToken": 8000,
      "weight": 100
    },
    "agentModel": {
      "model": "gpt-3.5-turbo-16k",
      "name": "FastAI-16k",
      "maxContext": 16000,
      "maxResponse": 16000,
      "charsPointsPrice": 0
    },
    "intro": "",
    "permission": "private",
    "updateTime": "2024-01-02T10:11:03.084Z",
    "canWrite": true,
    "isOwner": true
  }
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
