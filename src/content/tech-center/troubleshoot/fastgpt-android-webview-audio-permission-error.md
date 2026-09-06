---
title: 解决FastGPT安卓Webview嵌入后语音输入权限被拒报错问题
slug: /zh/troubleshoot/fastgpt-android-webview-audio-permission-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3418
source_type: GitHub issue
---

# 解决FastGPT安卓Webview嵌入后语音输入权限被拒报错问题

## 现象
在FastGPT私有部署v4.8.12版本中，通过免登录窗口创建HTTPS域名链接后，浏览器与小程序内的语音输入可正常使用，但在自行开发的安卓APP通过Webview嵌入该链接时，语音输入触发Permission denied报错。

## 可能原因
可能原因包括安卓应用未正确申请麦克风权限，Webview未启用媒体权限相关配置，或Webview环境下的权限请求逻辑与浏览器存在差异。

## 排查步骤
1. 确认安卓应用已申请麦克风权限。
2. 检查Webview的配置项，确认启用了媒体权限相关的权限请求逻辑。
3. 验证部署的HTTPS域名配置是否正常。
4. 按实际环境确认安卓系统与Webview的兼容性。

## 解决与验证
根据排查结果调整对应配置。若为权限未申请，则补充麦克风权限申请逻辑；若为Webview配置问题，则调整Webview的媒体权限启用设置。验证时，在安卓APP的Webview中打开FastGPT免登录链接，执行语音输入操作，确认无Permission denied报错且功能正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3418)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
