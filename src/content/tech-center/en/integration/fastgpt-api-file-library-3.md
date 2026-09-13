---
title: Eliminate Duplicate Storage Via API File Library
slug: /en/integration/fastgpt-api-file-library-3
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset
source_type: Official documentation
---

# Eliminate Duplicate Storage Via API File Library

# Core Problem & Solution Overview
FastGPT supports local file imports for building knowledge datasets, but re-importing files from an existing pre-configured document library creates duplicate storage and complicates cross-system document management. The API File Library feature is designed to eliminate these issues by enabling seamless integration with your existing document library infrastructure. Unlike local imports, this tool does not require duplicating stored files, offers flexible import options for selecting specific files, and allows you to manage your source documents directly within their original system while using them in FastGPT.

# Required Integration Standards
To connect your existing document library to FastGPT via the API File Library, you must deploy a service that exposes endpoints conforming to FastGPT’s official API File Library specification. No custom development beyond aligning with this standard is required. Once your service is live, two mandatory configuration values are needed to establish the connection: the base URL of your API service, and a secure authentication token to validate access to the library’s API endpoints.

# Step-by-Step Dataset Configuration
Follow these steps to set up and use the API File Library:
1. Navigate to the FastGPT dataset management interface from the main admin dashboard.
2. Select the option to create a new dataset using the API File Library integration.
3. In the provided configuration fields, enter the baseURL of your externally hosted document library API service.
4. Input the valid authentication token required to access your library’s API endpoints.
5. Save the configuration to finalize the connection between FastGPT and your document library.
6. After successful connection, browse the full catalog of available files from your connected library directly within the FastGPT UI, and selectively import individual or groups of files into your FastGPT dataset without creating duplicate stored copies.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/api_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
