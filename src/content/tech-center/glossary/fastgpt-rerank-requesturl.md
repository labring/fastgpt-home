---
title: FastGPT模型配置中requestUrl参数的含义与配置方法
slug: /zh/glossary/fastgpt-rerank-requesturl
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT模型配置中requestUrl参数的含义与配置方法

## 一句话定义
requestUrl是FastGPT重排模型配置中的自定义请求地址参数，用于指定模型的请求接口地址。

## 在 FastGPT 里怎么用
该参数位于重排模型配置的metadata字段中，参数值为字符串类型的合法请求地址，默认值为空字符串。在添加自定义重排模型渠道时，需填写该参数以指定模型的请求地址。

## 容易搞错的地方
未正确配置该参数时，会导致模型测试时出现cannot read properties of undefined（reading ‘requestUrl’）的报错。该参数仅适用于重排类型的自定义模型，其他类型模型暂不支持该参数。需确保填写的请求地址格式符合接口调用规范，否则会影响模型正常调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
