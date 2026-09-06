---
title: 隐藏FastGPT分享链接中的新对话按键的解决方法
slug: /zh/troubleshoot/hide-new-dialog-button-fastgpt
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2269
source_type: GitHub issue
---

# 隐藏FastGPT分享链接中的新对话按键的解决方法

## 现象
FastGPT 4.8.8版本中，当启用单点登录以及session-ID控制功能时，用户点击分享链接中的【新对话】按键后，session-id会发生变化，导致系统要求用户重新进行身份验证，整体使用体验较差。相关用户希望隐藏该按键，或修改为文本提示内容以避免此类问题。

## 可能原因
启用单点登录和session-ID控制功能后，分享链接内的【新对话】按键会生成独立的新session-id，该新session-id与当前用户已通过验证的身份信息不匹配，从而触发重新登录的流程，影响使用体验。

## 排查步骤
1. 确认当前部署的FastGPT版本为4.8.8。
2. 确认系统已启用单点登录及session-ID控制功能。
3. 找到需要调整的分享链接，或进入对应配置页面修改链接参数。

## 解决与验证
可在原有分享链接后追加参数`&showHistory=0`，该参数可隐藏分享链接内的【新对话】按键。验证时，访问修改后的分享链接，确认【新对话】按键不再显示，且通过该链接进入系统后不会触发重新登录流程。需按实际环境确认参数的生效范围及具体配置方式。

> 来源: [FastGPT GitHub issue #2269](https://github.com/labring/FastGPT/issues/2269)
