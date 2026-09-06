---
title: Migrate and Clean Up Legacy Skill Debug Chat Data
slug: /en/deploy/fastgpt-upgrade-legacy-skill-debug-cleanup
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: Official documentation
---

# Migrate and Clean Up Legacy Skill Debug Chat Data

## Overview
This document covers the required migration and cleanup steps for FastGPT 4.15.06 self-hosted deployments. This release updates Skill Edit chat storage to the standard Chat model, and requires resolving legacy Skill Debug chat data and backfilling missing ownership fields for sandbox instances. Post-upgrade, new Skill Edit chats will not access legacy records, but running the dedicated migration API standardizes sandbox instance metadata and removes outdated debug chat data. Before executing the migration, confirm new Chat source indexes have been created for your deployment.

## Migration API Reference
This exclusive upgrade endpoint is not exposed as a public OpenAPI endpoint. Replace `your-domain` and `YOUR_ROOT_KEY` with your deployment’s domain and root key when running commands.

The API accepts one parameter, detailed below:
| Parameter | Type    | Default | Description                                                    |
| --------- | ------- | ------- | -------------------------------------------------------------- |
| `dryRun`  | boolean | `true`  | Whether to only report matched data without executing changes. |

First, run a dry-run to preview matched records:
```bash
curl -X POST 'https://your-domain/api/admin/4150/init4150-beta6' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":true}'
```

After verifying the dry-run results, run the full migration and cleanup by setting `dryRun` to `false`:
```bash
curl -X POST 'https://your-domain/api/admin/4150/init4150-beta6' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":false}'
```

## Migration Logic Details
The migration follows a fixed set of rules to ensure data integrity:
1.  Scan all `_id` values from the `skills` MongoDB collection.
2.  For `agent_sandbox_instances` missing `sourceType` or `sourceId`, update records matching `appId=skillId` or `metadata.skillId=skillId` with `sourceType=skillEdit` and `sourceId=skillId`, then remove the legacy `appId` and `metadata.skillId` fields.
3.  For remaining sandbox instances still missing valid `sourceType`/`sourceId`, with a non-empty `appId` not linked to any Skill, update to `sourceType=app` and `sourceId=appId`, then remove legacy fields.
4.  Sandbox instances with existing valid `sourceType`/`sourceId` will only have their legacy `appId`/`metadata.skillId` fields removed; existing standard ownership fields are not overwritten.
5.  In non-dry-run mode, delete orphaned sandbox instances with no `appId`, null `appId`, empty `appId`, or no linked Skill via `metadata.skillId`. This removal includes remote sandboxes, OpenSandbox volumes, S3 archives, and MongoDB records. Dry-run mode only reports these via `orphanMatchedCount`.
6.  Clean up legacy Skill Debug chats: first remove Skill IDs present in the `apps` collection, then delete legacy entries from the `chats`, `chatitems`, and `chat_item_responses` collections, plus legacy-format Chat S3 prefixes for remaining Skill IDs.

Important notes: This endpoint does not backfill `sourceType` for existing App Chat records, and scans the full `skills` collection. Partial Skill list scans are not supported, as this could incorrectly mark unscanned Skill sandboxes as App sandboxes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
