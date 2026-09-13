---
title: 解决FastGPT导入动态渲染网页内容抓取失败的问题
slug: /zh/troubleshoot/fastgpt-fix-dynamic-web-scrape
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1801
source_type: GitHub issue
---

# 解决FastGPT导入动态渲染网页内容抓取失败的问题

## 现象
导入网页链接时，无法有效提取依赖纯前端渲染（数据包含在script标签中）的网站内容，例如https://tenancy.dev这类站点。

## 可能原因
现有网页抓取逻辑未执行JavaScript渲染网页源代码，导致无法获取动态生成的页面内容。

## 排查步骤
1. 确认待抓取的网页是否为纯前端渲染类型，可通过查看页面源代码，检查是否存在包含数据的script标签。
2. 检查当前FastGPT的网页抓取配置。
3. 确认是否启用了JavaScript渲染相关的处理逻辑。

## 解决与验证
配置使用puppeteer或类似库处理网页源代码，执行JavaScript渲染页面，再将渲染后的结果转换为Markdown格式。导入https://tenancy.dev这类动态渲染页面，确认可正确提取完整内容。

> 来源: [FastGPT GitHub issue #1801](https://github.com/labring/FastGPT/issues/1801)
