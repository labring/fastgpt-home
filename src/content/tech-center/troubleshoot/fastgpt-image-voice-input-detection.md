---
title: FastGPT 图片与语音输入分流的历史需求与配置边界
slug: /zh/troubleshoot/fastgpt-image-voice-input-detection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1798
source_type: GitHub issue
---

# FastGPT 图片与语音输入分流的历史需求与配置边界

## 适用场景与历史记录

原议题请求识别用户是否上传图片或使用语音输入，以便选择不同模型和提示词。 原始讨论提交于 2024-06-18，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前文件输入文档区分图片、音频、视频与文档，语音配置也提供自动语音回复。文件类型与录音来源标记的支持范围应逐项验证。

## 排查与复测

1. 先确定需要区分的是附件媒体类型，还是麦克风录音这一输入方式。
2. 分别上传图片、音频和文档，核对工作流实际收到的文件类型与 URL。
3. 选择对应多模态模型并开启识别能力；语音回复场景核对语音输入和播报配置。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：增加用户是否上传图片或者使用语音输入作为变量输入到判断工具](https://github.com/labring/FastGPT/issues/1798)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)
