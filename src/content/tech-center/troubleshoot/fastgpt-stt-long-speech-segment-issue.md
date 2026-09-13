---
title: FastGPT 长语音输入分段的历史需求与边界测试
slug: /zh/troubleshoot/fastgpt-stt-long-speech-segment-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3355
source_type: GitHub issue
---

# FastGPT 长语音输入分段的历史需求与边界测试

## 适用场景与历史记录

原议题描述 Whisper 类 STT 输入约一分钟会分段，希望支持会议或访谈的连续录音。 原始讨论提交于 2024-12-10，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原文没有确认分段来自浏览器、应用还是模型服务。语音录入、自动发送与长音频转写的限制应逐项检查。

## 排查与复测

1. 记录浏览器、录音模式、STT 模型和实际分段时长。
2. 检查录音结束事件、上传大小及语音识别请求的时间限制。
3. 用短、长两段测试音频比较转写完整度，再检查自动发送和总结流程。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：长语音输入功能，自动截断继续语音输入](https://github.com/labring/FastGPT/issues/3355)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
