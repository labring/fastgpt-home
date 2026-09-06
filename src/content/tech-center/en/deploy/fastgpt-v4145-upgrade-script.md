---
title: Run Official FastGPT v4.14.5 Upgrade Script
slug: /en/deploy/fastgpt-v4145-upgrade-script
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145
source_type: Official documentation
---

# Run Official FastGPT v4.14.5 Upgrade Script

## Upgrade Script Core Functions
The FastGPT v4.14.5 upgrade script automates critical database schema updates for self-hosted FastGPT instances. It completes three targeted migration tasks to align existing data with the v4.14.5 release requirements:
1. Retries all failed S3 storage deletion tasks to clean up orphaned file records that were not properly removed during prior operations
2. Adds the `showFullText` field to all share-type OutLink records, enabling new content visibility controls for shared links
3. Renames legacy configuration fields to updated standard naming conventions:
   - The `showNodeStatus` field is renamed to `showRunningStatus`
   - The `responseDetail` field is renamed to `showCite`
   - The `showRawSource` field is renamed to `canDownloadSource`

## Prerequisite Values
Two dynamic values must be substituted into the upgrade script command before execution:
- `{{rootkey}}`: The admin root key configured in your FastGPT instance's environment variables. This key grants authenticated access to the admin API endpoint.
- `{{host}}`: Your public FastGPT domain name, such as `fastgpt.yourcompany.com`. This value is used to construct the full API endpoint URL for the migration script.

## Step-by-Step Execution
Run the following authenticated POST request command from any terminal with outbound network access to your FastGPT domain:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4145' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
Ensure you replace both placeholder values exactly as defined in your environment. No additional command parameters or flags are required to run the migration script successfully.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4145)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
