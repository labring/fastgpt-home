---
title: 解决FastGPT中\( \)和\[ \]格式LaTeX公式无法正常渲染的问题
slug: /zh/troubleshoot/fastgpt-latex-formula-rendering-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3294
source_type: GitHub issue
---

# 解决FastGPT中\( \)和\[ \]格式LaTeX公式无法正常渲染的问题

## 现象
用户在FastGPT聊天中使用部分模型输出的`\(E = mc^2\)`（行内）、`\[E = mc^2\]`（块级）格式的LaTeX公式时，无法正常渲染为数学公式样式，仅支持`$`和`$$`包裹的公式格式。

## 可能原因
当前FastGPT内置的Markdown解析器仅识别`$`与`$$`包裹的LaTeX公式，未支持`\( \)`和`\[ \]`格式的公式，因此无法完成对应渲染。

## 排查步骤
1. 确认待渲染的公式使用了`\( \)`或`\[ \]`作为包裹符号
2. 确认当前FastGPT已升级至最新可用版本
3. 检查是否已启用`\( \)`和`\[ \]`格式公式的支持配置（若平台提供该选项）

## 解决与验证
解决方式需基于FastGPT的功能扩展，一是修改内置Markdown解析器，使其能够识别`\( \)`和`\[ \]`格式的LaTeX公式；二是可通过配置选项，允许用户选择是否启用该格式的公式支持。验证时，发送`\(E = mc^2\)`或`\[E = mc^2\]`格式的公式，确认可正常渲染为对应的数学公式样式，与`$`、`$$`格式的显示效果一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3294)
