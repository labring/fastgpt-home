---
title: 获取飞书机器人凭证并配置FastGPT发布渠道参数
slug: /zh/tutorial/fastgpt-feishu-bot-config
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/feishu
source_type: 官方文档
---

# 获取飞书机器人凭证并配置FastGPT发布渠道参数

飞书机器人接入FastGPT的凭证配置流程，需依托飞书开放平台开发者后台与FastGPT发布渠道配置页面完成，核心围绕两类凭证的获取与配置展开。

## 获取基础接入凭证
登录飞书开放平台开发者后台，进入已创建的企业自建应用页面，提取App ID与App Secret两个必填凭证。将这两个参数完整填入FastGPT新建发布渠道的配置对话框中，完成基础接入配置。

## 配置可选加密与校验参数
若需强化通信安全性，可配置Encrypt Key参数。进入飞书开放平台开发者后台的事件与回调模块，点击加密策略页面，获取系统生成的Encrypt Key，将其填入飞书机器人接入的配置对话框中。Encrypt Key用于加密飞书服务器与FastGPT之间的通信数据，建议使用Http协议通信时配置该参数，使用Https协议通信时无需配置。
Verification Token为默认生成的校验凭证，原本用于校验请求来源，但FastGPT采用飞书官方推荐的更安全的校验方式，因此该配置项可直接忽略，无需进行配置操作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/feishu)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
