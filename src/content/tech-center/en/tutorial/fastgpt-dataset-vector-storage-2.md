---
title: FastGPT Dataset Vector Storage Architecture Overview
slug: /en/tutorial/fastgpt-dataset-vector-storage-2
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# FastGPT Dataset Vector Storage Architecture Overview

## Core Storage Stack
FastGPT uses the PostgreSQL PG Vector extension with HNSW indexing as its vector retriever. PostgreSQL is dedicated exclusively to vector search operations, and this engine may be swapped for other compatible vector databases. All remaining dataset-related data is stored in MongoDB.

## MongoDB Data Storage Configuration
All vector source data is stored in the MongoDB `dataset.datas` collection. Each entry in this collection includes an `indexes` field, which is an array of corresponding vector IDs. This array structure allows a single source data entry to map to multiple vector records. Beyond default text-based indexes, image content can generate additional image description indexes or image vector indexes if the configured AI models support such functionality.

## PostgreSQL Vector Storage & Search Workflow
PostgreSQL maintains a dedicated `vector` field to store embedding vectors. A standard table structure is used to host these vectors, with the HNSW index enabled for efficient similarity search. The full search workflow follows three sequential steps:
1.  Retrieve top-matching vectors from the PostgreSQL vector store
2.  Use the retrieved vector IDs to look up the original source data entries in the MongoDB `dataset.datas` collection
3.  Merge duplicate source data entries, and use the highest vector score for each unique source entry in final results

### Key Storage Component Reference Table
| Storage System       | Target Collection/Table | Key Fields                                                                 | Primary Purpose                                                                 |
|----------------------|-------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| MongoDB              | dataset.datas           | `indexes` (array of vector IDs), raw source dataset content               | Stores original dataset material and maps entries to their associated vector records |
| PostgreSQL           | Vector Storage Table    | `vector` (embedding vector data), vector ID field                          | Executes fast vector similarity searches via PG Vector extension and HNSW indexing |

An accompanying architecture diagram illustrates the end-to-end data flow between these two storage systems during vector search operations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
