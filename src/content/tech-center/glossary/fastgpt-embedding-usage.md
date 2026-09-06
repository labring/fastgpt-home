---
title: 介绍FastGPT中embedding的功能与配置方法
slug: /zh/glossary/fastgpt-embedding-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/coreferenceResolution
source_type: 官方文档
---

# 介绍FastGPT中embedding的功能与配置方法

## 一句话定义
Embedding是FastGPT中用于将文本转换为向量，以支持知识库相似内容搜索的技术，同时属于五类可配置的模型预设类型之一。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT中，embedding可用于RAG流程的知识库搜索环节，将输入文本转换为向量以匹配相似知识库内容。配置embedding类型模型时，需以官方模型文档、官方模型列表API或官方价格/模型页为依据，按模型真实能力选择对应类型，补齐该类型schema要求的字段。维护模型预设时，不得仅因存在稳定版名称删除preview、experimental或dated版本，仅在官方明确废弃时移除；不得删除开放目录中的本地占位或用户自定义模型，保持文件原有排序风格，通常将更新或能力更强的模型放在前面。

## 容易搞错的地方
容易搞错的地方包括：仅根据搜索结果、第三方博客或聚合站判断embedding模型是否存在；误将不具备对应能力的模型归类为embedding类型；随意删除开放目录中的本地占位或用户自定义的embedding模型。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/coreferenceResolution)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/model-presets)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
