---
title: FastGPT微信个人号接入的配置步骤与使用方法
slug: /zh/integration/fastgpt-wechat-personal-access
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/wechat
source_type: 官方文档
---

# FastGPT微信个人号接入的配置步骤与使用方法

本文档为FastGPT官方提供的微信个人号接入操作指引，面向使用FastGPT的工程师与技术选型人员，详细说明该接入方式的完整操作流程与注意事项，所有操作均基于FastGPT官方的发布渠道功能完成。

## 配置步骤
进入你已经在FastGPT平台搭建完成的Agent应用，点击顶部的tab标签切换至发布渠道页面，在选项列表中选择微信个人号，点击新建按钮，此时弹出的表单内容可随意填写，无需额外配置参数。当渠道创建成功后，页面会新增一条对应的记录，首次使用该渠道时，需点击记录中的扫码登录按钮，即可弹出登录二维码，使用目标微信个人号扫码完成登录。扫码登录连接成功后，你的微信好友列表中会新增一个名为微信ClawBot的机器人账号，点击进入该聊天界面，即可开始与FastGPT的Agent进行对话交互。

## 常见问题解答
使用该接入方式时，可能会遇到以下两类常见问题：
1. 微信端未找到接入入口：当前该接入方式仅支持IOS系统，且需要将微信升级至最新版本，否则无法找到对应的入口。
2. 重置聊天记录：若需要清空当前的聊天对话记录，只需在聊天输入框中输入`Reset`或者`/reset`即可完成重置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/wechat)
