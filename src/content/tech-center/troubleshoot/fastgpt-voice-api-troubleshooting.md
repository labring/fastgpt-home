---
title: 排查并解决FastGPT启用语音功能时的API异常问题
slug: /zh/troubleshoot/fastgpt-voice-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3059
source_type: GitHub issue
---

# 排查并解决FastGPT启用语音功能时的API异常问题

## 现象
用户尝试启用FastGPT的语音功能，已完成相关语音模型的添加操作，具体涉及whisper-1和tts-1模型，但在启用过程中遇到异常问题，无法正常使用语音功能。

## 可能原因
核心原因为API配置存在异常，相关密钥或接口设置不符合要求，导致语音功能无法正常调用。

## 排查步骤
1. 核对已添加的语音模型是否为whisper-1和tts-1，确认配置无误。
2. 检查API相关的密钥与接口配置是否完整、有效，无缺失或错误。
3. 验证语音功能的调用逻辑是否与当前配置要求匹配，确保流程正确。

## 解决与验证
针对API配置异常的问题，修正相关密钥与接口设置，确保配置符合要求。完成配置调整后，重新启用语音功能，调用whisper-1和tts-1模型，验证语音功能是否可以正常使用。

> 来源: [FastGPT GitHub issue #3059](https://github.com/labring/FastGPT/issues/3059)
