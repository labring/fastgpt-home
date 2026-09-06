---
title: Migrate FastGPT Workflow V1 to V2 Data During Upgrade
slug: /en/deploy/fastgpt-workflow-v1-v2-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507
source_type: Official documentation
---

# Migrate FastGPT Workflow V1 to V2 Data During Upgrade

## Eligibility for Migration
Only users who deployed FastGPT versions earlier than 4.8 must complete this workflow migration. Starting with FastGPT 4.15.0-beta7, workflow save payloads consistently use the V2 structure. Historical records stored in `apps.modules` and `app_versions.nodes` may remain in the V1 format. Complete this migration before running the subsequent V2 dirty-data cleanup step after upgrading your FastGPT instance.

## Migration Endpoint and Command Parameters
The migration script is located at `projects/app/src/pages/api/admin/dataClean/v1WorkflowToV2.ts`. This endpoint is intended exclusively for this upgrade migration and is not a public OpenAPI endpoint.

By default, the endpoint runs in dry-run mode, which scans, converts data in memory, validates against `PublishAppBodySchema`, and does not write changes to MongoDB. Use the following curl command to execute a dry-run scan:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":true}'
```
After reviewing the statistics returned in the command response, run the following command with `dryRun` set to `false` to write converted data to your MongoDB database:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/v1WorkflowToV2' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":false}'
```
The following table lists available request parameters:
| Parameter | Type    | Default | Description                                                |
| --------- | ------- | ------- | ---------------------------------------------------------- |
| `dryRun`  | boolean | `true`  | Whether to scan and validate only without writing changes. |

## Migration Behavior Rules
The migration script follows these defined operational rules:
1. Scans apps where `apps.version != 'v2'` and `type` is not `folder`, `httpPlugin`, or `toolFolder`.
2. Processes apps in batches, converting and writing related `app_versions` records first, then converting and writing `apps` records. This ensures no historical versions are missed if the migration is interrupted partway through.
3. Converts V1 node fields to V2 format, including renaming `moduleId` to `nodeId` and `flowType` to `flowNodeType`.
4. Falls back unknown node types to `emptyNode`, and converts invalid `valueType` values to `any`.
5. Uses `flowType` as a fallback for missing `node.name` values, and uses `input.key` as a fallback for missing `input.label` values.
6. Validates `nodes`, `edges`, and `chatConfig` against `PublishAppBodySchema` before writing any changes. Records that fail validation are not written to the database and are included in the endpoint's response.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
