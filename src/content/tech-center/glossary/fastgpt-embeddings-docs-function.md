---
title: FastGPT嵌入接口参数适配与对话传文档功能说明
slug: /zh/glossary/fastgpt-embeddings-docs-function
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/74
source_type: 官方文档
---

# FastGPT嵌入接口参数适配与对话传文档功能说明

## 一句话定义
本页内容围绕FastGPT嵌入接口的参数格式适配问题，以及对话时传入文档功能的相关请求与说明展开，明确相关参数要求与功能状态。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
调用嵌入接口时，input参数默认采用数组格式。对话传文档功能为用户提交的新增功能请求，其应用场景为提问时上传文件，基于上传的文档内容生成回答，相关交互界面包含文件上传入口与提问输入框。当前版本中，嵌入接口的调用参数可在模型配置环节设置，对话传文档功能尚未被纳入现有版本，相关请求已被提交至项目仓库。

## 容易搞错的地方
部分用户可能混淆FastGPT嵌入接口的参数格式与Azure OpenAI嵌入接口的要求，Azure OpenAI嵌入接口仅支持string类型的input数据，而FastGPT默认使用数组格式，可能导致接口调用失败。此外，对话传文档功能尚未被实现，部分用户可能误以为该功能已在当前版本中可用，需注意该功能仍为用户提出的新增请求，需等待后续版本更新支持。

> [FastGPT GitHub issue 74](https://github.com/labring/FastGPT/issues/74), [FastGPT GitHub issue 596](https://github.com/labring/FastGPT/issues/596)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
