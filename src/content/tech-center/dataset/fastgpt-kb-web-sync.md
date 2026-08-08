---
title: FastGPT知识库Web站点同步功能的配置和使用方法
slug: /zh/dataset/fastgpt-kb-web-sync
page_type: 知识库与切分
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
source_type: 官方文档
---

# FastGPT知识库Web站点同步功能的配置和使用方法

## 功能介绍
FastGPT的Web站点同步功能仅面向商业版用户开放，该功能通过爬虫技术抓取同域名下的静态站点页面，最多支持捕获200个子页面，主要用于快速构建文档类知识库。需注意，国内多数媒体站点无法使用该功能，可通过终端执行`curl https://目标站点页面地址`命令检测是否为静态站点，例如`curl https://doc.fastgpt.io/guide/getting-started`。

## 配置与使用步骤
1. 新建知识库，选择「Web站点同步」类型；
2. 点击「配置站点信息」按钮；
3. 填写目标站点入口网址，并配置内容选择器；
4. 点击「开始同步」，等待系统自动抓取网站信息即可。
关于选择器的使用：可通过浏览器调试面板（F12或右键-检查）定位目标元素，参考CSS选择器规则。常见选择器包括属性选择器（如`div[data-prismjs-copy]`）、类选择器（如`.docs-content`）；如需抓取多区域内容，可通过逗号分隔多个选择器，例如`.docs-content .mb-0.d-flex, .docs-content div[data-prismjs-copy]`。

## 应用绑定
完成站点同步并生成知识库后，可创建应用并绑定该知识库，即可在对话中使用抓取的站点内容。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
