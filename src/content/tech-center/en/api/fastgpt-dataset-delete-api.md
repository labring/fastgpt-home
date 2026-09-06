---
title: Delete a FastGPT Dataset via OpenAPI
slug: /en/api/fastgpt-dataset-delete-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Delete a FastGPT Dataset via OpenAPI

## Overview of Dataset Delete API
This OpenAPI endpoint enables permanent deletion of a single FastGPT dataset via a standardized HTTP DELETE request. The endpoint uses the base URL `http://localhost:3000` and the path `/api/core/dataset/delete`. Valid authentication is required to process all deletion requests, making the endpoint secure for programmatic dataset management.

## Required Request Parameters
All valid deletion requests must include two mandatory components: a target dataset ID query parameter and a valid authentication header. The full breakdown of required parameters is below:

| Parameter Category | Name | Description |
|---------------------|------|-------------|
| URL Query String    | id   | Unique identifier of the dataset to be deleted |
| Request Header      | Authorization | Authentication token formatted as `Bearer {{authorization}}` |

## Example Request and Response
The following exact curl command demonstrates a valid dataset deletion request. Replace the placeholder dataset ID and authorization token with values from your FastGPT deployment:
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/dataset/delete?id=65abc8729d1448617cba5df6' \
--header 'Authorization: Bearer {{authorization}}' \
```
A successful deletion returns a standardized JSON response, as shown in the official example:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```

## Successful Response Details
Each field in the successful response follows a fixed, documented structure:
- `code`: Numeric status code, where a value of 200 confirms the deletion request was processed successfully.
- `statusText`: Short operational status message, which returns an empty string for successful operations.
- `message`: Detailed operational status message, which returns an empty string for successful operations.
- `data`: Response payload, which returns `null` for all successful dataset deletion requests.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
