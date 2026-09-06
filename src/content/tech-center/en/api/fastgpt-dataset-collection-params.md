---
title: Configure FastGPT Dataset Collection Creation Parameters
slug: /en/api/fastgpt-dataset-collection-params
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# Configure FastGPT Dataset Collection Creation Parameters

# Overview
This document outlines the required and optional parameters for creating a dataset collection via the FastGPT OpenAPI, including complete request parameter specifications and standard response fields. All details are pulled directly from the official FastGPT OpenAPI dataset documentation.

# Request Parameter Reference
The following table lists all available request parameters for dataset collection creation, with their purpose, requirement status, and default behavior where applicable:
| Parameter        | Description                                                                                                                                     | Required |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| datasetId        | Unique identifier of the target dataset                                                                                                          | ✅       |
| parentId         | Parent directory ID. Defaults to the root dataset directory if not provided                                                                      |          |
| trainingType     | Data processing method. Accepts `chunk` (split by text length) or `qa` (Q&A extraction)                                                         | ✅       |
| indexPrefixTitle | Toggles automatic generation of title-based indexes                                                                                             |          |
| customPdfParse   | Toggles enhanced PDF parsing. Defaults to `false` (disabled) when unset, enables enhanced parsing when set to `true`                              |          |
| autoIndexes      | Toggles automatic index generation. Only available for commercial FastGPT versions                                                               |          |
| imageIndex       | Toggles automatic image indexing. Only available for commercial FastGPT versions                                                                 |          |
| chunkSettingMode | Chunk parameter configuration mode. Accepts `auto` (system default) or `custom` (manual specification)                                           |          |
| chunkSplitMode   | Chunk splitting strategy. Accepts `size` (split by fixed length) or `char` (split by custom characters). Only active when `chunkSettingMode=custom` |          |
| chunkSize        | Target size for each text chunk, defaults to 1500. Only active when `chunkSettingMode=custom`                                                   |          |
| indexSize        | Target size for generated indexes, defaults to 512, must be less than the embedding model’s maximum token limit. Only active when `chunkSettingMode=custom` |          |
| chunkSplitter    | Custom highest-priority split symbol. Will not split further unless exceeding file processing context limits. Only active when `chunkSettingMode=custom` |          |
| qaPrompt         | Custom prompt template for Q&A pair extraction, used when `trainingType=qa`                                                                      |          |
| tags             | Array of string tags to assign to the collection                                                                                                |          |
| createTime       | File creation timestamp, accepts Date object or string format                                                                                    |          |

# Standard Response Fields
Upon successful creation of the dataset collection, the API returns two core fields:
- `collectionId`: Unique alphanumeric identifier for the newly created collection
- `insertLen`: Integer count of successfully inserted text chunks

# Key Usage Notes
All mandatory parameters must be included in the request to avoid validation errors. Optional parameters will use their default values if omitted. Commercial-exclusive parameters will not function on non-commercial FastGPT deployments. Chunk configuration parameters only apply when `chunkSettingMode` is set to `custom`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
