---
title: FastGPT 语音与图像联合交互的历史需求
slug: /zh/troubleshoot/fastgpt-real-time-voice-dialogue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2861
source_type: GitHub issue
---

# FastGPT 语音与图像联合交互的历史需求

## 适用场景与历史记录

原议题建议参考 Open WebUI Call Mode，把实时语音与图像输入结合。 原始讨论提交于 2024-10-09，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前文件输入和语音配置文档提供相关基础能力；连续录音、实时双向传输和图像联合处理各有独立适配条件。

## 排查与复测

1. 明确实时交互所需的输入形式、响应延迟、打断和图像时序。
2. 分别验证语音输入、自动语音回复和模型图像识别。
3. 组合测试时记录每一轮媒体、转写和响应时间，再按差距提出具体需求。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：对标 Open WebUI Call Mode 的实时语音对话功能](https://github.com/labring/FastGPT/issues/2861)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
