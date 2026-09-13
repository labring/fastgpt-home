---
title: FastGPT知识库介绍字段更新异常问题说明
slug: /zh/glossary/fastgpt-knowledge-base-intro-issue
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# FastGPT知识库介绍字段更新异常问题说明

## 一句话定义
知识库是FastGPT中用于归集业务文档、问答数据，支持配置介绍字段并集成到检索流程的数据集合。

## 在 FastGPT 里怎么用
可通过文档目录的knowledge小节进入相关配置，涵盖数据集标签、检索引擎、问答库、检索模板、第三方API数据集等配置项。在知识库配置页面，可找到intro介绍字段，填写内容后点击保存。在4.6.3版本docker-compose部署的环境中，保存intro字段后提示更新成功，但返回知识库列表页时介绍内容仍显示为空，该问题已被记录。工作流中可使用knowledge_base_search_merge节点，实现知识库检索结果的合并处理。

## 容易搞错的地方
容易混淆知识库配置页的intro介绍字段与其他配置项的保存逻辑，误以为保存后立即在列表页生效。需注意特定部署版本可能存在已知的展示异常问题，需核对部署版本信息。需确认知识库配置的保存操作已正确完成，避免因操作失误导致字段未生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/toc)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
