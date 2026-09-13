---
title: 说明FastGPT中think标签内容的渲染与折叠实现方式
slug: /zh/glossary/fastgpt-think-tag-folding
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3676
source_type: 官方文档
---

# 说明FastGPT中think标签内容的渲染与折叠实现方式

## 一句话定义
FastGPT中的think标签功能，用于对深度思考模型输出的<think>代码块进行折叠渲染处理。

## 在 FastGPT 里怎么用
该功能的应用场景为深度思考模型的对话场景。当深度思考模型输出的内容存放在<think>代码块中时，系统将其渲染为折叠组件，替代直接输出纯文本。支持自定义折叠的代码块，相关示例为deepseek-r1模型的输出。在Web对话场景中，该功能针对think标签内容进行组件渲染处理。

## 容易搞错的地方
部分用户会误以为普通代码块会被该功能处理，实际仅<think>代码块的内容会被渲染为折叠组件。部分用户会假设历史消息中会保留折叠后的think内容，但目前无明确的历史消息处理规则，请勿自行推断展示逻辑。部分用户会认为think标签内容会在所有对话消息中展示，但根据相关讨论，该内容一般仅在最后一条消息中输出，不过该规则尚未明确写入实现逻辑。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3676)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3712)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
