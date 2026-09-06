---
title: Detailed Overview of FastGPT 4.14.3 New Features
slug: /en/deploy/fastgpt-4-14-3-new-features
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143
source_type: Official documentation
---

# Detailed Overview of FastGPT 4.14.3 New Features

## Dataset Storage Migration to S3
All file-related functionality for FastGPT datasets has been fully migrated to S3-compatible storage. This update centralizes dataset file operations, ensuring consistent storage handling across self-hosted instances and aligning with standard cloud storage workflows. No local file system dependencies are required for core dataset file operations following this migration.

## Expanded Input and Variable Features
### Form Input Node Updates
The form input node now supports additional input types, with the full supported list detailed below:
| Input Type               |
|--------------------------|
| Password                 |
| Toggle                   |
| Time Point               |
| Time Range               |
| File Upload              |
| Chat Model Selection     |

### Global Variable and Plugin Input Enhancements
Global variables now support file upload as a valid input type, expanding the range of data that can be passed across workflow steps. For plugin configurations, plugin input fields now support multi-select selections, time point selections, time range selections, and internal variable references, allowing more dynamic and tailored workflow setups.

## Marketplace and Workflow Operational Controls
### Plugin Marketplace Version Management
System plugins listed in the FastGPT Plugin Marketplace now display a visible indicator when a new version is available, alongside a dedicated update button to streamline the plugin update process without manual file transfers.
### Workflow Execution Rate Limiting
A new workflow execution QPM (queries per minute) rate limiting feature has been implemented, which restricts the volume of workflow queries executed per minute to help maintain stable resource usage for self-hosted deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4143)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
