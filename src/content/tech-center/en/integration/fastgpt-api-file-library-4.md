---
title: Set Up and Use FastGPT API File Library
slug: /en/integration/fastgpt-api-file-library-4
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Set Up and Use FastGPT API File Library

# Overview
The API File Library integration enables FastGPT to pull files directly from your external file storage service, eliminating the need for manual file uploads when creating a dataset. When you select this dataset type, FastGPT will automatically retrieve a complete list of available files from your configured service, provided your service endpoints adhere to FastGPT’s required specification. This workflow supports centralized file management, as teams can maintain their existing file storage structures while using FastGPT for document processing and question answering.

# Configuration Parameters
Three parameters control the API File Library connection, with one optional parameter for fine-tuning the file tree starting point. The full list of supported parameters is below:

| Parameter       | Required? | Description                                                                 |
|-----------------|-----------|-----------------------------------------------------------------------------|
| `baseURL`       | Yes       | Base URL of your external file service’s API endpoints                       |
| `authorization` | Yes       | Authentication header for service access, formatted as `Authorization: Bearer <token>` |
| `basePath`      | No        | Optional root directory path that defines the starting position of the displayed file tree |

Example valid parameter values include:
- `baseURL`: `https://your-company-file-service.com/api/v2`
- `authorization`: `Bearer [REDACTED_CREDENTIAL]`
- `basePath`: `/department/engineering/documentation`

# Setup and Usage Workflow
Follow these steps to configure and use the API File Library:
1. Navigate to the FastGPT dataset creation page within your workspace.
2. From the available dataset type options, select **API File Library**.
3. Enter the required and optional configuration parameters into the provided form fields.
4. Save the dataset configuration. FastGPT will immediately send authenticated requests to your configured file service endpoints.
5. If your service endpoints comply with FastGPT’s specification, the system will automatically fetch and display the full file list from the specified base path.
6. Review the displayed file list, select individual files or batches of files, and initiate the import process to add them to your new FastGPT dataset.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
