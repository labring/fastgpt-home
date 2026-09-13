---
title: FastGPT 4.6.x 文本提取乱码：重复议题与模型对照
slug: /zh/troubleshoot/fastgpt-text-extraction-garbled
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/555
source_type: GitHub issue
---

# FastGPT 4.6.x 文本提取乱码：重复议题与模型对照

## 适用场景与历史记录

原报告自述 4.6.3 的特定 latest 镜像在私有部署中出现提取文本乱码，维护者将其指向相同问题的另一个议题。 原始讨论提交于 2023-12-04，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

被关联的议题报告者表示更换提取模型后恢复。该结果来自相关历史环境，当前复测应记录准确模型 ID 和输出差异。

## 排查与复测

1. 记录实际镜像摘要、提取模型和原始输入，复现文本提取与 HTTP 参数的传递。
2. 在测试环境换用一个确认支持相应结构化输出的模型做对照。
3. 核对输出字段及中文编码，再检查下游 HTTP 参数；将模型差异作为复测结果记录。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：The extracted text will be garbled.](https://github.com/labring/FastGPT/issues/555)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/555#issuecomment-1846728745)

> 来源: [关联讨论中的解决线索](https://github.com/labring/FastGPT/issues/540#issuecomment-1837162335)
