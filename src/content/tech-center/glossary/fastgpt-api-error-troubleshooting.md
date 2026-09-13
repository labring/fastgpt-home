---
title: 说明FastGPT中Invalid header与API连接报错的排查方法
slug: /zh/glossary/fastgpt-api-error-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/50
source_type: 官方文档
---

# 说明FastGPT中Invalid header与API连接报错的排查方法

## 一句话定义
该报错指代FastGPT与外部API服务交互时出现的两类异常，分别为请求头含非法字符的错误，以及API服务连接被拒绝的错误。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
当发起对话时出现Invalid character in header content ["auth"]报错，可通过查看docker日志排查问题；当出现Bad Gateway: Invalid response object from API报错且日志显示dial tcp connect: connection refused时，需确认配置的API接口地址、端口是否正确，且API服务可正常访问。

## 容易搞错的地方
易误将API服务的普通地址当作可调用的接口地址，未检查auth请求头的字符合法性，或忽略API服务的端口开放与网络连通性检查。

> [FastGPT GitHub issue 50](https://github.com/labring/FastGPT/issues/50), [FastGPT GitHub issue 411](https://github.com/labring/FastGPT/issues/411)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
