---
title: 解决FastGPT 4.7版本使用text-embedding-3-large的pg vector索引报错问题
slug: /zh/troubleshoot/fastgpt-pgvector-embedding-dimension-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1169
source_type: GitHub issue
---

# 解决FastGPT 4.7版本使用text-embedding-3-large的pg vector索引报错问题

## 现象
使用 OpenAI text-embedding-3-large 模型生成向量时，FastGPT 私有部署4.7版本出现报错。该模型生成的向量维度为3072，而pg vector的hnsw索引不支持大于2000维度的向量，导致索引创建或使用失败。

## 可能原因
FastGPT 4.7版本的源代码中，pg向量存储的默认向量维度配置为1536，对应文件路径为packages/service/common/vectorStore/pg/controller.ts（第17行、第26行）与packages/service/core/ai/embedding/index.ts（第58行）。当调用text-embedding-3-large生成3072维度的向量时，现有配置无法匹配向量维度，进而引发报错。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.7私有部署版本。
2. 确认调用的模型为text-embedding-3-large，且生成的向量维度为3072。
3. 检查系统报错信息，确认是否存在与pg vector维度、hnsw索引相关的报错内容。
4. 核对FastGPT源代码中pg向量维度配置的指定文件与行号，确认现有配置的默认维度。

## 解决与验证
1. 修改FastGPT源代码中指定的pg向量维度配置文件：将packages/service/common/vectorStore/pg/controller.ts第17行、第26行，以及packages/service/core/ai/embedding/index.ts第58行的默认向量维度调整为3072。
2. 重新构建并部署修改后的FastGPT服务。
3. 调用text-embedding-3-large模型生成向量，确认pg vector的hnsw索引可正常创建与使用，无维度相关报错。
4. 需按实际环境确认pg vector的hnsw索引是否支持3072维度的向量配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1169)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
