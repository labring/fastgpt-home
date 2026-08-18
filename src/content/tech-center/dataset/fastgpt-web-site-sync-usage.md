---
title: FastGPT Web站点同步功能的使用方法与配置规则
slug: /zh/dataset/fastgpt-web-site-sync-usage
page_type: 知识库与切分
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
source_type: 官方文档
---

# FastGPT Web站点同步功能的使用方法与配置规则

## 功能概述
FastGPT Web站点同步功能仅面向商业版用户开放，该功能基于爬虫技术，可通过一个入口网站自动捕获同域名下的所有页面，目前最多支持抓取200个子页面。出于合规与安全考虑，仅支持静态站点爬取，主要用于快速构建文档类知识库。可通过终端发送curl请求检测目标站点是否为静态站点，例如执行`curl https://doc.fastgpt.io/guide/getting-started`。需要注意的是，国内多数媒体站点（如公众号、CSDN、知乎等）基本无法正常同步。

## 配置与使用步骤
1.  新建知识库，在类型中选择「Web站点同步」；
2.  点击页面中的「配置站点信息」按钮；
3.  填写目标网站的入口地址，并配置内容选择器；
4.  点击「开始同步」，等待系统自动完成网站信息抓取。

其中选择器用于定位需要抓取的具体页面内容，避免抓取整个站点的无关信息。使用前需打开浏览器调试面板（通常按F12或右键选择「检查」），参考CSS选择器规则编写。常见选择器类型包括属性选择器（如选中带`data-prismjs-copy`属性的div标签，选择器为`div[data-prismjs-copy]`）、类选择器（如选中类名为`docs-content`的元素，选择器为`.docs-content`）；若需要同时选中多组内容，可通过逗号分隔多个选择器，例如`.docs-content .mb-0.d-flex, .docs-content div[data-prismjs-copy]`，即可同时选中两组指定元素。同步完成后，需创建应用并绑定该知识库，才能在对话中使用抓取的内容。

## 使用边界与易错点
该功能存在明确的使用边界：仅支持静态站点抓取，动态渲染的页面无法正常获取内容；仅可爬取与入口地址同域名的页面，跨域名站点无法同步；单次同步最多支持200个子页面。配置时若选择器编写错误，会导致抓取的内容不符合预期，需反复调试选择器匹配目标元素。此外，该功能不适用于动态站点、非同源站点以及国内多数媒体类站点，若需同步此类内容，需使用其他适配方案。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/websync)
