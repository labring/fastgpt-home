---
title: FastGPT中secret密钥配置与API调用报错的排查指南
slug: /zh/glossary/fastgpt-secret-errors-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/141
source_type: 官方文档
---

# FastGPT中secret密钥配置与API调用报错的排查指南

## 一句话定义
secret是FastGPT中用于身份验证的密钥参数，涵盖环境变量配置密钥与API调用的密钥类型。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
部署FastGPT时，需配置CHAT_API_KEY、ROOT_KEY等secret类型的环境变量，填入有效值。调用GET /v1/dashboard/billing/subscription接口时，需使用session key作为验证密钥，不可使用secret key。

## 容易搞错的地方
易出现两类错误：一是调用GET /v1/dashboard/billing/subscription接口时误用secret key作为验证密钥，触发指定报错；二是部署时未为CHAT_API_KEY、ROOT_KEY等secret环境变量填入有效值，触发登录相关的密钥缺失报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/141)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
