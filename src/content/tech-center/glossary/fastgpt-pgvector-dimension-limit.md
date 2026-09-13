---
title: 解决FastGPT中PG Vector向量维度超限的报错问题
slug: /zh/glossary/fastgpt-pgvector-dimension-limit
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1169
source_type: 官方文档
---

# 解决FastGPT中PG Vector向量维度超限的报错问题

## 一句话定义
PG Vector是FastGPT中用于存储嵌入向量并支持向量相似度检索的内置组件。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该组件的默认向量维度为1536，相关配置代码位于两个指定文件中：packages/service/common/vectorStore/pg/controller.ts的第17行、第26行，以及packages/service/core/ai/embedding/index.ts的第58行。当使用text-embedding-3-large嵌入模型时，其生成的向量维度为3072，超出pg vector的HNSW索引支持的最大2000维度限制，会触发向量索引创建失败的报错。如需使用该嵌入模型，需先修改pg vector的默认向量维度配置，使其匹配模型生成的向量维度后再创建索引。

## 容易搞错的地方
容易混淆FastGPT内置的默认向量维度与第三方嵌入模型生成的向量维度，未根据实际使用的嵌入模型调整pg vector的配置参数，导致向量存储或索引创建失败。此外，部分用户可能未注意到HNSW索引对向量维度的上限限制，直接使用高维度嵌入模型而未做适配，进而引发运行报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1169)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
