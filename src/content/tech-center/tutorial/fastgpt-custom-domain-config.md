---
title: FastGPT自定义域名配置的完整操作步骤
slug: /zh/tutorial/fastgpt-custom-domain-config
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/customDomain
source_type: 官方文档
---

# FastGPT自定义域名配置的完整操作步骤

配置FastGPT自定义域名前，需准备已完成备案的域名，备案需符合平台指定的范围。未完成备案的域名无法完成后续配置流程，无法通过自定义域名访问FastGPT服务。

## 域名配置操作步骤
首先进入对应配置界面，点击编辑按钮进入编辑状态。在编辑界面的输入框中填入目标域名，示例格式为www.example.com。接下来前往域名服务商的域名解析管理页面，添加配置界面中提示的DNS记录，需注意该记录的类型必须为CNAME，不可使用其他记录类型。完成DNS记录添加后，点击"保存"按钮提交配置。系统将自动启动DNS解析状态检查，通常情况下，一分钟内即可获取到解析记录。若长时间未获取到记录，可点击重试按钮重新发起检查。当界面中的状态提示显示为"已生效"时，点击"确认"按钮即可完成自定义域名的配置。配置界面的参考图示如下：
![配置自定义域名](/imgs/guide/team_permissions/customDomain/2.png)

配置完成后，可通过预先设置的自定义域名访问FastGPT服务，同时可使用该域名调用FastGPT的API接口。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/workspace/customDomain)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
