---
title: 说明FastGPT Agent V2中提示词的定义与配置使用方法
slug: /zh/glossary/fastgpt-agentv2-prompt-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/settings
source_type: 官方文档
---

# 说明FastGPT Agent V2中提示词的定义与配置使用方法

## 一句话定义
FastGPT Agent V2中的提示词用于定义Agent的核心人设、工作目标和具体规则，编辑器支持富文本编辑，并支持通过`@`快速唤起并绑定部分工具等上下文能力。

## 在 FastGPT 里怎么用
进入Agent V2的设置页面的Prompt配置模块，使用支持富文本的编辑器输入用于定义Agent核心人设、工作目标和具体规则的内容。可通过`@`快速唤起并绑定部分工具等上下文能力，灵活配置所需的上下文关联。如需配置对话大模型、回复长度、推理内容展示等通用模型参数，需参考AI配置说明文档，该部分配置与提示词设置相互独立。

## 容易搞错的地方
部分用户易混淆提示词配置与通用AI模型配置，提示词仅负责定义Agent的核心人设、工作目标和具体规则，无法直接设置模型相关参数，相关通用参数需通过独立的AI配置模块完成。另外，通过`@`唤起绑定的仅为编辑器支持的部分工具上下文，并非全部可用工具，无法覆盖所有业务所需的工具类型。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/settings)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
