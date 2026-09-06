---
title: FastGPT Deprecated Features and Compatibility Updates
slug: /en/deploy/fastgpt-deprecation-compatibility-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT Deprecated Features and Compatibility Updates

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This page documents compatibility changes, deprecated features, and upcoming endpoint retirements for FastGPT self-hosted deployments, aligned with the 490 upgrade guide. All updates apply to private and Pro edition deployments where specified.

## Deprecated Features and Endpoints
Three core features and endpoints have been marked for deprecation or end-of-maintenance:
1.  **Custom File Parsing Configuration**: The prior private deployment custom file parsing solution is deprecated. Update your setup to use the official environment variable-based configuration, and reference the Environment Variables documentation for full setup instructions.
2.  **Legacy Local File Upload API**: The legacy Pro-only local file upload endpoint `/api/core/dataset/collection/create/file` is deprecated. It has been fully replaced by `/api/core/dataset/collection/create/localFile`.
3.  **External File Library APIs**: External file library APIs are entering maintenance mode with an upcoming deprecation. All existing calls to these APIs must be replaced with the official API File Library to prevent service interruptions.

## API Training Type Field Updates
Multiple FastGPT API endpoints use a `trainingType` field, including dataset file uploads, link collection creation, API File Library operations, and chunk data pushes. The following changes apply to this field:
Previously, `trainingType` supported three values: `auto`, `chunk`, and `QA`. Moving forward, only `chunk` and `QA` will be valid values for `trainingType`. Enhanced indexing functionality will use a new dedicated field: `autoIndexes`.
Legacy usage of `trainingType=auto` remains temporarily supported, but all implementations should be migrated to the new API format as soon as possible. A full reference of the updated API schema is available in the Dataset OpenAPI Documentation.
The table below summarizes the changes:
| Affected API Endpoints | Legacy Supported Values | Updated Requirements | Migration Note |
|------------------------|-------------------------|----------------------|----------------|
| Dataset file upload, link collection creation, API File Library, chunk data push | `auto`, `chunk`, `QA` | Only `chunk` and `QA` for `trainingType`; use `autoIndexes` for enhanced indexing | Migrate away from `trainingType=auto` to the new API format promptly |

## Required Migration Actions
Documented deprecations and compatibility changes require the following updates:
1.  Pro edition API clients using the legacy local file upload endpoint must call `/api/core/dataset/collection/create/localFile` instead of `/api/core/dataset/collection/create/file`.
2.  Self-hosted deployments must replace custom file parsing solutions with official environment variable configuration, per the Environment Variables documentation.
3.  All external file library API calls must be replaced with the official API File Library prior to deprecation.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490)
