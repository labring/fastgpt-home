---
title: Create Empty FastGPT Dataset Collections and Folders
slug: /en/api/fastgpt-dataset-collection-create
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Create Empty FastGPT Dataset Collections and Folders

**API Endpoint Overview**
This section documents the official FastGPT OpenAPI endpoint for programmatically creating empty dataset collections and folders. This endpoint enables automated setup of dataset structures without manual interaction via the FastGPT web interface. The endpoint accepts POST requests to `http://localhost:3000/api/core/dataset/collection/create`. All authenticated requests must include a valid Bearer token in the `Authorization` header, with the `Content-Type` header explicitly set to `application/json` to ensure proper payload parsing.

**Request Parameters**
The following table lists all supported request parameters, with requirements and defaults as defined in the official API specification:
| Parameter | Required | Default Value | Description |
|---|---|---|---|
| datasetId | Yes | N/A | Unique identifier of the target dataset |
| parentId | No | Null | Parent folder ID; uses the dataset root directory if not provided |
| name | Yes | N/A | Display name for the new collection or folder |
| type | Yes | N/A | Specifies the resource type: either `folder` for a folder, or `virtual` for a manual collection |
| metadata | No | N/A | Reserved metadata object; no current operational usage |

**Sample Request**
Use the following curl command as a template for sending create requests. Replace placeholder values such as `{{authorization}}` and `6593e137231a2be9c5603ba7` with your actual authentication token and target dataset ID:
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "datasetId":"6593e137231a2be9c5603ba7",
    "parentId": null,
    "name":"Test Collection",
    "type":"virtual",
    "metadata":{
      "test":111
    }
}'
```

**Successful Response**
A successful request returns a 200 OK HTTP status code with a JSON payload. The top-level `code` field is set to 200 for successful operations, while the `statusText` and `message` fields remain empty. The `data` field contains the unique alphanumeric ID of the newly created collection or folder:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": "65abcd009d1448617cba5ee1"
}
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
