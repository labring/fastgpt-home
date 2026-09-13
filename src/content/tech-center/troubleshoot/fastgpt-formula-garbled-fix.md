---
title: 解决FastGPT中LaTeX公式渲染乱码的问题
slug: /zh/troubleshoot/fastgpt-formula-garbled-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1806
source_type: GitHub issue
---

# 解决FastGPT中LaTeX公式渲染乱码的问题

## 现象
使用FastGPT时，尤其是存在LaTeX格式公式的场景，会出现乱码问题，该问题与所使用的大模型无关。示例乱码对应的原始公式为：
```latex
[
\\text{基础养老金} = \\left(\\text{养老金计发基数} + \\text{养老金计发基数} \\times \\text{缴费指数}\\right) \\div 2 \\times \\text{缴费年限} \\times 1%
]
```

## 可能原因
未添加math提示词，导致系统无法正确识别并渲染LaTeX格式的公式，进而出现乱码。

## 排查步骤
1. 确认当前输入内容包含LaTeX格式的公式
2. 检查是否未添加math提示词
3. 若问题仍存在，需按实际环境确认其他相关配置

## 解决与验证
添加math提示词即可解决该问题。验证方式为：输入包含LaTeX格式的公式并添加math提示词后，公式可正常渲染，不再出现乱码。

> 来源: [FastGPT GitHub issue #1806](https://github.com/labring/FastGPT/issues/1806)
