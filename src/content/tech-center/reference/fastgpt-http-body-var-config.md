---
title: FastGPT工作流HTTP节点Body参数配置与变量引用方法
slug: /zh/reference/fastgpt-http-body-var-config
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 官方文档小节
---

# FastGPT工作流HTTP节点Body参数配置与变量引用方法

## 结论
FastGPT工作流的HTTP节点Body参数仅在特定请求类型下生效。该参数支持编写自定义JSON格式内容，可通过`{{key}}`语法引入工作流变量，变量会在请求发送前被自动替换为对应值。

## 具体怎么做
1. 打开HTTP节点的配置面板，编写标准JSON格式的Body参数模板
2. 如需引入工作流变量，字符串类型变量需包裹在双引号内，格式为`"{{变量名}}"`，例如`"{{string}}"`或`"Bearer {{string}}"`
3. 数字、布尔值、数组、对象类型的变量，直接使用`{{变量名}}`格式，无需额外包裹，例如`{{number}}`、`{{obj}}`
4. 配置完成后，系统会自动将模板中的变量替换为工作流中已声明的对应值。

## 注意事项
1. Body参数仅在支持Body传参的特定请求类型下生效，需提前确认请求类型适配
2. 字符串变量的引用必须添加双引号，遗漏会导致参数解析失败
3. 变量名需与工作流中预先定义的变量完全匹配，否则无法完成替换。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)
