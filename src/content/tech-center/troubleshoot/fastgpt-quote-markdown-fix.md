---
title: 解决FastGPT数据集引用内容图片与LaTeX公式显示异常问题
slug: /zh/troubleshoot/fastgpt-quote-markdown-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1788
source_type: GitHub issue
---

# 解决FastGPT数据集引用内容图片与LaTeX公式显示异常问题

## 现象
用户在使用FastGPT时，数据集导入的引用内容存在显示异常问题，具体表现为图片无法稳定展示，使用LaTeX语法编写的数学公式无法正常渲染，且该类公式在本地Markdown文档中可正常显示。

## 可能原因
现有引用内容处理组件未集成Markdown渲染能力，无法识别并解析LaTeX公式、图片链接等Markdown语法元素，导致内容仅以纯文本形式展示。

## 排查步骤
1. 确认已将FastGPT升级至最新版本，排查版本过旧导致的功能缺失问题（需按实际环境确认）。
2. 检查原始导入的Markdown内容，确认LaTeX公式、图片语法格式符合标准规范，例如图片使用![alt](url)格式，LaTeX公式使用标准的$...$或$$...$$包裹。
3. 定位到FastGPT前端代码中处理引用内容的组件文件，路径为projects/app/src/components/core/dataset/QuoteItem.tsx。

## 解决与验证
解决方法：在projects/app/src/components/core/dataset/QuoteItem.tsx文件中添加Markdown渲染组件，使该组件可解析并渲染Markdown语法内容。修改后复测：将包含正确格式LaTeX公式与图片的Markdown内容导入数据集，查看引用展示效果，确认公式可正常渲染、图片可稳定显示。

> 来源: [FastGPT GitHub issue #1788](https://github.com/labring/FastGPT/issues/1788)
