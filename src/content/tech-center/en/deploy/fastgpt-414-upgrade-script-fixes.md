---
title: Resolved Issues in FastGPT 4.14 Upgrade Scripts
slug: /en/deploy/fastgpt-414-upgrade-script-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41427
source_type: Official documentation
---

# Resolved Issues in FastGPT 4.14 Upgrade Scripts

**Resolved Issues in FastGPT 4.14 Upgrade Scripts**
This page details critical bug fixes to self-hosted FastGPT 4.14 series upgrade scripts, addressing three distinct reliability issues in storage detection, migration logging, and duplicate migration prevention. All changes are targeted at improving upgrade workflow stability for self-hosted FastGPT deployments.

**Version-Specific Fix Breakdown**
Each fix is tied to a specific upgrade script version:
1.  **V4.13.2 Upgrade Script Fix**: A prior defect caused the script to skip S3 lifecycle cleanup due to false negative MinIO client detection. Previously, the script used `instanceof MinioStorageAdapter` to identify MinIO clients, which failed when workspace packages loaded as separate module instances in Next.js development mode or bundled runtime environments. The updated script removes this dependency, eliminating false negatives and ensuring proper S3 lifecycle cleanup execution.
2.  **V4.14.3 Upgrade Script Fix**: The image migration log resource type was incorrectly labeled `data_image` in upgrade script logs, preventing the system from correctly recognizing completed image migrations. The fix updates the log resource type to `dataset_image`, aligning log entries with the correct dataset image classification.
3.  **V4.14.4 Upgrade Script Fix**: The completed-image migration filter in the V4.14.4 script was updated to use the `dataset_image` resource type. This change prevents already migrated images from being reprocessed during subsequent script runs, eliminating redundant migration tasks and preserving storage resources.

**Validation Checklist for Updated Scripts**
To confirm the fixes are applied correctly, follow these steps:
1.  For deployments using Next.js dev mode or bundled runtimes: After executing the V4.13.2 upgrade script, verify that S3 lifecycle cleanup processes run as expected by checking storage policy execution logs.
2.  For image migration workflows: After running the V4.14.3 upgrade script, review migration log entries to confirm that completed image migrations are tagged with `dataset_image` instead of the prior `data_image` value.
3.  For rerun upgrade scenarios: After deploying the V4.14.4 fix, run the upgrade script a second time and confirm that images already marked with `dataset_image` in logs are not reprocessed during the rerun.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41427)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
