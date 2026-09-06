---
title: FastGPT ASR 语音输入配置与识别验证
slug: /zh/troubleshoot/fastgpt-asr-function-integration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/492
source_type: GitHub issue
---

# FastGPT ASR 语音输入配置与识别验证

FastGPT 支持语音输入及语音转文字。ASR 历史需求在 v4.6.1 获得 Whisper 支持，应用中还需启用语音输入，并检查浏览器录音权限和识别服务的调用结果。

## 版本与功能依据

[Issue #492 的维护者答复](https://github.com/labring/FastGPT/issues/492) 明确标注 v4.6.1 已支持 Whisper。当前[语音输入文档](https://doc.fastgpt.cn/zh-CN/guide/build/general/voiceInput) 介绍了录音、自动发送和自动语音回复；旧版本的具体配置入口应以对应版本界面为准。

## 配置与排查

1. 进入应用编辑页，打开“语音输入”的设置弹窗，启用语音输入并保存应用配置。
2. 测试阶段关闭“自动发送”，在前台对话中点击录音入口，授予浏览器麦克风权限，录制一段包含已知数字和产品名称的短语。
3. 检查识别文字与原话是否一致。浏览器提示环境不支持时，换用支持录音的浏览器和安全访问环境复测；录音成功但转写失败时，记录请求状态和错误响应，检查自部署识别服务的模型配置与凭证。
4. 文字识别稳定后，再按需要启用自动发送。自动语音回复依赖语音播报配置，可单独验证。

## 验证结果

保留一次“录音 → 文字确认 → 发送 → 回复”的测试结果，并分别记录录音权限、转写和回复三个环节。这样可以定位故障发生的位置，避免把某个环节的错误归因于整项 ASR 能力。
