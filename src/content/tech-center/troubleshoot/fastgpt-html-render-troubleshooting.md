---
title: 解决FastGPT 4.8.15 HTML渲染功能异常与使用问题
slug: /zh/troubleshoot/fastgpt-html-render-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3341
source_type: GitHub issue
---

# 解决FastGPT 4.8.15 HTML渲染功能异常与使用问题

## 现象
FastGPT 4.8.15版本的HTML渲染功能存在以下表现：默认启用代码模式；代码内的超链接URL无法正常生效；嵌入的echarts图表无法正常展示。同时该功能的适用场景不明确。

## 可能原因
1. 功能默认配置为代码模式，未切换为渲染浏览模式；
2. 当前HTML渲染功能未支持脚本、前端图表类展示内容；
3. 未通过代码运行或HTTP请求节点生成具备集成能力的HTML结果。

## 排查步骤
1. 确认当前功能是否处于代码模式，切换为渲染浏览模式；
2. 检查HTML代码中是否包含未被支持的脚本或前端图表相关内容；
3. 确认HTML结果是否通过代码运行或HTTP请求节点生成。

## 解决与验证
1. 切换至渲染浏览模式，验证超链接与图表的展示状态；
2. 调整HTML代码，移除未被支持的脚本或非必要的前端图表依赖，仅保留框架支持的内容；
3. 通过代码运行或HTTP请求节点生成具备集成能力的HTML结果，将其输出至对话中，验证展示效果。该功能的适用场景为通过代码运行或HTTP请求节点，输出当前框架、插件、大模型及Markdown无法稳定支持的集成能力HTML结果页面。

> 来源: [FastGPT GitHub issue #3341](https://github.com/labring/FastGPT/issues/3341)
