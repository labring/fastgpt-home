---
title: New Features for FastGPT 4.14.11 Self-Hosted Deployments
slug: /en/deploy/fastgpt-41411-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411
source_type: Official documentation
---

# New Features for FastGPT 4.14.11 Self-Hosted Deployments

This page details the new feature additions for FastGPT 4.14.11 self-hosted deployments, focusing on workflow efficiency, storage reliability, and user experience improvements.

## Workflow Automation Enhancements
This section covers two core workflow upgrades:
1.  **Chat Stream Response Resume Support**: This feature allows users to pause and resume interrupted chat sessions without losing conversation context, eliminating the need to restart interactions from scratch.
2.  **Parallel Execution Node**: The new parallel execution node enables simultaneous running of multiple workflow steps, reducing total execution time for complex automation pipelines by leveraging concurrent processing.

## Variable Update Node Usage Guide
The 4.14.11 update includes a completely reworked user interface for the variable update node, with expanded functionality for numeric and array operations. Follow these steps to use the updated features:
1.  Open the FastGPT workflow editor and add or edit a variable update node.
2.  Use the refined configuration interface to select your desired operation type.
3.  For numeric modifications, choose from supported arithmetic operations: addition, subtraction, multiplication, or division.
4.  For array modifications, select from available manipulation functions: append entries, filter datasets, or sort values.
5.  Configure the target variable and associated input parameters, then save the node to apply changes.
This updated workflow reduces setup time for complex variable manipulation tasks.

## S3 & File Handling Improvements
The update standardizes storage and file handling across FastGPT deployments:
- **Unified S3 File Uploads**: The workflow standardizes S3 file uploads, adding support for proxying S3 upload and access traffic through FastGPT. This reduces common pre-signed URL configuration issues by centralizing all S3 interaction logic within the FastGPT instance.
- **File Preview & Download Optimization**: Direct preview is now available for select sandbox file types, and large file download performance has been optimized to minimize latency and timeout errors for end users.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41411)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
