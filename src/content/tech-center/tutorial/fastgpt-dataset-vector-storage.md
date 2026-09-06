---
title: FastGPT知识库向量存储结构的实现与配置说明
slug: /zh/tutorial/fastgpt-dataset-vector-storage
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# FastGPT知识库向量存储结构的实现与配置说明

### 向量存储整体架构
FastGPT采用PostgreSQL的PG Vector插件作为向量检索器，索引类型为HNSW。PostgreSQL仅用于向量检索，该引擎可替换为其他数据库，MongoDB用于其他数据的存取。在MongoDB的dataset.datas表中，存储向量原数据的信息，同时包含indexes数组字段，该字段为数组类型，可记录多个对应的向量ID，因此一组数据可对应多个向量。除默认文本索引外，若模型能力支持，可生成图片描述索引或图片向量索引。

### 向量存储配置要点
1.  向量检索模块使用PostgreSQL的PG Vector插件，需配置索引类型为HNSW，表中设置vector字段存储向量数据。
2.  非向量数据存储使用MongoDB，其中dataset.datas表需包含indexes数组字段，用于记录关联的向量ID。
3.  向量检索引擎可替换为其他数据库，若模型能力支持，可生成图片描述索引或图片向量索引。

### 向量检索执行流程
在向量检索过程中，先通过PostgreSQL召回匹配的向量，再根据向量的ID前往MongoDB中查找对应的原数据内容。若多个向量对应同一组原数据，则将结果合并，最终取最高的向量得分作为该组数据的检索得分。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
