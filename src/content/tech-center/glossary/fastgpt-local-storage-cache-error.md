---
title: FastGPT中local storage缓存store数据报错处理
slug: /zh/glossary/fastgpt-local-storage-cache-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/666
source_type: 官方文档
---

# FastGPT中local storage缓存store数据报错处理

## 一句话定义
FastGPT中的cache指通过zustand/middleware persist实现的缓存机制，该机制利用浏览器local storage存储应用的store数据，实现应用状态的持久化。
## 在FastGPT里怎么用
该缓存机制为FastGPT内置的应用状态持久化方案，默认自动启用，无需手动配置即可生效。其实现依赖于zustand状态管理库的persist中间件，通过浏览器local storage将应用的store数据持久化保存，以便在页面刷新或重新打开后恢复应用状态。当存储的store数据总量超出浏览器local storage的容量限制时，会触发报错文本为Failed to execute 'setItem' on 'Storage'的错误，此时缓存无法继续写入新的应用状态数据。
## 容易搞错的地方
部分使用者可能会忽略浏览器local storage的容量限制，误以为该缓存可无限制存储任意量级的应用store数据，进而触发报错文本为Failed to execute 'setItem' on 'Storage'的错误。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/666)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
