---
title: Create FastGPT Datasets via OpenAPI
slug: /en/api/fastgpt-dataset-create-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Create FastGPT Datasets via OpenAPI

## Core Endpoint & Authentication
This OpenAPI endpoint allows programmatic creation of FastGPT datasets and folder directories. The base request URL is `http://localhost:3000/api/core/dataset/create`. All requests must include two required headers: an `Authorization: Bearer {{authorization}}` header with a valid FastGPT API token, and a `Content-Type: application/json` header to specify JSON request bodies.

## Request Parameters
The following table lists all supported request fields, with requirements and default behaviors pulled directly from the official FastGPT documentation:
| Parameter | Type | Required | Description | Default Behavior |
|-----------|------|----------|-------------|------------------|
| parentId | string / null | No | Unique ID of the parent folder for building a nested directory structure | Omitted or set to `null` for a top-level item |
| type | string | No | Specifies item type: either `dataset` for a standard knowledge dataset or `folder` for a directory container | Creates a standard dataset if not provided |
| name | string | Yes | Human-readable name for the new dataset or folder | No default; this field must be supplied |
| intro | string | No | Short descriptive text for the item | Empty string if not included |
| avatar | string | No | Publicly accessible URL for the item's avatar image | Empty string if not included |
| vectorModel | string | No | Vector embedding model used for text chunk indexing | Uses the FastGPT system default if omitted |
| agentModel | string | No | LLM used for text processing and dataset operations | Uses the FastGPT system default if omitted |
| vlmModel | string | No | Vision-language model used for image content understanding | Uses the FastGPT system default if omitted |

## Example Requests & Responses
A sample curl request for creating a top-level test dataset is shown below:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/create' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "parentId": null,
  "type": "dataset",
  "name":"test",
  "intro":"Sample dataset description",
  "avatar": "",
  "vectorModel": "text-embedding-ada-002",
  "agentModel": "gpt-3.5-turbo-16k",
  "vlmModel": "gpt-4.1"
}'
```
A successful API response returns a 200 status code, with the following JSON structure:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": "65abc9bd9d1448617cba5e6c"
}
```
The `data` field contains the unique alphanumeric ID of the newly created dataset or folder, which can be used for subsequent API operations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
