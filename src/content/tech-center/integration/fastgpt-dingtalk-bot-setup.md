---
title: FastGPT接入钉钉机器人的商业版配置流程
slug: /zh/integration/fastgpt-dingtalk-bot-setup
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/dingtalk
source_type: 官方文档
---

# FastGPT接入钉钉机器人的商业版配置流程

从4.8.16版本起，FastGPT商业版支持直接接入钉钉机器人，无需额外API。完成配置后，用户可在钉钉企业内与机器人私聊，或在群组中@机器人触发对话，全程无需额外第三方API中转。

## 详细配置步骤
1. 创建钉钉企业内部应用：前往钉钉开发者后台创建企业内部应用，创建完成后获取Client ID与Client Secret，这两个参数将用于后续FastGPT渠道配置。
2. 配置FastGPT发布渠道：进入目标FastGPT应用的发布渠道页面，新建钉钉机器人接入渠道，在配置弹窗中填入此前获取的Client ID和Client Secret。创建完成后点击「请求地址」按钮，复制生成的回调地址。
3. 添加机器人应用能力：返回钉钉开发者后台，点击左侧「添加应用能力」菜单，为刚创建的企业内部应用添加「机器人」应用能力。
4. 配置机器人回调地址：点击左侧「机器人」应用能力菜单，将消息接受模式设置为HTTP模式，在消息接收地址栏填入之前复制的FastGPT回调地址。完成配置并调试通过后，点击发布按钮。
5. 发布应用版本：在钉钉开发者后台的「版本管理与发布」页面，点击「创建新版本」，填写版本号与版本描述后保存发布，即可完成应用上线。

## 常见使用问题
若需要重置当前聊天记录，可向机器人发送大小写敏感的「Reset」消息，机器人将自动新开一个独立的聊天会话。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/publish/dingtalk
