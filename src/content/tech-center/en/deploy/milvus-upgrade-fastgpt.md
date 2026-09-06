---
title: Upgrade Milvus to 2.5.16+ for FastGPT
slug: /en/deploy/milvus-upgrade-fastgpt
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/milvus-bm25
source_type: 官方文档
---

# Upgrade Milvus to 2.5.16+ for FastGPT

## Upgrade Milvus to 2.5.16+ Overview
This documented upgrade procedure preserves all existing Milvus data volumes and the legacy `modeldata` collection, which acts as the primary vector source for any subsequent migration workflows tied to FastGPT. No pre-existing dataset stored in Milvus will be modified during the initial upgrade steps, ensuring continuity of existing vector search functionality prior to validation.

## Step-by-Step Upgrade Steps
This section outlines the minimal required changes to upgrade your Milvus deployment for compatibility with FastGPT:
1. Access your existing docker-compose configuration file that defines the Milvus service.
2. Update the Milvus container image tag to the mandatory version:
```yaml
# Milvus service in docker-compose
image: milvusdb/milvus:v2.5.16
```
3. Restart the Milvus service to pull the new image and apply the configuration changes.

## Post-Upgrade Validation
Following the service restart, it is critical to validate the integrity of the `modeldata` collection, as this dataset is required for ongoing migration operations:
1. Confirm that the `modeldata` collection is present in your Milvus instance.
2. Verify that the collection contains non-empty vector data, as an empty or missing collection will break subsequent migration workflows.
If the `modeldata` collection is either missing or entirely empty, stop all migration operations immediately and restore your Milvus data from a pre-upgrade backup to recover the required vector source data.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/milvus-bm25)
