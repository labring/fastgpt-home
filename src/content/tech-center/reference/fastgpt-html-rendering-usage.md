---
title: FastGPT聊天场景HTML渲染功能的使用方法
slug: /zh/reference/fastgpt-html-rendering-usage
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/chat/htmlRendering
source_type: 官方文档小节
---

# FastGPT聊天场景HTML渲染功能的使用方法

## 结论
FastGPT的聊天场景支持HTML渲染功能，通过指定格式即可实现自定义内容展示。使用该功能需遵循固定的代码书写规则。

## 具体怎么做
1. 将需要渲染的HTML内容放入Markdown代码块中；
2. 为该代码块添加`html`作为语言标记，格式为```html。

## 注意事项
必须使用Markdown代码块包裹HTML内容；必须正确指定语言标记为html，遗漏标记会导致内容无法按预期渲染；仅支持原文提及的使用方式，未明确支持的格式可能无法生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/chat/htmlRendering)
