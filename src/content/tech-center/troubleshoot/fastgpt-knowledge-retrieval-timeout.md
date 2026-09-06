---
title: FastGPT知识库检索超时问题的排查与优化方案
slug: /zh/troubleshoot/fastgpt-knowledge-retrieval-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/935
source_type: GitHub issue
---

# FastGPT知识库检索超时问题的排查与优化方案

## 现象
知识库检索耗时超过100秒，最高达130多秒，其他模块运行正常。将知识库检索所用模型切换为3.5-16k后，检索时间回归至3秒左右，但仍偶发检索超时问题。

## 可能原因
1. pgvector相关配置参数不合理，尤其是hnsw索引配置或内存交换设置。
2. 知识库检索使用的模型不符合预期配置。

## 排查步骤
1. 核对知识库检索所使用的模型，确认是否为3.5-16k模型。
2. 访问pgvector所在的数据库环境，检查hnsw索引与内存交换相关参数。
3. 复现检索超时场景，记录相关系统日志与运行数据。
4. 对比正常运行模块的配置参数，排查差异项。

## 解决与验证
调整pgvector相关参数，重点优化hnsw索引与内存交换配置。将知识库检索模型切换为3.5-16k模型，验证检索时间是否回归至3秒左右，持续观察是否仍偶发超时问题。

> 来源: [FastGPT GitHub issue #935](https://github.com/labring/FastGPT/issues/935)
