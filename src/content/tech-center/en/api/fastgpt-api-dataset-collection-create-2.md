---
title: Create FastGPT Dataset Collections via API
slug: /en/api/fastgpt-api-dataset-collection-create-2
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Create FastGPT Dataset Collections via API

## Overview
This V1 API endpoint enables programmatic creation of a dataset collection by passing a pre-uploaded file ID. The API automatically reads the uploaded file content and splits it according to specified configuration settings. Supported file formats include PDF, DOCX, MD, TXT, HTML, and CSV. When uploading via code, Chinese filenames must be URL-encoded to avoid garbled text in the request.

## API Request Parameters
Use the `application/json` Content-Type header for POST requests to the endpoint `http://localhost:3000/api/core/dataset/collection/create/apiCollection`. The following parameters are supported:

| Parameter Name   | Required | Default Value       | Valid Range & Notes                                                                 |
|-------------------|----------|---------------------|-------------------------------------------------------------------------------------|
| name              | Yes      | None                | Collection name; recommended to use the original uploaded filename                  |
| apiFileId         | Yes      | None                | Unique ID of the pre-uploaded target file                                          |
| datasetId         | Yes      | None                | ID of the parent dataset to associate the new collection with                       |
| parentId          | No       | Root directory      | ID of the parent folder for the collection; defaults to the dataset root if omitted  |
| trainingType      | Yes      | None                | Indexing mode; valid values are `chunk` or `qa`                                     |
| chunkSize         | No       | Varies by mode      | For `chunk` mode: 100–3000; for `qa` mode: 4000 up to the model's maximum token limit (16k models recommended ≤10000) |
| chunkSplitter     | No       | Empty string        | Custom highest-priority split symbol for text chunking                              |
| qaPrompt          | No       | Empty string        | Custom prompt for QA-based text splitting                                          |

## Example Requests and Responses
### Curl Request Example
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create/apiCollection' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "A Quick Guide to Building a Discord Bot.pdf",
  "apiFileId":"A Quick Guide to Building a Discord Bot.pdf",
  "datasetId": "674e9e479c3503c385495027",
  "parentId": null,
  "trainingType": "chunk",
  "chunkSize":512,
  "chunkSplitter":"",
  "qaPrompt":""
}'
```

### Response Example
A successful request returns a 200 status code with the following JSON structure:
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "collectionId": "65abc044e4704bac793fbd81",
    "results": {
      "insertLen": 1,
      "overToken": [],
      "repeat": [],
      "error": []
    }
  }
}
```
The `data.collectionId` field contains the unique ID of the newly created collection, while the `results` object provides processing metrics including the number of inserted chunks, entries exceeding token limits, duplicate entries, and processing errors.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
