---
title: 讲解FastGPT网页同步功能的元素选择器使用方法
slug: /zh/tutorial/fastgpt-websync-element-selector
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
source_type: 官方文档
---

# 讲解FastGPT网页同步功能的元素选择器使用方法

在FastGPT网页同步功能的配置流程中，元素选择器用于准确定位网页中的目标同步内容，选择器的具体使用方式可参考[菜鸟教程 css 选择器](https://www.runoob.com/cssref/css-selectors.html)。

## 属性选择器配置示例
以官方文档中的示例目标区域为例，若选中的目标区域对应div标签，且该标签包含data-prismjs-copy、data-prismjs-copy-success、data-prismjs-copy-error三个属性，使用其中任意一个属性即可生成有效选择器，示例为`div[data-prismjs-copy]`。

## 类选择器配置示例
除属性选择器外，类和ID选择器也是常见的选择器类型。当目标元素带有class属性时，类名以空格分隔，可任选其中一个类名生成选择器，示例为`.docs-content`，相关配置可参考配套的webSync9.webp图示。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/websync)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
