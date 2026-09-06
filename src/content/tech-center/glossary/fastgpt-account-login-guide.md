---
title: FastGPT账号登录相关问题的排查与使用说明
slug: /zh/glossary/fastgpt-account-login-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/version/cloud/faq
source_type: 官方文档
---

# FastGPT账号登录相关问题的排查与使用说明

## 一句话定义
FastGPT的账号登录是指访问FastGPT平台的身份验证流程，包含两套独立且不互通的账号体系。

## 在 FastGPT 里怎么用
访问对应版本的平台完成登录：中国大陆版可通过https://fastgpt.cn访问，支持微信、手机号登录；国际版可通过https://fastgpt.io访问，支持邮箱、Google、Github登录，2024年9月前可通过手机号注册。在Kubernetes部署场景下，需配置以下环境变量：MONGODB_URI、PG_URL、CHAT_API_KEY、ROOT_KEY、DEFAULT_ROOT_PSW，若出现报错"secretOrPrivateKey must have a value when login"，需检查上述环境变量是否已正确赋值。若无法登录，可尝试切换不同版本的平台进行尝试。

## 容易搞错的地方
两套版本的账号无法互通，不能跨版本使用同一账号登录。国际版的手机号注册功能仅在2024年9月前可用，之后不再支持。部署时若未正确配置ROOT_KEY等密钥类环境变量，会触发指定的登录报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/version/cloud/faq)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
