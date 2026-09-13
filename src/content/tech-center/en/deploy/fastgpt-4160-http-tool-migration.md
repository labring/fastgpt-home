---
title: Migrate Manual HTTP Tool Data for FastGPT 4.16.0
slug: /en/deploy/fastgpt-4160-http-tool-migration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# Migrate Manual HTTP Tool Data for FastGPT 4.16.0

## Migration Overview
This FastGPT 4.16.0 update modifies manually configured HTTP tool array parameters to use standard JSON Schema. Only self-hosted environments with manual HTTP tools created prior to the upgrade require this migration. OpenAPI-mode HTTP tools are automatically skipped and do not require any intervention.

The migration script follows specific rules during execution: it first filters applications by HTTP tool type, then migrates historical versions associated with matching `appId` values. Only manual-mode HTTP tools that do not have an `apiSchemaStr` field are processed; all other applications and OpenAPI-mode tools remain unchanged. The migration runs in batches and is safe to retry if interrupted. The API response includes a `total.changedDocumentCount` field that reports the total number of documents requiring migration processing.

## Pre-Migration Dry Run
Before making any changes to your FastGPT instance, run a dry run to inspect pending migration data without modifying any existing records. Use the following curl command, replacing `https://your-domain` with your deployed FastGPT domain and `your-root-key` with your platform root key:
```bash
curl -X POST 'https://your-domain/api/admin/4160/initHttpToolSchema' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: your-root-key' \
  -d '{"dryRun":true}'
```
The dry run will return a breakdown of eligible apps and historical versions without altering your data. Review the `total.changedDocumentCount` field in the response to confirm the number of documents that will be updated during the full migration.

## Complete the Migration
After verifying the dry run results align with your expected changes, run the full migration command using the same curl structure, but set the `dryRun` parameter to `false`:
```bash
curl -X POST 'https://your-domain/api/admin/4160/initHttpToolSchema' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: your-root-key' \
  -d '{"dryRun":false}'
```
Once the migration script finishes executing, run another dry run to confirm that `total.changedDocumentCount` returns `0`. This confirms all eligible manual HTTP tool data has been successfully migrated, and no further action is required for your deployment.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
