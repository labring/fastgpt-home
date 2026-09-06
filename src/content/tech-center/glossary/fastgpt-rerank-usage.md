---
title: 介绍FastGPT知识库检索流程中的Rerank重排功能与用法
slug: /zh/glossary/fastgpt-rerank-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# 介绍FastGPT知识库检索流程中的Rerank重排功能与用法

## 一句话定义
Rerank是FastGPT知识库检索流程中的二次排序环节，用于提升候选文本结果的相关性，适配文本问题明确、候选结果较多的场景。

## 在 FastGPT 里怎么用
在FastGPT的知识库检索流程中，Rerank功能是既定环节之一，执行于问题优化、多路候选文本召回、RRF合并结果之后。该功能对候选文本进行二次排序，可提升返回文本的相关性，适用于文本问题明确、候选结果较多的场景。

## 容易搞错的地方
容易将Rerank视为检索结果的唯一排序依据。FastGPT的检索结果由多路召回、RRF合并与Rerank二次排序共同决定，仅依赖Rerank排序结果的认知存在偏差。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
