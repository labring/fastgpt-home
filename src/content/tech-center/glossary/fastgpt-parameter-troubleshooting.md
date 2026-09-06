---
title: 排查FastGPT工具调用与配置参数使用异常的方法
slug: /zh/glossary/fastgpt-parameter-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1253
source_type: 官方文档
---

# 排查FastGPT工具调用与配置参数使用异常的方法

## 一句话定义
FastGPT中的parameter指用于工具调用接口请求或系统运行配置的参数项，用于定义请求内容或调整系统运行逻辑。

## 在 FastGPT 里怎么用
在工具调用场景中，需按照接口要求传递参数。当使用私有部署版本4.7.1或4.9社区版时，可通过工具调用连接发起请求，或在系统配置页面填写符合要求的参数名。例如使用工具调用连接获取当前时间并发起请求，或在配置时使用官方支持的参数名称。

## 容易搞错的地方
工具调用时，若传递messages[2].tool_calls[0].index字段，会触发unknown_parameter报错，报错文本为Unknown parameter: 'messages[2].tool_calls[0].index'。配置参数时，若使用未被支持的参数名如hnsw.iterative_scan，会触发42602错误，报错内容为{"message": "invalid configuration parameter name \"hnsw.iterative_scan\"","name": "error","code": "42602"}。不同FastGPT版本对参数的支持存在差异，需注意对应版本的参数兼容性。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1253)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4148)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
