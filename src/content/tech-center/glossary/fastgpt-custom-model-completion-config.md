---
title: 配置FastGPT自定义模型的completion请求参数与路径
slug: /zh/glossary/fastgpt-custom-model-completion-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# 配置FastGPT自定义模型的completion请求参数与路径

## 一句话定义
completion是FastGPT中用于配置大语言模型对话请求参数与路径的核心配置项。

## 在 FastGPT 里怎么用
该配置项存在于自定义模型的配置参数中，可通过fieldMap字段完成请求参数的名称映射。例如o1系列模型需将max_tokens参数映射为max_completion_tokens，对应配置为{"fieldMap": {"max_tokens": "max_completion_tokens"}}。当接入自定义模型时，若模型要求的请求路径与默认生成的chat/completion路径不符，需通过对应接入配置完成调整。

## 容易搞错的地方
易出现请求路径不匹配导致的调用错误，例如当接入的模型要求请求路径为api/chat时，默认生成的chat/completion路径会触发报错。fieldMap仅用于映射请求参数名称，无法修改请求路径，修改路径需通过专属接入配置完成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
