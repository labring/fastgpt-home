---
title: Understand FastGPT Official API Documentation Basics
slug: /en/api/fastgpt-api-docs-overview
page_type: API
source: https://doc.fastgpt.cn/en/openapi/intro
source_type: Official documentation
---

# Understand FastGPT Official API Documentation Basics

## Auto-Generated FastGPT API Documentation Basics
Starting with FastGPT version 4.15.0, official API documentation is automatically generated using zod-openapi. A small number of legacy API endpoints have not been migrated to this auto-generated system, so these endpoints are not visible in the current published documentation. Manually edited endpoint descriptions located in the left sidebar of this documentation are no longer updated to reflect current platform changes.

## Two Distinct API Documentation Sets
FastGPT’s API documentation is split into two dedicated sets, each tailored to specific use cases:
- **Dev API**: This set includes all development-focused API endpoints. Not every endpoint within this set can be called using a standard API Key.
- **System OpenAPI**: This set includes all public system API endpoints. All endpoints in this set can only be called using a valid system API Key.

## Verify Current Endpoint Status
To confirm the latest availability and status of FastGPT API endpoints, follow these steps:
1. Open the official FastGPT API documentation URL.
2. Review the endpoint list to identify which endpoints are included in the auto-generated documentation.
3. Note any unlisted endpoints, as these represent legacy endpoints that have not been migrated to the auto-generated system.
4. Prioritize the auto-generated documentation over the left sidebar’s manually edited descriptions, as these are no longer updated.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/openapi/intro)

## Applicability and version scope

Use this page for the documented API scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
