---
title: FastGPT 简历解析：历史需求与结构化提取验证
slug: /zh/troubleshoot/fastgpt-resume-feature-auto-closed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1743
source_type: GitHub issue
---

# FastGPT 简历解析：历史需求与结构化提取验证

## 适用场景与历史记录

原议题希望增加面向简历的内容解析，社区提出先转换 Markdown 保存的办法。 原始讨论提交于 2024-06-12，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

文件转文本和准确提取履历字段是两个需要分别验收的阶段。社区提出的 Markdown 转换方法适合作为测试起点。

## 排查与复测

1. 使用已脱敏的测试简历，检查文档转文本后的姓名、日期、经历和表格内容。
2. 定义固定提取字段与空值规则，将解析文本交给内容提取流程。
3. 逐字段对照原简历核验结果，并保留无法确定的字段供人工检查。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：增加简历内容解析](https://github.com/labring/FastGPT/issues/1743)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/1743#issuecomment-2162124774)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)
