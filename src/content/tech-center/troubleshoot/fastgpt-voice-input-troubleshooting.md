---
title: FastGPT v4.7.1语音输入功能无响应的排查与解决指南
slug: /zh/troubleshoot/fastgpt-voice-input-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1259
source_type: GitHub issue
---

# FastGPT v4.7.1语音输入功能无响应的排查与解决指南

## 现象
v4.7.1版本源码部署后，进入聊天页面点击语音输入按钮无反应，无法将语音转换为文本。部分用户调整后按钮可点击，但无波形显示，仍无法完成语音输入。

## 可能原因
1. 部署环境未启用HTTPS协议；
2. 未配置支持语音识别的模型（如whisper-1）；
3. 浏览器安全策略限制，或录音文件存在异常（苹果设备较为常见）。

## 排查步骤
1. 确认当前部署环境是否启用HTTPS协议。
2. 检查API服务中是否配置了whisper-1语音识别模型，或已接入其他可用语音识别模型。
3. 若使用苹果设备，可尝试更换安卓设备测试，排查录音文件是否异常。
4. 若使用HTTP协议部署，可通过浏览器安全设置临时调整，或配置HTTPS。

## 解决与验证
### 配置HTTPS
通过申请域名并配置Nginx反向代理处理HTTPS请求，或按照公开教程完成HTTPS部署。
### 配置语音识别模型
确保API服务中存在whisper-1模型，或部署其他语音识别模型并接入OneAPI。
### 浏览器与设备调整
HTTP部署时，可通过`chrome://flags/`调整对应IP的安全模式；苹果设备出现问题时，更换安卓设备测试。
### 验证方式
点击语音输入按钮，确认出现波形显示，完成语音转文本功能。

> 来源: [FastGPT GitHub issue #1259](https://github.com/labring/FastGPT/issues/1259)
