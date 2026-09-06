---
title: Delete Legacy Milvus modeldata Tables Post Migration
slug: /en/deploy/delete-legacy-milvus-modeldata
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/milvus-bm25
source_type: 官方文档
---

# Delete Legacy Milvus modeldata Tables Post Migration

## Post-Migration Legacy Table Retention
After completing a successful Milvus BM25 dataset migration for FastGPT, the legacy `modeldata` database table is never automatically deleted by the system. FastGPT’s standard initialization process only creates and loads the `modeldata_v2` table; the original `modeldata` table is only detected and loaded during the execution of migration scripts. Administrators must confirm the migration completed correctly before removing the legacy table to prevent unintended data conflicts or resource waste.

## Explicit Legacy Table Deletion Workflows
Two approved methods are available to remove the legacy `modeldata` table, tailored to different operational access levels:

### Admin API Automated Cleanup
The official FastGPT admin migration API can validate migration success, drop the `modeldata` Milvus table, and clear the associated MongoDB legacy full-text table in a single authenticated request. Use the following curl command, replacing `host` with your FastGPT instance’s hostname or IP address, and `YOUR_ROOT_KEY` with your instance’s root API key:
```bash
curl 'http://host/api/admin/4162/milvus?removeOld=1' \
  -H 'rootkey: YOUR_ROOT_KEY'
```
The `removeOld=1` query parameter triggers the cleanup workflow, and the `rootkey` header authenticates the admin-level request.

### Manual Milvus Table Deletion
If direct API access is restricted, the legacy `modeldata` table can be dropped directly via the Milvus CLI or Milvus SDK. Note that this method only removes the Milvus table; administrators must manually clear any associated MongoDB legacy full-text tables separately, as this workflow does not handle additional cross-database cleanup.

## Post-Deletion System Behavior
Once the legacy `modeldata` table has been removed, restarting FastGPT will not attempt to recreate or access the old table. The platform’s standard initialization routine will only create and load the `modeldata_v2` table, and will not reference the original `modeldata` table unless the migration script is re-executed. This ensures no unintended resource consumption or data conflicts after the cleanup process is complete.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/milvus-bm25)
