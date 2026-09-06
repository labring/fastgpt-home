---
title: FastGPT中milvusStandalone的异常排查与解决方法
slug: /zh/glossary/fastgpt-milvusstandalone-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4374
source_type: 官方文档
---

# FastGPT中milvusStandalone的异常排查与解决方法

## 一句话定义
milvusStandalone是FastGPT集成的向量数据库独立服务，用于存储和处理知识库的向量索引数据，承接知识库的向量索引任务。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT私有部署版本v4.9.1-fix2中，需配置向量数据库服务地址为dns:milvusStandalone:19530。该服务与fastgpt、mongo组件协同工作，当大批量上传文件到知识库时，三个组件均可能出现崩溃，且milvusStandalone崩溃后不会直接影响fastgpt运行，但fastgpt崩溃后会引发后续异常。

## 容易搞错的地方
使用过程中可能出现报错"fastgpt  14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530"，该报错通常由服务崩溃引发。服务重启后，已上传的文件会持续处于索引中状态，无法自动完成索引流程。大批量上传文件会提升该服务的负载，增加异常发生概率，需注意控制上传规模以避免触发此类问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4374)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4455)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
