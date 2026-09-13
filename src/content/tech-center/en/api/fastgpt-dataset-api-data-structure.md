---
title: FastGPT Dataset API Data Structure Reference
slug: /en/api/fastgpt-dataset-api-data-structure
page_type: API
source: https://doc.fastgpt.cn/en/openapi/dataset
source_type: Official documentation
---

# FastGPT Dataset API Data Structure Reference

# Overview
This reference document outlines the official data structure for dataset entries used in the FastGPT OpenAPI. These structures are required for programmatically creating, updating, and managing dataset data, ensuring consistent formatting for vector embedding and retrieval operations.

# Core Data Structure
The following table lists all valid fields for a FastGPT dataset data entry, including their data type, functional description, and requirement status for API requests:
| Field         | Type    | Description    | Required |
| ------------- | ------- | -------------- | -------- |
| teamId        | String  | Team ID        | ✅       |
| tmbId         | String  | Member ID      | ✅       |
| datasetId     | String  | Dataset ID     | ✅       |
| collectionId  | String  | CollectionID   | ✅       |
| q             | String  | Primary data   | ✅       |
| a             | String  | Auxiliary data | ✖        |
| fullTextToken | String  | Tokenization   | ✖        |
| indexes       | Index[] | Vector indexes | ✅       |
| updateTime    | Date    | Update time    | ✅       |
| chunkIndex    | Number  | Chunk index    | ✖        |

# Index Sub-Structure
Each dataset data entry can include up to 5 custom vector indexes. The following table defines the valid fields for an individual index entry:
| Field  | Type   | Description                                                                                                                         | Required |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type   | String | Optional index types: default-default index; custom-custom index; summary-summary index; question-question index; image-image index |          |
| dataId | String | Associated vector ID. Pass this ID when updating data for incremental updates instead of full updates                               |          |
| text   | String | Text content                                                                                                                        | ✅       |

Per the official specification, if the `type` field is not provided for an index, it defaults to `custom`. A default index will also be created based on the `q` and `a` fields of the parent data entry unless a default index is explicitly included in the `indexes` array, in which case no additional default index is generated.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/dataset)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
