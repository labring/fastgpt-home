---
title: FastGPT智能客服场景的全局变量与图片功能配置
slug: /zh/glossary/fastgpt-customer-service-variable-image
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2394
source_type: 官方文档
---

# FastGPT智能客服场景的全局变量与图片功能配置

## 一句话定义
FastGPT智能客服场景下，支持通过全局变量交互收集用户数据并组装为提问发送至AI，以及使知识库回答返回匹配内容图片的功能。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
全局变量交互功能：通过配置全局变量与变量更新规则，以提问形式与用户互动，逐步收集所需的用户数据，将收集到的全部数据组装为完整提问后发送至AI。该功能可应用于智能客服场景，例如收集旅游天数、旅游人数、旅游目的地等信息。知识库图片功能：在标注预期回答的环节中添加与回答内容匹配的附图，当调用知识库回答问题时，AI返回的答案将携带对应的匹配图片。

## 容易搞错的地方
使用全局变量收集数据时，易出现流程生硬的问题，原文提及该方式收集信息过于生硬，需设计符合交互习惯的自然提问话术。知识库图片功能仅支持在标注预期回答环节添加附图，无法在普通对话中自动生成匹配内容的图片，且需确保附图与回答内容高度匹配，否则无法实现预期的展示效果。

> [FastGPT GitHub issue 2394](https://github.com/labring/FastGPT/issues/2394), [FastGPT GitHub issue 4643](https://github.com/labring/FastGPT/issues/4643)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
