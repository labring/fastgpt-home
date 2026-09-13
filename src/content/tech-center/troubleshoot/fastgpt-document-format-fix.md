---
title: FastGPT 文档排版修订：textlint 自动修复的历史案例
slug: /zh/troubleshoot/fastgpt-document-format-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7531
source_type: GitHub issue
---

# FastGPT 文档排版修订：textlint 自动修复的历史案例

## 适用场景与历史记录

原议题涉及项目文档的中文排版规范；贡献者报告批量 textlint --fix 会改变部分列表、代码块和参数写法。 原始讨论提交于 2026-08-17，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

贡献者报告了限定转换规则并人工审查的处理过程和 rag.mdx 的检查结果。98→4 是该次提交的自报结果，引用时应保留归属与范围。

## 排查与复测

1. 在版本控制副本中挑选一篇文档，限定处理叙述文本中的空格和标点。
2. 核对代码块、URL、表格和参数名的 diff，逐项检查结构。
3. 运行对应文档检查和渲染预览，再按同一范围推进后续文件。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：关于文档的格式修复](https://github.com/labring/FastGPT/issues/7531)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/7531#issuecomment-5407420414)

> 来源: [关联修订记录](https://github.com/labring/FastGPT/pull/7591)
