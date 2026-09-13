---
title: 说明FastGPT网页同步功能中的元素选择器使用规则
slug: /zh/glossary/fastgpt-websync-selector
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
source_type: 官方文档
---

# 说明FastGPT网页同步功能中的元素选择器使用规则

## 一句话定义
网页同步元素选择器是FastGPT网页同步功能中用于定位待同步页面指定元素的CSS选择器。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT网页同步功能的配置界面中，需输入对应元素的选择器。支持属性选择器、类选择器、ID选择器三类常见选择器。属性选择器示例：若目标元素为带有data-prismjs-copy属性的div标签，选择器可写为`div[data-prismjs-copy]`。类选择器示例：若目标元素的class属性包含docs-content类名，选择器可写为`.docs-content`。具体选择器的使用方式可参考菜鸟教程CSS选择器官方文档。
## 容易搞错的地方
类名可能包含多个以空格隔开的类名，选择时仅需选取其中一个即可，无需包含所有类名；无需使用包含多个属性的复杂选择器，仅需选取能唯一标识目标元素的选择器即可，避免选择器过于复杂导致匹配失败。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/websync)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
