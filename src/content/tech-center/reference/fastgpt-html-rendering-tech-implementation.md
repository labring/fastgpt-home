---
title: FastGPT平台的HTML渲染与互动功能的详细具体技术实现细节和使用方式速查
slug: /zh/reference/fastgpt-html-rendering-tech-implementation
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/chat/htmlRendering
source_type: 官方文档小节
---

# FastGPT平台的HTML渲染与互动功能的详细具体技术实现细节和使用方式速查

## 结论
FastGPT的HTML渲染与互动功能通过iframe技术实现。该功能结合自定义组件与安全机制，保障嵌入内容的安全性并支持灵活的展示模式切换。

## 具体怎么做
1. 使用自定义的IframeBlock组件渲染HTML内容，通过iframe标签嵌入HTML代码块。
2. 配置iframe的sandbox属性，限制外部HTML的行为，如禁用脚本执行、限制表单提交等，保障内容安全。
3. 搭配referrerPolicy属性防范潜在安全风险，实现细粒度的权限控制。
4. 通过辅助函数与Markdown渲染模块结合，处理iframe嵌入的HTML内容。
5. 支持全屏、预览、源代码三种展示模式自由切换，同时让iframe自适应父容器宽度。

## 注意事项
使用sandbox属性时，需根据实际需求配置允许的功能，避免过度限制或开放过多权限。嵌入的HTML内容无法直接执行未授权的操作，确保不会对系统造成威胁。iframe的宽度会自动适配父容器，需注意父容器的尺寸设置以保证内容正常显示。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/chat/htmlRendering)
