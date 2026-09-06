---
title: FastGPT中field字段的含义与使用场景说明
slug: /zh/glossary/fastgpt-field-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/579
source_type: 官方文档
---

# FastGPT中field字段的含义与使用场景说明

## 一句话定义
Field是FastGPT中用于标识配置项、数据结构属性或接口参数的命名标识。

## 在 FastGPT 里怎么用
在知识库配置页面，可通过配置intro field来设置知识库介绍内容，该配置项位于知识库的配置页面中，保存配置后理论上应在列表页展示对应内容；在接口请求处理逻辑中，field用于定义结构体接收的参数字段，例如Message.messages.content字段要求为字符串类型，需严格匹配参数格式。

## 容易搞错的地方
在接口处理场景中，若传入的参数类型与field指定的类型不匹配，会触发"cannot unmarshal array into Go struct field Message.messages.content of type string"的解析失败报错，该报错会直接导致请求无法正常处理；在知识库配置场景中，部分用户反馈配置intro field并点击保存后，虽提示更新成功，但返回列表页时介绍内容仍为空，需注意该配置的实际生效逻辑。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/579)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/639)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
