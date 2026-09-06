---
title: FastGPT中SSO与飞书接入的Token配置说明
slug: /zh/glossary/fastgpt-sso-token-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# FastGPT中SSO与飞书接入的Token配置说明

## 一句话定义
FastGPT中的Token是用于身份鉴权、通信校验与加密的密钥类配置参数。

## 在FastGPT里怎么用
使用docker-compose部署fastgpt-sso镜像时，需在environment字段中配置AUTH_TOKEN参数，值为自定义的鉴权信息，供fastgpt-pro调用。在飞书接入配置流程中，从飞书开放平台事件与回调的加密策略处获取Encrypt Key，填入飞书机器人接入对话框，用于加密飞书服务器与FastGPT的通信。Verification Token为默认生成的来源校验参数，FastGPT使用更安全的校验方式，可忽略该配置。

## 容易搞错的地方
使用Http协议通信时，需配置Encrypt Key保障通信安全，使用Https协议则无需配置该参数。部分用户会误配置Verification Token，实际上该参数可直接忽略。SSO服务的AUTH_TOKEN需与fastgpt-pro的鉴权配置保持一致，否则会导致鉴权失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
