---
title: FastGPT中gpt-4-vision-preview调用报错的处理方法
slug: /zh/glossary/fastgpt-gpt4-vision-preview-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/639
source_type: 官方文档
---

# FastGPT中gpt-4-vision-preview调用报错的处理方法

## 一句话定义
gpt-4-vision-preview是FastGPT可调用的多模态大模型，调用时可能触发请求体绑定失败的解析错误，具体表现为无法将数组解析为字符串类型的结构体字段。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
目前无公开的专属配置参数或使用步骤说明，根据社区反馈，该报错通常出现在使用多模态能力时。调用时需保证请求体格式匹配系统预期，重点检查messages数组内每个对象的content字段格式，避免出现类型不匹配的问题。

## 容易搞错的地方
该模型的消息content字段为数组类型，若误传为普通文本模型的字符串格式，会触发报错：bind_request_body_failed json: cannot unmarshal array into Go struct field Message.messages.content of type string。该报错的请求ID为20231221170013440826620UJmYbqu8，可通过该ID定位具体调用场景。部分开发者会混淆多模态模型与普通文本模型的content字段格式，从而触发该错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/639)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
