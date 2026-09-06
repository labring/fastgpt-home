---
title: Run the FastGPT 4.14.4 Upgrade Script
slug: /en/deploy/fastgpt-4144-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144
source_type: Official documentation
---

# Run the FastGPT 4.14.4 Upgrade Script

## Upgrade Script Overview
This documentation covers the administrative initialization script for FastGPT 4.14.4 self-hosted upgrades. The script executes two mandatory post-deployment data migration tasks to align existing instance data with the 4.14.4 release specifications. All migration workflows are triggered via a single authenticated HTTP request.

## Execute the Upgrade Script
Run the provided curl command from any terminal with outbound network access to your FastGPT domain. Replace the placeholder values as specified for your deployment:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4144' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
The command sends a POST request to the `/api/admin/initv4144` administrative endpoint. Two required HTTP headers are included:
- `rootkey`: Must match the `rootkey` environment variable value configured for your FastGPT instance
- `Content-Type`: Set to `application/json` to comply with the API request format requirements

## Migration Task Breakdown
The script initiates two distinct data migration workflows:
1.  **Dataset/Local API File Migration**: Transfers files uploaded via the FastGPT Dataset feature or local API that were leftover from the 4.14.3 release to your configured S3 storage backend.
2.  **Chat Feedback Recalculation**: Recalculates feedback metrics for all existing chat sessions and adds built-in filtering flags for streamlined chat management. This process runs asynchronously in the background, so the initial API request will not return a completion result immediately.

## Verify Migration Completion
Since the chat feedback recalculation runs asynchronously, you must monitor your FastGPT deployment logs to confirm the task has fully completed. Look for the exact log string: `Migration feedback completed!`. No additional manual steps are required after this message appears in your deployment logs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
