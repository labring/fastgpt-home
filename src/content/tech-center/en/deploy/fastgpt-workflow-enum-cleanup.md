---
title: Clean Up Legacy FastGPT Workflow Enum Data
slug: /en/deploy/fastgpt-workflow-enum-cleanup
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507
source_type: Official documentation
---

# Clean Up Legacy FastGPT Workflow Enum Data

## Legacy Workflow Enum Data Issue
Some historical FastGPT workflow nodes store TypeScript enum expression strings directly in MongoDB, rather than the intended raw string values. For example, a corrupted stored entry might look like:
```json
{
  "renderTypeList": ["FlowNodeInputTypeEnum.hidden"],
  "valueType": "WorkflowIOValueTypeEnum.any"
}
```
The correct, validated format uses plain string values:
```json
{
  "renderTypeList": ["hidden"],
  "valueType": "any"
}
```
This corrupted data disrupts workflow node input rendering and IO type validation. This cleanup script resolves these issues after completing the V1→V2 workflow migration, targeting data in the `apps.modules` and `app_versions.nodes` collections.

## Execute the Cleanup Script
The cleanup endpoint operates in dry-run mode by default, which validates data in memory using the `PublishAppBodySchema` without writing changes to MongoDB. Use this first curl command to run a dry scan:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":true,"batchSize":1000,"writeBatchSize":10}'
```
After reviewing the returned statistics, switch to non-dry-run mode to apply fixes:
```bash
curl -X POST 'https://your-domain/api/admin/dataClean/initWorkflowData' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: YOUR_ROOT_KEY' \
  -d '{"dryRun":false,"batchSize":1000,"writeBatchSize":10}'
```
The following request parameters control the cleanup process:
| Parameter        | Type    | Default | Description                                                                     |
| ---------------- | ------- | ------- | ------------------------------------------------------------------------------- |
| `dryRun`         | boolean | `true`  | Whether to scan and validate only without writing changes.                      |
| `batchSize`      | number  | `1000`  | Documents fetched per batch.                                                    |
| `writeBatchSize` | number  | `10`    | Documents written per `bulkWrite`. Lower it when online write pressure is high. |

## Cleanup Operational Rules
The script follows five core operational rules to minimize system impact:
1. Scans workflow data in `apps` and `app_versions` collections in batches to reduce read and write pressure on the database.
2. Formats each workflow document to resolve historical dirty fields, null values, enum expressions, and legacy structure compatibility issues.
3. Validates the formatted save payload fields `nodes`, `edges`, and `chatConfig` against the `PublishAppBodySchema` schema.
4. Documents that fail Zod validation are recorded in the response but not written to MongoDB.
5. In non-dry-run mode, only documents that changed during formatting and passed Zod validation are written to the database; unchanged documents are not overwritten.

## Response Statistics
The API response includes segmented statistics for `apps`, `appVersions`, and a total summary. Metrics include the number of scanned documents, fixable documents, Zod validation error count, successful and failed write counts, enum expression occurrence statistics, change samples, and error samples.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41507)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
