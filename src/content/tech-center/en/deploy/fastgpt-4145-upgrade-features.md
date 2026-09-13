---
title: FastGPT v4.14.5 Upgrade New Feature Details
slug: /en/deploy/fastgpt-4145-upgrade-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145
source_type: Official documentation
---

# FastGPT v4.14.5 Upgrade New Feature Details

## Workflow and UI Improvements
This release includes targeted upgrades to the FastGPT workflow canvas and administrative user interface. A new demo mode is now available for the workflow canvas, with refined styling for collapsed workflow nodes and reduced edge overlap between connected elements. Users can now access a dedicated quick-jump button to navigate directly to nested applications within the workflow editor. When exporting workflow configurations, users may toggle a filter to exclude sensitive information from the exported file. Additionally, the portal page now supports configuring visibility settings for individual application executions, allowing granular control over public access to specific application runs.

## Core Feature and API Additions
Several backend and user-facing feature updates are included in this release. Chat records now use soft deletion rather than permanent immediate removal, and administrators can delete full chat records directly from the log management page. Updating an Agent or tool will now propagate the new update timestamp to all parent directories, moving updated items to the top of their respective list views for faster discovery. A new API endpoint is available to export text chunks from a single Dataset collection, enabling automated data extraction workflows for dataset administrators.

## Email Configuration Parameters
Previously limited SMTP email configuration options have been expanded to support secure transmission setup. The following new parameters are now supported for email server configuration:
| Configuration Field | Required | Description |
|----------------------|----------|-------------|
| SMTP Security Mode | Yes | Newly supported security settings for email transmission |
| SMTP Port Number | Yes | Newly supported port configuration for SMTP connections |
All existing email configuration fields remain fully compatible with this update.

## Security Dependency Upgrade
To address a critical security vulnerability, MongoDB has been upgraded from version 5.x to 5.0.32, resolving CVE-2025-14847. This upgrade requires no additional user configuration beyond standard deployment procedures for self-hosted FastGPT instances.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
