---
title: Critical Impacts of FastGPT 4.15.00 Upgrade
slug: /en/deploy/fastgpt-4-15-00-upgrade-impacts
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500
source_type: 官方文档
---

# Critical Impacts of FastGPT 4.15.00 Upgrade

## API Key Behavior Updates
FastGPT 4.15.00 modifies API key handling by eliminating separate app key authentication, retaining only system keys for all access. To maintain compatibility with OpenAI SDKs, authenticate requests using a token formatted as `apikey-appId` instead of the standalone API key used previously. All existing API keys will remain fully compatible and continue to operate without immediate modification. For complete implementation guidelines, refer to the official FastGPT API documentation.

## Stricter API Data Validation
Multiple core FastGPT APIs now enforce more rigorous data format validation against their declared schemas. If you encounter a `zod parse error` during API interactions, submit a detailed issue report. This error typically arises from legacy stored data or custom data structures that no longer align with the updated schema requirements.

## LLM Request Trace Changes & Required Index Sync
This update introduces team isolation for all LLM request trace data, with three key structural modifications:
- The `llm_request_records` database table now includes a `teamId` field for every trace entry
- The `GET /api/core/ai/record/getRecord` endpoint now requires both `requestId` and `teamId` query parameters to retrieve trace data
- The table's unique index is updated from a single `requestId` field to the composite `{ teamId, requestId }` index

Pre-upgrade trace records do not contain a `teamId` value, so they cannot be queried via the updated endpoint and will be marked as expired in the FastGPT UI. If you need to investigate historical LLM calls, export relevant logs or preserve original request details prior to completing the upgrade.

For self-hosted deployments where `SYNC_INDEX` is disabled, complete this mandatory step after upgrading:
1.  Connect to your FastGPT database instance
2.  Run the database index synchronization process to remove the legacy `requestId_1` unique index
3.  Confirm the new composite `{ teamId, requestId }` index is active in the database

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41500)
