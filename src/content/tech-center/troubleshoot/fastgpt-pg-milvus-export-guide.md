---
title: FastGPT知识库从PG迁移至Milvus的导出方案指南
slug: /zh/troubleshoot/fastgpt-pg-milvus-export-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1864
source_type: GitHub issue
---

# FastGPT知识库从PG迁移至Milvus的导出方案指南

## 现象
PG数据库检索耗时10至20秒，随着知识库索引增多，计划将知识库迁移至Milvus向量数据库，需保留文件层次结构与元数据的安全可靠导出方案。

## 可能原因
随着知识库索引规模扩大，PG数据库的检索性能下降，无法满足业务需求，因此需要更换向量数据库并导出现有知识库的完整数据。

## 排查步骤
1. 确认现有FastGPT部署的数据库类型与知识库存储结构。
2. 梳理现有知识库的文件层次结构与元数据字段。
3. 评估目标向量数据库的兼容要求与数据迁移限制。

## 解决与验证
暂无公开的标准导出流程，需结合实际部署环境梳理导出逻辑，确保导出后保留知识库的文件层次结构与元数据信息。

> 来源: [FastGPT GitHub issue #1864](https://github.com/labring/FastGPT/issues/1864)
