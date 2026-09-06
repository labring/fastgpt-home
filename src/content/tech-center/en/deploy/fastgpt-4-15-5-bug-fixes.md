---
title: Resolved Bugs in FastGPT 4.15.5 Release
slug: /en/deploy/fastgpt-4-15-5-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155
source_type: 官方文档
---

# Resolved Bugs in FastGPT 4.15.5 Release

## FastGPT 4.15.5 Fix Overview
This document covers the documented bug fixes included in the FastGPT 4.15.5 self-hosted upgrade release. These fixes resolve four distinct functional issues across storage integrations, plugin node configuration, and media URL handling, designed to improve system reliability and user-facing functionality for self-hosted FastGPT deployments.

## Detailed Bug Fix Specifications
Each fix addresses a specific reported issue with targeted code corrections:
1.  **Alibaba Cloud OSS Metadata Retrieval**: The prior codebase incorrectly targeted an incorrect response field when querying ETag values for Alibaba Cloud OSS objects. This error led to missing ETag metadata and failed downstream validation checks for stored files. The fix updates the ETag lookup to use the correct response field, ensuring consistent metadata population.
2.  **S3/MinIO File Missing Error Handling**: Previously, attempts to access non-existent files on S3 or MinIO storage backends returned a generic `Unknown` error string. The updated implementation now returns a standardized `file-not-found` error message paired with an HTTP 404 status code, enabling proper error handling for client applications integrating with FastGPT.
3.  **Legacy Plugin Node Input Field Persistence**: Post-upgrade, older plugin nodes would lose their configured input fields, breaking existing workflow configurations. The fix patches the upgrade migration logic to preserve all input field configurations for legacy plugin nodes, eliminating data loss during version upgrades.
4.  **Avatar URL Double Encoding**: The system previously applied duplicate URL encoding to avatar URLs, resulting in malformed links that failed to render correctly. The fix removes the redundant encoding step, ensuring avatar URLs are properly formatted and accessible.

## Validation Workflow for Deployed Instances
To confirm all fixes are applied correctly in a self-hosted FastGPT 4.15.5 instance, follow these structured steps:
1.  **Alibaba Cloud OSS Validation**:
    - Access the FastGPT admin panel and navigate to the storage integration settings for Alibaba Cloud OSS.
    - Upload a test file and review the stored file metadata to confirm the ETag value is correctly populated.
    - Trigger a metadata validation check for the uploaded file and confirm no validation failures occur.
2.  **S3/MinIO Error Handling Validation**:
    - Attempt to retrieve a file path that does not exist in your S3 or MinIO storage bucket via the FastGPT file browser.
    - Verify the API response returns an HTTP 404 status code and the exact `file-not-found` error string, rather than the prior `Unknown` error.
3.  **Legacy Plugin Node Validation**:
    - Load a plugin node created prior to the 4.15.5 upgrade.
    - Edit the node and confirm all previously configured input fields are visible and retained after saving changes.
4.  **Avatar URL Validation**:
    - Update the avatar URL for a user or assistant account in FastGPT.
    - Inspect the rendered avatar element in the frontend interface to confirm the URL does not contain duplicate encoding segments.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4155)
