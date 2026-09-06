---
title: FastGPT V4.6.7版本接口与输出问题说明
slug: /zh/glossary/fastgpt-v467-interface-output-issues
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/771
source_type: 官方文档
---

# FastGPT V4.6.7版本接口与输出问题说明

## 一句话定义
FastGPT V4.6.7版本中存在的知识库接口凭证验证与对话输出格式相关的已知问题。

## 在 FastGPT 里怎么用
在该版本私有部署环境中，调用知识库相关接口（如/api/core/dataset/data/list）时，需使用从网页平台获取的Token字段作为调用凭证，格式以fastgpt-开头的通用API密钥无法完成该类接口的身份验证。对话界面的流式输出模式变更为段落式输出。

## 容易搞错的地方
常将格式以fastgpt-xxxxx为例的通用API密钥作为知识库接口的调用凭证，此时会触发403凭证错误，返回内容为{"code": 403, "statusText": "unAuthorization", "message": "凭证错误", "data": null}。对话界面的流式输出变更后，阅读体验与旧版本存在差异。

> [FastGPT GitHub issue 771](https://github.com/labring/FastGPT/issues/771), [FastGPT GitHub issue 777](https://github.com/labring/FastGPT/issues/777)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
