---
title: 解决FastGPT网页链接数据集获取失败及功能区别问题
slug: /zh/troubleshoot/fastgpt-web-dataset-troubleshoot-diff
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1907
source_type: GitHub issue
---

# 解决FastGPT网页链接数据集获取失败及功能区别问题

## 现象
用户在私有部署的最新版FastGPT中，已确认自身Key可正常使用，创建文本数据集的网页链接类型时，填入官方文档链接https://doc.fastgpt.in/docs/course/websync/，配置选择器为div[data-prismjs-copy]，无法获取到信息，结果为空。同时用户不清楚“知识库-先建文本数据集-网页链接”和“web站点同步”两个功能的区别。

## 可能原因
1. 配置的CSS选择器无法匹配目标网页中的目标元素；
2. 两个功能的应用场景存在差异，用户未明确两者的功能定位；
3. 运行环境无法正常访问目标网页链接。

## 排查步骤
1. 访问目标网页https://doc.fastgpt.in/docs/course/websync/，通过浏览器开发者工具验证选择器div[data-prismjs-copy]是否能匹配到页面元素；
2. 查阅官方文档，确认“知识库-文本数据集-网页链接”与“web站点同步”的功能差异；
3. 检查当前运行环境的网络配置，确认可以正常访问目标网页链接；
4. 核对数据集配置的其他参数是否符合要求。

## 解决与验证
针对网页信息获取失败的问题：如果选择器无法匹配目标元素，调整选择器为页面实际存在的元素选择器；如果环境无法访问目标链接，修复网络访问权限。针对功能区别的疑问，需结合官方文档的描述，明确两个功能的适用场景，按需选择对应功能。验证时，重新配置数据集，使用调整后的选择器，确认可以正常获取网页信息；或根据功能说明选择对应功能完成知识库搭建。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1907)
