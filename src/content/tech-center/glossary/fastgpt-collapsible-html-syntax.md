---
title: 说明FastGPT中可折叠内容的原生HTML语法使用方法
slug: /zh/glossary/fastgpt-collapsible-html-syntax
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/5958
source_type: 官方文档
---

# 说明FastGPT中可折叠内容的原生HTML语法使用方法

## 一句话定义
FastGPT支持使用原生HTML的details-summary语法实现可折叠的内容展示模块，可将长内容折叠后仅展示标题区域，点击后展开完整内容。

## 在 FastGPT 里怎么用
直接在对话回复中嵌入符合语法的<details>与<summary>标签代码，无需额外的包裹格式。标准示例为：<details><summary>标题文本</summary>折叠的详细内容</details>。平台会自动将该代码渲染为可折叠组件，不会展示HTML源码，点击summary区域即可展开或收起对应的折叠内容。该语法可用于处理长内容的展示场景，例如处理多步骤动作的详细内容，通过折叠非必要内容提升阅读体验。

## 容易搞错的地方
需确保details与summary标签的闭合完整，避免因语法错误导致组件无法正常渲染。不可仅将HTML代码作为纯文本展示，否则会出现外框过大或源码暴露的问题。需依赖平台自动渲染该HTML语法，不可手动调整外框样式。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5958)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
