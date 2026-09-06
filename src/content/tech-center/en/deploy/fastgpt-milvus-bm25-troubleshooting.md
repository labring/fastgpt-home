---
title: Troubleshoot FastGPT Milvus BM25 Integration Issues
slug: /en/deploy/fastgpt-milvus-bm25-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/milvus-bm25
source_type: 官方文档
---

# Troubleshoot FastGPT Milvus BM25 Integration Issues

This technical document covers troubleshooting for common issues with FastGPT’s Milvus BM25 full-text search integration, including deployment errors, migration failures, and post-migration search gaps. All fixes and error details are sourced directly from official FastGPT self-host documentation.

## Milvus Version Compatibility Failure
The most prevalent deployment error is a startup failure with the error string `Milvus version ... is not supported`. This error triggers when the connected Milvus instance runs a version older than 2.5.16. The sole required remediation is to upgrade the Milvus deployment to version 2.5.16 or a newer supported release. No additional configuration adjustments are needed after completing the upgrade.

## Migration-Related Troubleshooting
Two distinct errors can disrupt the FastGPT to Milvus BM25 data migration workflow:
### Missing or Empty `modeldata` Collection
If the migration process reports that the legacy `modeldata` collection is missing or empty, first halt the ongoing migration. Next, validate two critical configuration points: confirm FastGPT is connected to the correct Milvus instance, and verify that the Milvus data volume is properly mounted to preserve collection data. If the collection data was accidentally lost, restore the `modeldata` collection from a pre-migration backup.
### Failed Migration with `targetCount < processedCount`
When a migration remains stuck in a failed state with the error `targetCount < processedCount`, the target Milvus table contains fewer actual rows than the number of rows written during the migration process. To resolve this, first inspect the Milvus cluster health for issues such as out-of-memory (OOM) errors or accidentally released collections. Resume the migration using the `resumeMigrationId` parameter to continue the process from the last saved checkpoint.

## Post-Migration Full-Text Search Issues
If full-text search returns no results after completing a migration, first confirm the migration finished successfully by checking for `status: done` in the migration logs or API response. An empty `modeldata_v2` collection indicates no full-text search data was successfully migrated, which will directly result in no search hits. Always validate migration completion status before testing full-text search functionality.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/milvus-bm25)
