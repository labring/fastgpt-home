---
title: FastGPT Dataset File Import Process Details
slug: /en/deploy/fastgpt-dataset-file-import-process
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/design/dataset
source_type: Official documentation
---

# FastGPT Dataset File Import Process Details

## Overview
This technical reference details the standardized file import workflow for FastGPT dataset ingestion, as defined in the official self-hosted design documentation. The workflow covers end-to-end processing from initial file upload to final vectorized data storage, with no additional third-party or custom extensions included.

## Step-by-Step File Import Workflow
The complete import process follows five sequential, documented stages:
1.  Initial File Upload: Upload the target source file to MongoDB GridFS, which generates and returns a unique `file_id` identifier for the uploaded asset. At this stage, the file is marked with an `unused` status flag.
2.  Client-Side Text Extraction: The browser parses the uploaded file to extract raw textual content, then splits the extracted text into discrete, manageable chunks.
3.  Chunk Lineage Tagging: Each generated text chunk is tagged with the `file_id` retrieved during the initial upload, creating a direct link between the chunk and its original source file.
4.  Confirmed Upload Submission: When a user initiates the upload by clicking the upload button, the file’s status is updated from `unused` to `used`. All tagged text chunks are pushed to the MongoDB `training` collection, where they enter a queue waiting for backend processing.
5.  Backend Vector Processing: The dedicated processing worker pulls queued text chunk data from the MongoDB `training` collection, generates vector embeddings for each chunk, and inserts the fully vectorized data into the PostgreSQL (PG) database for long-term storage and semantic search access.

## Key System Storage Details
Three core storage systems are utilized across the workflow:
1.  MongoDB GridFS: Primary temporary storage for raw uploaded files, with `file_id` serving as the unique tracking identifier for each asset.
2.  MongoDB `training` Collection: Staging repository for tagged text chunks between client-side preparation and backend vector generation.
3.  PostgreSQL Database: Final storage layer for vectorized text chunks, enabling efficient retrieval of semantically related content for FastGPT applications.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/design/dataset)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
