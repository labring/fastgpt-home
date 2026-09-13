---
title: Prevent Unauthorized LLM Request Trace Access
slug: /en/deploy/fastgpt-llm-trace-team-isolation
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: 官方文档
---

# Prevent Unauthorized LLM Request Trace Access

## Core Access Control Update
The `llm_request_records` database table now includes a required `teamId` field to enforce team isolation for LLM request traces. The `GET /api/core/ai/record/getRecord` endpoint has been updated to require both `requestId` and `teamId` parameters when fetching records for the current authenticated team. This change blocks unauthorized access to sensitive data associated with LLM requests, including request bodies, retrieved dataset chunks, and raw model responses, by preventing a malicious or unintended requestId from being used to access records belonging to another team. The unique database index for the `llm_request_records` table has also been modified: it previously used a single-column index on `requestId`, and now uses a compound unique index on `{ teamId: 1, requestId: 1 }` to align with the new access control rules.

## Manual Index Sync for Disabled Automatic Indexing
FastGPT uses the `SYNC_INDEX` environment variable to control automatic database index synchronization. For self-hosted deployments where `SYNC_INDEX` is set to `false`, you must perform a manual index synchronization immediately after completing the upgrade. This step is critical to remove the legacy `requestId_1` unique index from the `llm_request_records` table, which would otherwise cause conflicts with the new compound unique index. Deployments with `SYNC_INDEX` enabled do not require manual intervention, as the automatic sync process will handle the index update.

## Legacy Trace Record Risk Mitigation
Any trace records written to `llm_request_records` before this upgrade do not contain a `teamId` field. Following the upgrade, these legacy records can no longer be queried using only the `requestId` parameter, and the FastGPT user interface will mark them as expired. These legacy records include a built-in time-to-live (TTL) and are intended solely for temporary debugging purposes. If you need to investigate historical LLM API calls prior to the upgrade, export relevant logs or retain original request details before completing the deployment upgrade.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)
