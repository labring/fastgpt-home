---
title: Execute FastGPT 4.15 Upgrade Migration Scripts
slug: /en/deploy/fastgpt-415-migration-scripts
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: Official documentation
---

# Execute FastGPT 4.15 Upgrade Migration Scripts

## Pre-Migration Prerequisites
Before running any migration scripts, complete these mandatory steps:
1. Back up MongoDB, object storage, and your current FastGPT deployment configuration.
2. Upgrade `fastgpt-app` or `fastgpt-pro` to an image version that includes root-admin APIs.
3. Obtain a reachable FastGPT instance URL (`{{host}}`) and your `rootkey`; all admin migration APIs require the `rootkey` HTTP header.

## Clean Duplicate appId-chatId Records (Optional, Recommended)
This step resolves duplicate `appId + chatId` records in the `chats` collection, which can cause `E11000 duplicate key error` during index sync with `SYNC_INDEX=true`. Run the dry-run command first (no data deleted, recommended for all deployments):
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/cleanupDuplicateChats' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":true,"sampleLimit":20}'
```
Review these response fields:
- `duplicateDocumentCount`: Number of duplicate `chats` records eligible for deletion
- `samples`: Sample duplicate records, including the retained `keepId` and candidate `deleteIds`
- `deletedDocumentCount`: Always 0 in dry-run mode
If `duplicateDocumentCount` is greater than 0, run the apply command to delete duplicates:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/cleanupDuplicateChats' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":false,"sampleLimit":20}'
```
The cleanup policy retains the record with the latest `updateTime` for each duplicate group; tied timestamps use descending `_id` as a tiebreaker. Only duplicate `chats` headers are deleted, not message content in `chatitems` or `chat_item_responses`. After cleanup, set `SYNC_INDEX=true` and restart the service to re-sync unique indexes. Verify the indexes using this MongoDB command:
```js
db.chats
  .getIndexes()
  .filter((idx) => ['appId_1_chatId_1', 'sourceType_1_appId_1_chatId_1'].includes(idx.name));
```

## Workflow Migration and Cleanup
### V1 → V2 Workflow Migration (Optional)
Run this migration only if upgrading directly from a version earlier than 4.8, or if your deployment contains historical V1 Workflow data. The API defaults to dry-run mode, which scans and validates workflow structures without writing to the database:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":true}'
```
After confirming the migration statistics, run the apply command to convert V1 workflows to V2:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":false}'
```
Skip this step if you already completed the V1→V2 migration in an earlier version, or are upgrading from v4.8 or later.

### Dirty Data Workflow Cleanup (Required)
This mandatory script scans and fixes historical enum-expression strings, nullish values, and legacy-structure compatibility issues in `apps.modules` and `app_versions.nodes`. Run the dry-run first to identify fixable data:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":true,"batchSize":1000,"writeBatchSize":10}'
```
If the dry-run returns fixable data, run the apply command. Reduce `writeBatchSize` if production write pressure is high. Documents failing Zod validation are reported in the response and not written to the database:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {{rootkey}}' \
  -d '{"dryRun":false,"batchSize":1000,"writeBatchSize":10}'
```
Run this script after V1→V2 migration if applicable.

## Legacy Sandbox Archiving (Optional)
This optional step fixes historical sandbox status fields and optionally archives inactive legacy sandbox workspaces to S3. It does not affect newly generated sandboxes, and skipping it will not block the v4.15 upgrade. Run this check-only command without triggering archiving:
```bash
curl -X POST 'https://{{host}}/api/admin/dataClean/initSandboxArchive'
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
