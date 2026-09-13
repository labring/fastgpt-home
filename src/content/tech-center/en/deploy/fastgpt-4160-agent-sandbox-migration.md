---
title: Migrate FastGPT Agent Sandbox Data for 4.16.0
slug: /en/deploy/fastgpt-4160-agent-sandbox-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# Migrate FastGPT Agent Sandbox Data for 4.16.0

## Sandbox Migration Overview
This FastGPT 4.16.0 release updates the Agent Sandbox architecture: previously using one instance per chat session, it now uses one shared instance per application and user. Session-specific files remain isolated under the `sessions/<chatId>` directory, while published Skills use the shared `projects` storage directory. This migration step is only required if Agent Sandbox was enabled prior to upgrading; skip this section if Agent Sandbox has never been used.

## Migration Commands
Start with a dry run to preview required normalization and cleanup work without modifying data or accessing object storage:
```bash
curl -X POST 'https://{your-domain}/api/admin/4160/initUserSandbox' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {your-ROOT-KEY}' \
  -d '{"dryRun":true}'
```
After reviewing the dry run results, run the full migration. The migration first completes beta6 normalization before proceeding to workspace archiving only if no pending normalization work remains:
```bash
curl -X POST 'https://{your-domain}/api/admin/4160/initUserSandbox' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {your-ROOT-KEY}' \
  -d '{"dryRun":false}'
```
If migration failures report `Sandbox source is missing or deleted` and you have confirmed the corresponding apps or skills no longer exist, use the skip error flag to skip stale sandboxes:
```bash
curl -X POST 'https://{your-domain}/api/admin/4160/initUserSandbox' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: {your-ROOT-KEY}' \
  -d '{"dryRun":false,"skipError":true}'
```
The `skipError` parameter defaults to `false`, enabling strict migration mode by default. It only skips entire source groups when the source app or skill is missing or soft-deleted, without archiving, deleting, or migrating their sandboxes. Skipped records are tracked via `skippedCount` and `skipped` response fields; other errors such as archive, object storage, or concurrency control issues remain blocking.

## Response Validation & Process Details
The migration workflow first runs V4.15.0-beta6 normalization steps: filling in missing `sourceType/sourceId` fields for legacy sandboxes, removing obsolete fields, deleting unassociated orphaned resources, and cleaning up legacy Skill Debug Chat collections and old private/public bucket prefixes (except skills whose ID matches an app ID). The combined total of pending normalization tasks is reported as `normalization.pendingCount`; workspace archiving will not start until this count equals 0.

Once normalization completes, legacy workspaces are archived, old compute resources are cleaned up, skills are migrated, and records are aggregated into user-level sandboxes grouped by app and user. New sandboxes are suspended after workspace archiving and start normally on first use. The migration script is retry-safe, as completed archive and migration operations are not re-run. Old archives and MongoDB records are retained as backups post-migration.

For dry run responses, focus on `normalization.pendingCount`: this value must be 0 before proceeding to full migration. If the count is greater than 0, use `normalization.sandboxPendingCount`, `normalization.legacyDebugChatCleanup.pendingChatCount`, and `normalization.legacyDebugChatCleanup.list` to locate pending data. A `normalizationBlocked` value of `true` indicates pre-migration cleanup is incomplete, and later migration steps will not start.

For full migration responses, first confirm `normalization.pendingCount` is 0 and `normalizationBlocked` is `false`, then verify `failedCount` is 0. If all three conditions are met, all non-skipped sandboxes have been successfully migrated. A `failedCount` greater than 0 indicates formal migration failures, which can be inspected via the `failures` response field.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
