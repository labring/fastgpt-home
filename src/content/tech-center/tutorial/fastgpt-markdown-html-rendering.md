---
title: 为FastGPT的Markdown渲染提供HTML嵌入与交互渲染能力
slug: /zh/tutorial/fastgpt-markdown-html-rendering
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/chat/htmlRendering
source_type: 官方文档
---

# 为FastGPT的Markdown渲染提供HTML嵌入与交互渲染能力

## 设计背景与功能边界
尽管Markdown本身支持嵌入HTML标签，但受安全限制，多数平台会限制动态内容、交互式元素及外部资源的渲染，影响复杂文档展示的灵活性。FastGPT通过iframe嵌入HTML并结合sandbox属性，实现安全的HTML渲染能力。该功能可扩展Markdown渲染的HTML支持范围，但存在两个核心边界：一是iframe会被设置固定高度以适配渲染（无法自动适配内容高度），二是不支持HTML内的JavaScript脚本执行。

## 快速使用步骤
你可以通过Markdown代码块格式，将标记语言指定为`html`来嵌入HTML内容。示例代码如下：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>欢迎使用FastGPT</title>
</head>
<body>
<nav>
<ul>
<li><a href="#home">首页</a></li>
<li><a href="#about">关于我们</a></li>
<li><a href="#contact">联系我们</a></li>
<li><a href="#gallery">图库</a></li>
</ul>
</nav>
</body>
</html>
```
嵌入的内容会被渲染为带交互的iframe块，支持全屏、预览、源代码模式的切换。

## 安全机制与使用注意
该功能通过iframe的`sandbox`属性和`referrerPolicy`防范安全风险，`sandbox`可细粒度限制外部HTML的行为，例如禁用脚本执行、限制表单提交等，确保渲染内容不会对系统造成威胁。使用时需注意：若你的HTML内容需要动态JavaScript交互，或需要完全自适应内容高度的展示效果，该功能无法满足需求，不建议使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/chat/htmlRendering)
