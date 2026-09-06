---
title: Key FastGPT 4.14.3 Plugin Update Changes
slug: /en/deploy/fastgpt-plugin-update-changes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143
source_type: Official documentation
---

# Key FastGPT 4.14.3 Plugin Update Changes

## Plugin Update Overview
This document details the plugin-specific modifications included in FastGPT 4.14.3, covering new tooling features, updated logic, and resolved bug fixes for self-hosted FastGPT deployments. All changes are isolated to plugin workflows and do not impact core FastGPT application functionality.

## Updated Tool Versioning Logic
Prior to this release, plugin update detection relied on static version strings, which could lead to inconsistent update notifications. This update replaces static version checks with a computed version value for update detection. The computed value dynamically reflects the current state of plugin tooling, improving the accuracy of available update alerts and eliminating false positive notifications. No manual configuration is required; the updated logic activates automatically during plugin initialization.

## WeChat Official Account Toolkit Bulk Upload Workflow
A key new feature expands functionality for the WeChat Official Account toolkit: support for uploading multiple documents to the draft box in a single batch. The revised workflow is as follows:
1. Access the WeChat Official Account plugin dashboard within FastGPT
2. Select two or more target documents from the local file selection menu
3. Select the "Upload to Draft Box" action button
4. Confirm the batch upload to submit all selected documents simultaneously
Prior to this update, only individual document uploads to the draft box were supported.

## Resolved Plugin Issues
Three critical plugin-related bugs are fixed in this release:
1. **Tool Cache Refresh Fix**: Previously, plugin tool cache entries did not refresh correctly after configuration changes, leading to stale tool behavior. This update resolves the cache invalidation logic to ensure fresh tool data is loaded when expected.
2. **Development Mode Static File Fix**: In development environments, refreshing the plugin cache would trigger unnecessary re-uploads of static plugin files, increasing unnecessary bandwidth usage. This fix prevents redundant static file transfers during cache refresh operations.
3. **Image Upload Post-.pkg Fix**: Uploading a .pkg plugin package would break subsequent image uploads via plugin tooling. This issue is fully resolved, allowing normal image upload operations to continue immediately after .pkg file uploads.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
