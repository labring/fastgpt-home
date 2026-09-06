---
title: Adjust Share Link Chat Reporting Endpoint for Billing Changes
slug: /en/deploy/share-link-chat-reporting-endpoint-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469
source_type: 官方文档
---

# Adjust Share Link Chat Reporting Endpoint for Billing Changes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This document outlines mandatory adjustments for the FastGPT share link chat result reporting endpoint, required following updates to the platform’s billing system. The base implementation guide for this endpoint is available at ../../../guide/build/publish/link.en.mdx#5-implement-the-chat-result-reporting-endpoint-optional; this page focuses exclusively on the critical field changes for existing self-hosted deployments.

## Modified Field Specifications
The following table details all changes to fields used by the reporting endpoint:
| Field Name | Status | Notes |
|------------|--------|-------|
| `price` | Removed | Replaced by the `totalPoints` field to align with updated billing calculations |
| `inputToken` | Removed | No longer included in endpoint response payloads |
| `outputToken` | Removed | No longer included in endpoint response payloads |
| `token` | Retained | Returns the total combined token count for the completed chat session |
| `totalPoints` | New Required | Replaces the deprecated `price` field for billing reporting workflows |

## Migration Steps for Self-Hosted Deployments
Follow these sequential steps to update your existing share link chat reporting implementation:
1.  Identify all code components that handle the share link chat reporting endpoint, including request validation, payload parsing, and response processing.
2.  Update all references to the `price` field in both request handling and internal billing logic to use the `totalPoints` field instead.
3.  Delete all code segments that reference, parse, or transmit the `inputToken` and `outputToken` fields, as these fields are no longer generated or returned by the endpoint.
4.  Adjust any internal analytics or tracking logic that previously used split input and output token metrics to use the combined `token` field, if your deployment requires aggregated token count data.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/469)
