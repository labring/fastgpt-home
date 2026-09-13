---
title: 说明FastGPT中自签名证书报错的触发场景
slug: /zh/glossary/fastgpt-self-signed-certificate-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/27
source_type: 官方文档
---

# 说明FastGPT中自签名证书报错的触发场景

## 一句话定义
self-signed certificate是FastGPT运行过程中弹出的证书相关报错，标准提示文本为"self-signed certificate"。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错的触发场景包含两种明确的实际情况。第一种是使用代理方案时，发送聊天消息后会弹出该提示。第二种是部署完成后，开始对话时会弹出该报错。原文中还提及部分场景下，即使对SSL证书进行检查且结果无异常，仍会触发该报错。

## 容易搞错的地方
容易搞错的地方包括，部分使用者会将该报错直接归因于SSL证书配置错误，但实际部分场景下，即使SSL证书检查无异常，仍会出现该报错。此外，部分使用者可能未意识到代理方案的使用会引发该类证书报错，从而忽略代理配置相关的排查方向。

> [FastGPT GitHub issue 27](https://github.com/labring/FastGPT/issues/27), [FastGPT GitHub issue 148](https://github.com/labring/FastGPT/issues/148)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
