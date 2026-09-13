---
title: FastGPT中find查询与API配置相关问题的说明
slug: /zh/glossary/fastgpt-find-query-issues
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/113
source_type: 官方文档
---

# FastGPT中find查询与API配置相关问题的说明

## 一句话定义
FastGPT中的find包含MongoDB集合查询操作与API密钥查找相关的配置与提示场景。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT里，MongoDB查询可通过`MongoApp.find({查询条件对象})`语法执行，示例代码为`const apps = await MongoApp.find({aaa: {$eq: 'bbb'}})`。API配置需设置ONEAPI_URL与ONEAPI_KEY参数，其中ONEAPI_URL格式为`https://xxxxx.cloud.sealos.io/v1`，ONEAPI_KEY为有效密钥字符串，openaiKey字段仅可填入密钥，不可填入ONEAPI_URL。

## 容易搞错的地方
容易搞错的地方包括两点。一是使用MongoDB的find查询时，传入任意key和value的查询条件，会导致查询出库中所有数据。二是混淆API密钥与API地址的填写位置，将ONEAPI_URL填入openaiKey字段，会触发报错文本"Incorrect API key provided: sk- ***************************************D75e. You can find your API key at https://platform.openai.com/account/api-keys."

> [FastGPT GitHub issue 113](https://github.com/labring/FastGPT/issues/113), [FastGPT GitHub issue 3744](https://github.com/labring/FastGPT/issues/3744)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
