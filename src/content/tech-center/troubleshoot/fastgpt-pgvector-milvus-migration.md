---
title: FastGPT从pgvector迁移到Milvus的操作指引
slug: /zh/troubleshoot/fastgpt-pgvector-milvus-migration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1660
source_type: GitHub issue
---

# FastGPT从pgvector迁移到Milvus的操作指引

## 现象
用户尝试将FastGPT的向量数据库从pgvector迁移至Milvus，未找到官方操作文档，不清楚具体操作步骤，且希望实现自动迁移但未找到相关功能。

## 可能原因
官方未提供向量数据库在线迁移接口，且未编写对应的迁移操作文档；Milvus部署存在较多依赖项，无法通过自动工具完成迁移，需手动执行相关流程。

## 排查步骤
1. 部署并启动Milvus服务，等待其自动完成初始化流程。
2. 读取pgvector数据库中的向量数据。
3. 将读取到的向量数据逐一导入Milvus。
4. 确认FastGPT向量数据库的配置切换操作，需按实际环境确认参数。

## 解决与验证
按照上述步骤完成向量数据迁移后，需按照FastGPT的配置要求切换向量数据库类型为Milvus。迁移完成后，可测试向量检索功能验证数据是否正常导入，需按实际环境确认迁移效果。

> 来源: [FastGPT GitHub issue #1660](https://github.com/labring/FastGPT/issues/1660)
