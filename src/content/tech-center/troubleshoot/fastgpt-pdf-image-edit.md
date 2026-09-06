---
title: FastGPT PDF 解析后图片编辑的历史需求
slug: /zh/troubleshoot/fastgpt-pdf-image-edit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4619
source_type: GitHub issue
---

# FastGPT PDF 解析后图片编辑的历史需求

## 适用场景与历史记录

原议题希望在知识库 Markdown 编辑时支持方便的粘贴上传、增加和删除图片，以修订 PDF 解析结果。 原始讨论提交于 2025-04-22，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

线程表达的是图片编辑体验需求。图片引用、存储对象和知识分块的更新要同步核对。

## 排查与复测

1. 分别查看原 PDF、解析 Markdown 和知识分块中的图片链接。
2. 在测试文档中完成一次图片替换，核对原文展示和检索引用。
3. 检查替换前后的存储对象引用，使用产品提供的管理方式处理文件生命周期。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：建议增加知识库图片临时上传](https://github.com/labring/FastGPT/issues/4619)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)

> 来源: [FastGPT 对象存储配置](https://doc.fastgpt.io/en/self-host/config/object-storage)
