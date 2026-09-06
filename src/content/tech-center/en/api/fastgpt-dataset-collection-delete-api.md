---
title: Delete FastGPT Dataset Collections via API
slug: /en/api/fastgpt-dataset-collection-delete-api
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Delete FastGPT Dataset Collections via API

## API Overview
This POST API endpoint enables authorized users to delete existing dataset collections within a FastGPT deployment. The fixed API path is `http://localhost:3000/api/core/dataset/collection/delete`, and all requests require a valid authentication header to proceed.

## Required Parameters
All requests must include a JSON body with the following parameter:
| Parameter Name | Type | Description |
|----------------|------|-------------|
| `collectionIds` | Array of strings | A list of unique identifiers for the dataset collections targeted for deletion |

## Step-by-Step Usage
1. Acquire your FastGPT API bearer token, which replaces the placeholder `fastgpt-` value in the example request.
2. Retrieve the unique collection IDs for the collections you intend to delete from your FastGPT dataset management dashboard.
3. Update the example curl command to substitute your actual bearer token and replace the example collection ID with your target IDs in the `collectionIds` array.
4. Run the modified curl command in a terminal session with network access to your FastGPT instance.

The official example request is:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/delete' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{"collectionIds": ["65a8cdcb0d70d3de0bf08d0a"]}'
```

## Successful Response
Upon successful deletion of the specified collections, the endpoint returns a standardized JSON response. The official example response is:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
Each field in the response serves a specific purpose: `code` returns the HTTP status code for the request, with 200 indicating a successful operation. `statusText` and `message` are empty strings when no errors occur, and `data` is null as no additional data is returned after a collection deletion request.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
