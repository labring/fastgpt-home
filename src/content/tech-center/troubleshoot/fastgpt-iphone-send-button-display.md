---
title: 解决FastGPT私有部署版iPhone端分享链接发送按钮不显示问题
slug: /zh/troubleshoot/fastgpt-iphone-send-button-display
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1646
source_type: GitHub issue
---

# 解决FastGPT私有部署版iPhone端分享链接发送按钮不显示问题

## 现象
FastGPT私有部署版本4.8.1场景下，iPhone设备打开分享链接时初始页面显示正常。在输入框输入内容后，输入框右侧的发送按钮不再显示。同时点击iPhone键盘自带的发送功能，也无法完成内容发送。

## 可能原因
结合用户排查推测，问题与浏览器安全策略相关。当前分享链接使用HTTP协议，相关浏览器仅识别HTTPS协议的链接，导致发送按钮无法正常渲染，发送功能失效。

## 排查步骤
1. 查看FastGPT生成的分享链接，确认其协议类型是否为HTTP开头。
2. 检查部署环境的域名配置、SSL证书安装情况，以及HTTP到HTTPS的转发规则是否生效。
3. 确认FastGPT部署时的协议配置是否符合HTTPS要求。

## 解决与验证
将分享链接的协议从HTTP修改为HTTPS，完成相关配置后重新生成分享链接。在iPhone设备打开新的分享链接，测试输入内容后发送按钮是否正常显示，以及点击键盘发送功能是否可正常完成内容发送。若两项功能均恢复正常，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1646)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
