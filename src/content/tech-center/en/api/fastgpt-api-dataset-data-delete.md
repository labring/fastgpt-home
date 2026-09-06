---
title: Delete Single Dataset Data via FastGPT API
slug: /en/api/fastgpt-api-dataset-data-delete
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Delete Single Dataset Data via FastGPT API

## Overview
This document details the FastGPT OpenAPI endpoint for deleting a single data entry from a dataset. This endpoint enables programmatic, targeted removal of individual dataset entries, ensuring no unintended changes to other data stored in the target dataset. The endpoint uses a standard HTTP DELETE request structure and requires valid authentication credentials.

## Request Parameters
All required parameters for this endpoint are passed via query strings or HTTP headers:
| Parameter Name | Location | Description |
|----------------|----------|-------------|
| id             | Query    | Unique identifier of the specific dataset data entry to delete. This mandatory parameter specifies exactly which entry will be removed. |

A valid `Authorization` header must also be included with every request. This header must use the Bearer [REDACTED_CREDENTIAL] scheme, with a valid FastGPT API token provided as the credential value in place of the `{{authorization}}` placeholder.

## Example Request
The following curl command provides a complete, valid example of a deletion request. Adjust the placeholder values to match your actual target data ID and API token:
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/dataset/data/delete?id=65abd4b39d1448617cba624d' \
--header 'Authorization: Bearer {{authorization}}' \
```
The default service address uses `localhost:3000`; update this portion of the URL to match your actual FastGPT deployment domain and port if your instance is hosted remotely or uses a non-default port configuration.

## Example Response
A successful deletion request returns a standardized JSON response, as shown below:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": "success"
}
```
The response fields follow a consistent FastGPT OpenAPI format:
- `code`: Numeric status code, with a value of 200 confirming the deletion request was processed successfully.
- `statusText`: Empty string for successful requests per this endpoint's standard response structure.
- `message`: Empty string for successful requests per this endpoint's standard response structure.
- `data`: A confirmation string set to `success` to verify the target data entry was deleted without errors.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
