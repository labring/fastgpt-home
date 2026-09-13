---
title: 说明FastGPT数据集检索引擎的工作原理与使用方式
slug: /zh/glossary/fastgpt-dataset-retrieval-engine
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# 说明FastGPT数据集检索引擎的工作原理与使用方式

## 一句话定义
FastGPT的数据集检索引擎是组合多类检索与优化能力、融合多路结果的知识库内容检索系统。

## 在 FastGPT 里怎么用
默认使用PostgreSQL的PG Vector插件搭配HNSW索引作为向量检索器，PostgreSQL仅用于向量检索，该引擎可替换为其他数据库，MongoDB用于存储非向量类数据。MongoDB的dataset.datas表存储向量原数据信息，indexes字段为数组，支持一组数据对应多个向量。检索流程分为五步：1. 执行问题优化，实现指代消除和问题扩展；2. 通过语义检索、全文检索或混合检索召回候选内容，若输入包含图片则额外进行图片描述检索或图片向量检索；3. 通过RRF合并方式整合多路检索结果；4. 通过Rerank进行二次排序；5. 经过相似度过滤和引用上限裁剪，得到最终引用内容。

## 容易搞错的地方
1. 误以为PostgreSQL存储知识库原数据，实际MongoDB存储原数据，PostgreSQL仅存储向量数据；2. 误以为一组知识库数据仅能对应一个向量，实际indexes字段为数组，支持一组数据关联多个向量；3. 误以为检索仅为简单向量召回，实际包含多步优化与结果融合流程。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
