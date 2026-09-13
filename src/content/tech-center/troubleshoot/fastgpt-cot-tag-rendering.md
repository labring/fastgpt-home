---
title: 解决FastGPT中COT思考标签渲染与上下文处理问题
slug: /zh/troubleshoot/fastgpt-cot-tag-rendering
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3796
source_type: GitHub issue
---

# 解决FastGPT中COT思考标签渲染与上下文处理问题

## 现象
在使用FastGPT时，需通过提示词让模型先输出思考过程再回复答案以提升回复效果，但当前系统未对<think>标签进行渲染处理，无法正确展示模型生成的思考内容。同时，若直接将<think>标签内容嵌入回复，会污染上下文数据。

## 可能原因
系统未内置<think>标签的渲染逻辑，无法识别并展示标签包裹的思考内容。若直接在回复中保留<think>标签及内容，会污染API响应上下文及三方对接场景的交互数据，需将思考内容作为单独字段处理。

## 排查步骤
1. 验证是否通过提示词要求模型生成<think>标签包裹的思考过程
2. 检查当前系统是否存在<think>标签的渲染配置或相关代码逻辑
3. 确认API对接或三方对接场景下，是否出现<think>标签内容污染上下文的情况

## 解决与验证
修改源码实现<think>标签的渲染逻辑，将标签包裹的内容作为单独的思维字段存储与展示。配置系统排除API响应内容、三方对接场景中的<think>标签直接渲染，避免上下文污染。验证时，提交要求模型输出<think>标签包裹的思考过程的提示词，确认系统正确展示思考过程且未污染上下文。

> 来源: [FastGPT GitHub issue #3796](https://github.com/labring/FastGPT/issues/3796)
