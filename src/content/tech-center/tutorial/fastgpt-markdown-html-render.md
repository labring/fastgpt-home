---
title: 在FastGPT中通过Markdown嵌入HTML内容的渲染与交互
slug: /zh/tutorial/fastgpt-markdown-html-render
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/chat/htmlRendering
source_type: 官方文档
---

# 在FastGPT中通过Markdown嵌入HTML内容的渲染与交互

## 功能与安全机制
尽管Markdown原生支持嵌入HTML标签，但受安全限制，多数平台会限制动态内容、交互元素与外部资源渲染。本功能通过iframe嵌入渲染HTML内容，搭配sandbox属性保障安全。功能核心是扩展Markdown渲染能力，但因无法确认iframe内容高度，会设置固定高度渲染，且不支持HTML内执行JS脚本。技术上通过自定义IframeBlock组件实现，结合sandbox与referrerPolicy限制外部HTML的行为，如禁用脚本、表单提交等，避免安全风险。

## 使用步骤
通过Markdown代码块格式并标记语言为`html`即可使用，最小配置示例如下：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>示例页面</title>
</head>
<body>
<nav>
<ul>
<li><a href="#home">首页</a></li>
<li><a href="#about">关于我们</a></li>
</ul>
</nav>
</body>
</html>
```
只需将上述代码放入标记为`html`的Markdown代码块中，即可在对话中渲染对应的HTML内容。

## 交互与展示
用户可切换全屏、预览、源代码三种模式查看与控制嵌入的HTML内容。iframe会自适应父容器宽度，确保内容正常显示。需注意，sandbox属性已限制HTML内的脚本执行、表单提交等行为，无法在嵌入的HTML中运行JS代码。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/chat/htmlRendering
