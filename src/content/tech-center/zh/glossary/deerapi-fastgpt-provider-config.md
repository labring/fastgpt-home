---
title: FastGPT中DeerAPI大语言模型提供商的配置说明
slug: /zh/glossary/deerapi-fastgpt-provider-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/5631
source_type: 官方文档
---

# FastGPT中DeerAPI大语言模型提供商的配置说明

## 一句话定义
DeerAPI是FastGPT可接入的第三方大语言模型服务提供商。

## 在FastGPT里怎么用
配置DeerAPI提供商时，需通过https://api.deerapi.com/token获取API密钥，设置基础请求地址为https://api.deerapi.com/v1/。可参考https://api.deerapi.com/doc查看API文档，通过https://api.deerapi.com/v1/models获取可用模型列表，相关定价信息可查阅https://api.deerapi.com/pricing。

## 容易搞错的地方
配置时易出现基础接口地址填写错误的问题，需严格使用指定的基础URL。未正确获取有效API密钥，会导致连接验证失败。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5631)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
