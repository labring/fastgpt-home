---
title: FastGPT分享页面配置页面语言的参数与使用说明
slug: /zh/glossary/fastgpt-share-lang-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3526
source_type: 官方文档
---

# FastGPT分享页面配置页面语言的参数与使用说明

## 一句话定义
lang是FastGPT分享页面中用于配置页面展示语言的参数，支持通过路径前缀或查询字符串两种方式传入，可适配国际化场景。

## 在 FastGPT 里怎么用
该配置仅适用于FastGPT的分享页面，支持两种配置方式。第一种为路径前缀方式，将语言标识作为URL的第一级路径，示例格式为`https://xx.com/en/chat/share?shareId=xxx`，其中en代表英文，可让分享页面展示为英文界面。第二种为查询参数方式，在分享页面的URL末尾添加`lang=语言标识`的参数，示例格式为`https://xx.com/chat/share?shareId=xxx&lang=en`，同样可指定页面展示语言。根据issue内容，该功能在FastGPT 4.6.7左右的版本中可正常使用，当前最新版本暂不支持该配置逻辑。

## 容易搞错的地方
首先需注意版本兼容性，该功能仅在4.6.7左右的版本可用，其他版本可能无法生效，使用前需确认当前FastGPT的版本范围。其次仅可选择路径前缀或查询参数其中一种配置方式，不可同时混用两种方式，否则可能导致语言配置失效。最后传入的语言标识需符合通用的ISO 639-1格式，例如en代表英文、zh代表简体中文，需避免使用非标准的语言标识，否则可能无法正确切换页面语言。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3526)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
