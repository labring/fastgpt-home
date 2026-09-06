---
title: FastGPT中self-signed certificate报错的排查与处理方法
slug: /zh/glossary/fastgpt-self-signed-certificate-error-2
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/27
source_type: 官方文档
---

# FastGPT中self-signed certificate报错的排查与处理方法

## 一句话定义
self-signed certificate是FastGPT部署后触发的自签名证书相关报错，标准报错文本为"self-signed certificate"，会在聊天发送消息或开始对话时弹出提示。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该报错存在两种典型触发场景。第一种是使用代理方案部署FastGPT后，聊天发送消息时触发报错提示；第二种是部署成功后，在开始对话时弹出报错。部分遇到该报错的用户，曾检查SSL证书并确认证书无异常情况，未发现证书配置层面的问题。该报错的出现与FastGPT的部署配置存在直接关联，需结合部署过程中的代理与证书配置环节进行排查。

## 容易搞错的地方
容易将该报错单纯归因于SSL证书配置异常，部分场景下即使SSL证书配置正常，仍会触发该报错。此外，部分用户会忽略代理部署环节的配置细节，误以为仅需确认证书状态即可解决问题，导致排查效率降低。该报错的触发不仅与证书本身有关，还可能与代理配置的其他细节相关，需全面梳理部署流程中的各项配置。

> [FastGPT GitHub issue 27](https://github.com/labring/FastGPT/issues/27), [FastGPT GitHub issue 148](https://github.com/labring/FastGPT/issues/148)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
