---
title: FastGPT中question_classify节点与User question empty报错处理
slug: /zh/glossary/fastgpt-question-classify-error
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# FastGPT中question_classify节点与User question empty报错处理

## 一句话定义
question_classify是FastGPT工作流中的问题分类节点，core.chat.error.User question empty是FastGPT对话流程中触发的用户输入问题为空的报错，常见于知识库与对话引导结合的应用场景。

## 在FastGPT里怎么用
question_classify节点的配置路径为/guide/build/workflow/nodes/question_classify，属于FastGPT工作流节点列表中的一员，可用于对话流程中的问题分类处理。core.chat.error.User question empty报错的触发场景为，在使用ghcr.io/labring/fastgpt:latest镜像部署的应用中，当配置有知识库与对话引导的应用内，用户输入第二个问题后，系统自动提示“问题补全”后触发该报错。

## 容易搞错的地方
该报错容易在知识库与对话引导结合的应用中出现，常见于用户输入第二个问题时触发。部分用户在配置此类应用时，未正确设置对话流程中的问题处理环节，导致用户输入的第二个问题被误判为空，从而触发该报错。需检查应用内的对话流程配置，确保用户输入的问题能够被正常识别，不会被误判为空。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/toc)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
