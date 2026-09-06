---
title: 获取并配置飞书机器人接入FastGPT所需的凭证参数
slug: /zh/integration/feishu-bot-configuration-fastgpt
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/feishu
source_type: 官方文档
---

# 获取并配置飞书机器人接入FastGPT所需的凭证参数

飞书机器人接入FastGPT需完成凭证参数配置，相关信息需从飞书开放平台开发者后台获取并填入FastGPT的配置界面，实现飞书机器人与FastGPT的对接。

## 核心配置步骤与参数说明
具体配置步骤如下：
1.  进入飞书开放平台开发者后台的企业自建应用页面，提取App ID与App Secret两个必填凭证。
2.  将提取的App ID和App Secret完整填入FastGPT新建发布渠道的配置弹窗中。
3.  （可选）进入飞书开放平台开发者后台的事件与回调->加密策略页面，获取Encrypt Key，填入飞书机器人接入的配置对话框。

相关参数说明：
- App ID、App Secret：必填凭证，用于标识飞书应用的身份，是对接的基础参数。
- Encrypt Key：可选配置项，用于加密飞书服务器与FastGPT之间的通信。使用HTTPS协议时无需配置该参数，使用HTTP协议通信时建议配置。
- Verification Token：默认生成的用于校验来源的Token，因FastGPT使用飞书官方推荐的更为安全的校验方式，因此可直接忽略该配置项。

配置过程中需严格遵循协议类型对应的Encrypt Key配置建议，确保飞书服务器与FastGPT之间的通信链路安全可靠，避免出现通信校验失败的问题。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/feishu)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
