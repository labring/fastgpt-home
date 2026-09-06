---
title: FastGPT v4.9.7 上传 .doc 文件报错的历史排查
slug: /zh/troubleshoot/fastgpt-doc-format-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4753
source_type: GitHub issue
---

# FastGPT v4.9.7 上传 .doc 文件报错的历史排查

## 适用场景与历史记录

原议题描述 v4.9.7 对话上传 .doc 文件报错，并询问该格式是否受支持。 原始讨论提交于 2025-05-06，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少可复制错误文本。旧版 .doc 与 .docx 是不同格式，格式支持应按所用解析器与版本核对。

## 排查与复测

1. 保存一份可公开复现的小 .doc 文件，并确认本地办公软件可打开。
2. 查看上传和解析两个阶段的请求、日志和文件类型识别结果。
3. 将副本转换为 .docx 后做对照，保留原文件并比较解析文本的完整度。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：对话里上传doc文件报错](https://github.com/labring/FastGPT/issues/4753)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
