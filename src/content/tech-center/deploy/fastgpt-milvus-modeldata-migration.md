---
title: FastGPT Milvus modeldata向量数据迁移至modeldata_v2操作指南
slug: /zh/deploy/fastgpt-milvus-modeldata-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/milvus-bm25
source_type: 官方文档
---

# FastGPT Milvus modeldata向量数据迁移至modeldata_v2操作指南

迁移前置需确认旧 Milvus `modeldata` 集合存在且包含向量数据。本次迁移为纯拷贝操作，不执行重嵌入流程。迁移会遍历 Milvus `modeldata` 向量行，反查 MongoDB `dataset_datas.indexes` 中的原文，将数据写入 `modeldata_v2`。其中 `imageEmbedding` 索引仅拷贝向量内容，BM25 文本字段置空。

## 迁移操作命令
### 预统计迁移数据
执行dry-run模式可提前查看迁移统计，无需实际执行迁移：
```bash
curl 'http://host/api/admin/4162/milvus?dryRun=1' \
  -H 'rootkey: 你的ROOT_KEY'
```
### 正式执行迁移
指定批次大小为500，调整批量处理的数量：
```bash
curl 'http://host/api/admin/4162/milvus?batchSize=500' \
  -H 'rootkey: 你的ROOT_KEY'
```
### 断点续跑迁移
若请求被网关超时中断，使用返回的`migrationId`恢复任务：
```bash
curl 'http://host/api/admin/4162/milvus?resumeMigrationId=<uuid>' \
  -H 'rootkey: 你的ROOT_KEY'
```

迁移支持断点续跑、失败行落库并自愈重试，完成时会实际校验 `modeldata_v2` 的目标行数，且使用幂等 `upsert` 逻辑，可安全重复执行。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/milvus-bm25)
