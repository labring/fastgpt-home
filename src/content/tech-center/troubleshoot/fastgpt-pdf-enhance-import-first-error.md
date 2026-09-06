---
title: FastGPT 4.9.7-fix2 PDF 增强首次导入失败的历史排查
slug: /zh/troubleshoot/fastgpt-pdf-enhance-import-first-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4795
source_type: GitHub issue
---

# FastGPT 4.9.7-fix2 PDF 增强首次导入失败的历史排查

## 适用场景与历史记录

原报告描述启用 PDF 增强后第一次导入报错，第二次成功；评论者声称其测试过的 PDF 均有类似表现。 原始讨论提交于 2025-05-13，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

“所有 PDF 均失败”与“和文档无关”是该报告者的观察与判断，原线程尚缺可复现样例和确定根因。

## 排查与复测

1. 保留一份可共享的小 PDF，并记录首次与第二次导入的完整错误和时间。
2. 对比增强解析服务的请求、状态码、启动状态和超时情况。
3. 检查每次导入生成的集合与分块，避免重复导入造成重复知识，再复测同一文件。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：pdf导入知识库，启用PDF增强后第一次报错，只有第二次运行才可以成功](https://github.com/labring/FastGPT/issues/4795)

> 来源: [FastGPT 环境变量与自定义 PDF 解析](https://doc.fastgpt.io/en/self-host/config/env)
