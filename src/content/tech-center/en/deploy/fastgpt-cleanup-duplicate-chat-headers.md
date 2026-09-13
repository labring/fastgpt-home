---
title: Resolve Duplicate FastGPT Chat Header Records
slug: /en/deploy/fastgpt-cleanup-duplicate-chat-headers
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507
source_type: Official documentation
---

# Resolve Duplicate FastGPT Chat Header Records

## Overview
This cleanup process resolves duplicate `chats` collection records that share identical `appId + chatId` pairs. These duplicates block the creation of new unique database indexes after a FastGPT upgrade. The script retains the record with the most recent `updateTime`; if multiple records have matching timestamps, the entry with the largest `_id` value is kept as a fallback.
The dedicated migration script is located at `projects/app/src/pages/api/admin/dataClean/cleanupDuplicateChats.ts`. This endpoint is exclusive to this upgrade migration and is not a public OpenAPI endpoint.

## Run the Cleanup Script
The endpoint defaults to dry-run mode, which scans for duplicate groups and returns sample data without deleting any records. Use this curl command to run a dry scan:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/cleanupDuplicateChats' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":true,"sampleLimit":20}'
```
After reviewing the returned statistics, set `dryRun` to `false` to perform actual duplicate record deletion:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/cleanupDuplicateChats' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":false,"sampleLimit":20}'
```
### Request Parameters
| Parameter     | Type    | Default | Description                                                  |
| ------------- | ------- | ------- | ------------------------------------------------------------ |
| `dryRun`      | boolean | `true`  | Whether to scan and report statistics without deleting data.  |
| `sampleLimit` | number  | `20`    | Number of duplicate group samples to return. Range: `0~100`. |

## Cleanup Behavior Rules
The script follows these fixed execution rules:
1. Scans the `chats` collection for duplicate records using the `appId + chatId` composite key.
2. Retains the record with the latest `updateTime`; for tied timestamps, uses descending `_id` order as a stable fallback.
3. In non-dry-run mode, only deletes duplicate `chats` header records. Messages stored in `chatitems` and `chat_item_responses` collections are not modified or deleted.
4. The API response includes duplicate group count, estimated delete count, actual delete count, and sample duplicate group data.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
