---
title: FastGPT对接Signoz监控服务的配置步骤说明
slug: /zh/glossary/fastgpt-signoz-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# FastGPT对接Signoz监控服务的配置步骤说明

## 一句话定义
Signoz是可对接FastGPT的监控服务，支持使用官方云服务或私有部署。

## 在 FastGPT 里怎么用
首先通过Sealos提供的一键部署卡片链接部署Signoz。部署完成后，进入应用详情页，点击右上角变更，开启4318端口的外网地址，若使用内网服务则可忽略该步骤。等待公网地址就绪后，复制该地址；若使用内网服务则复制4318端口的内网地址，将复制得到的地址填入FastGPT中。

## 容易搞错的地方
易混淆公网与内网地址的使用场景，未根据部署场景选择对应地址。使用外网访问时，易忘记开启4318端口的外网地址配置。部署后需等待公网地址就绪，未就绪时复制的地址无法正常使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
