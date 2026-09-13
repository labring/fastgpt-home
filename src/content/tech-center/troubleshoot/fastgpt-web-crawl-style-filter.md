---
title: 解决FastGPT网页抓取时body内style标签未过滤导致数据干扰的问题
slug: /zh/troubleshoot/fastgpt-web-crawl-style-filter
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1815
source_type: GitHub issue
---

# 解决FastGPT网页抓取时body内style标签未过滤导致数据干扰的问题

## 现象
网页抓取后，body内的style标签未被过滤。使用自定义选择器提取内容时，此类标签会被归入正文，造成数据干扰。示例目标链接为https://www.intl.zju.edu.cn/zh-hans/about/campus-introduce，使用选择器main时可复现该问题。

## 可能原因
当前FastGPT的网页抓取过滤逻辑未覆盖body内style标签的过滤处理，导致此类标签被纳入提取的正文内容。

## 排查步骤
1. 访问目标网页，检查body标签内是否存在未被其他容器包裹的style标签。
2. 在FastGPT中配置网页抓取工具，使用自定义选择器（如main）执行内容提取操作。
3. 查看提取得到的正文内容，确认是否包含style标签的代码片段。

## 解决与验证
需在FastGPT的网页抓取逻辑中添加对body内style标签的过滤规则。验证时，重新抓取目标网页并使用相同的自定义选择器，确认提取的正文内容不再包含style标签代码。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1815)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
