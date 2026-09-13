---
title: 解决FastGPT知识库img标签被转为Markdown图片的问题
slug: /zh/troubleshoot/fastgpt-img-tag-conversion-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/243
source_type: GitHub issue
---

# 解决FastGPT知识库img标签被转为Markdown图片的问题

## 现象
用户在FastGPT知识库中编辑的问答答案包含img标签，在实际AI回复的展示内容里，该img标签被自动转换为Markdown格式的图片。

## 可能原因
该问题由FastGPT前端内容渲染流程自动处理HTML标签触发，会将输入的img标签转换为Markdown格式的图片进行展示。

## 排查步骤
1. 检查知识库编辑页面中，对应问答答案内的img标签书写格式，确认是否为标准的`<img>`标签形式，排查是否存在格式错误。
2. 查看AI回复的原始接口返回内容，确认后端返回的文本是否包含原始的img标签，排除后端处理环节导致的标签变更。
3. 对比不同类型标签的展示表现，确认该转换行为仅针对img标签生效，还是覆盖多数HTML标签。

## 解决与验证
若需保留原始的img标签，可调整前端渲染规则，禁用对img标签的自动转换逻辑。验证时，将包含img标签的问答内容重新存入知识库，发起对话查看AI回复内容，确认img标签未被转换为Markdown图片格式，保留原始的`<img>`标签文本。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/243)
