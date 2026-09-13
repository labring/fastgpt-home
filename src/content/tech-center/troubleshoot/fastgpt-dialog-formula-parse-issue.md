---
title: FastGPT 对话公式显示：Markdown 格式与渲染排查
slug: /zh/troubleshoot/fastgpt-dialog-formula-parse-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3854
source_type: GitHub issue
---

# FastGPT 对话公式显示：Markdown 格式与渲染排查

## 适用场景与历史记录

原报告于 2025 年 2 月描述私有部署的公式显示异常，版本只写了“最新版本”。 原始讨论提交于 2025-02-21，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

官方构建 FAQ 给出公式格式提示：行内 `\(x^2\)`，块级 `$$e=mc^2$$`。

## 排查与复测

1. 记录具体版本，并复制模型返回的原始公式文本。
2. 以 `\(x^2\)` 和 `$$e=mc^2$$` 分别测试行内、块级公式显示。
3. 检查公式是否被额外转义或放入代码块，并比较原始输出与页面渲染。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：对话界面返回的内容里如包含公式不能正确显示](https://github.com/labring/FastGPT/issues/3854)

> 来源: [FastGPT 应用构建常见问题](https://doc.fastgpt.io/en/guide/build/faq)
