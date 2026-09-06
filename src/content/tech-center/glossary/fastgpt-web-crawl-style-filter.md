---
title: 解决FastGPT网页抓取中body内style标签干扰正文的问题
slug: /zh/glossary/fastgpt-web-crawl-style-filter
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1815
source_type: 官方文档
---

# 解决FastGPT网页抓取中body内style标签干扰正文的问题

## 一句话定义
该功能指在FastGPT网页抓取流程中，自动过滤页面body标签内的style标签，避免此类样式代码混入提取的正文内容，提升数据提取的准确性。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该功能应用于网页抓取环节，当使用自定义选择器提取网页内容时自动生效。用户可通过配置目标网页链接与自定义选择器来使用该功能。参考示例配置为：目标网页链接为https://www.intl.zju.edu.cn/zh-hans/about/campus-introduce，搭配的自定义选择器为main，可用于验证该功能的实际效果。该功能无需额外开启独立开关，会在网页抓取流程中自动执行过滤操作。

## 容易搞错的地方
使用自定义选择器进行网页抓取时，部分用户会误以为自定义选择器会过滤掉所有选择器匹配范围外的内容，但实际上body内的style标签不受自定义选择器的限制，会被一并提取至正文数据中，造成数据冗余干扰。此外，部分用户可能混淆style标签与其他页面元素的过滤规则，误以为该功能会过滤所有页面内的style标签，实则仅针对body标签内的style标签生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1815)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
