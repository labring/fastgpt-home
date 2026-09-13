---
title: FastGPT iOS端语音输入异常问题排查与解决指南
slug: /zh/troubleshoot/fastgpt-ios-voice-input-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3014
source_type: GitHub issue
---

# FastGPT iOS端语音输入异常问题排查与解决指南

## 现象
部分用户使用FastGPT时，iOS端语音输入出现识别失败、页面持续转圈圈的问题。安卓、PC、iPad端可正常完成语音输入与识别。使用阿里模型时iOS无法识别，切换为openai whisper模型后，安卓与PC端恢复正常，但iOS端仍存在异常，且后台显示有报错信息。

## 可能原因
已知使用阿里模型时，iOS端适配存在问题。部分本地部署场景下，接入openai whisper模型时，iOS端触发报错。此前有相关issue提及该问题未完全解决，具体根因需结合实际部署环境确认。

## 排查步骤
1. 确认当前FastGPT版本，该问题涉及4.8.12版本；
2. 检查所接入的语音识别模型类型，对比阿里模型与openai whisper模型的使用表现；
3. 查看iOS端浏览器后台或控制台，记录具体报错内容；
4. 对比安卓、PC端的使用状态，确认异常是否仅出现在iOS端。

## 解决与验证
1. 若当前使用阿里模型，可尝试切换为openai whisper模型；
2. 本地部署场景下，确认所使用的oneApi版本（该线程中涉及v0.6.7-alpha版本）的配置是否正确；
3. 验证操作：切换模型后，在iOS端的Safari或微信内置浏览器中重新尝试语音输入，确认功能是否恢复正常。

> 来源: [FastGPT GitHub issue #3014](https://github.com/labring/FastGPT/issues/3014)
