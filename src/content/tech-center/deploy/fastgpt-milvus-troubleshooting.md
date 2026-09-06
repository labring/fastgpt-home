---
title: FastGPT Milvus 部署与迁移常见问题排查指南
slug: /zh/deploy/fastgpt-milvus-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/milvus-bm25
source_type: 官方文档
---

# FastGPT Milvus 部署与迁移常见问题排查指南

本文档针对FastGPT集成Milvus的启动与数据迁移场景，提供常见异常的排查与解决指引，覆盖版本兼容、数据迁移、检索异常等核心问题，帮助快速定位并修复异常。

## 启动阶段异常排查
启动时出现`Milvus version ... is not supported`报错，经排查为Milvus版本低于2.5.16，需将Milvus升级至2.5.16及以上版本方可解决该问题。

## 迁移阶段异常排查
- 迁移过程中报旧`modeldata`缺失或为空：需立即停止当前迁移任务，检查Milvus实例连接是否正确、数据卷是否正确挂载，若出现数据丢失情况需从备份恢复。
- 迁移持续失败且`targetCount < processedCount`：需检查Milvus运行状态，确认是否存在OOM或已释放集合的情况，若存在此类问题可使用`resumeMigrationId`参数续跑迁移任务。
- 迁移完成后全文检索为空：需确认迁移任务已执行完毕且状态为`done`；若`modeldata_v2`为空，则全文检索无命中结果，需重新执行或检查迁移流程。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/milvus-bm25)
