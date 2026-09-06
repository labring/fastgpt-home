---
title: FastGPT外部对接配置与知识库文件导入问题排查
slug: /zh/glossary/fastgpt-external-config-file-import
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1219
source_type: 官方文档
---

# FastGPT外部对接配置与知识库文件导入问题排查

## 一句话定义
本页面针对FastGPT外部对接的配置字段变更问题，以及知识库本地文件导入的相关报错与处理方法进行说明。

## 在 FastGPT 里怎么用
外部对接配置需使用指定的字段，包括model、zhipu_ai_api_key、zhipu_ai_api_base。该配置存在两种格式，原格式包含model为gpt-3.5-turbo、zhipu_ai_api_base为http://xx.xx.xx.xx:3000/api/v1，新格式包含model为glm-4、zhipu_ai_api_base为https://open.bigmodel.cn/api/paas/v4。调用知识库本地文件导入接口时，需发起POST请求到/api/core/dataset/collection/create/localFile，请求需携带Authorization Bearer令牌，示例为--header 'Authorization: Bearer [REDACTED_CREDENTIAL]'，同时需提交file表单文件与data表单的JSON参数，data参数示例为{"datasetId":"668b900f25346058ae7227db","parentId":null,"trainingType":"chunk","chunkSize":512,"chunkSplitter":"","qaPrompt":"","metadata":{}}。

## 容易搞错的地方
外部对接的配置字段若未匹配正确格式，可能导致对接流程异常。调用知识库本地文件导入接口时，若在Linux服务器环境下使用Windows格式的带盘符本地文件路径，会触发curl: (26) couldn't open file的报错，无法找到指定文件，导致文件导入失败。

> [FastGPT GitHub issue 1219](https://github.com/labring/FastGPT/issues/1219), [FastGPT GitHub issue 1988](https://github.com/labring/FastGPT/issues/1988)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
