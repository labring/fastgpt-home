---
title: FastGPT中path参数与页面路由的使用及阈值说明
slug: /zh/glossary/fastgpt-path-usage-threshold
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/612
source_type: 官方文档
---

# FastGPT中path参数与页面路由的使用及阈值说明

## 一句话定义
path在FastGPT中包含两种使用场景，一是一键部署链接中的配置参数，二是页面路由路径标识，用于指定部署资源与标识当前加载页面。

## 在FastGPT里怎么用
一键部署场景中，可通过部署链接的path参数指定部署资源地址，完整格式示例为https://console.w7.cc/api/deploy/thirdparty_cd/redirect?route=/zpk-install?path=https%3A%2F%2Fzpk.w7.cc%2Frespo%2Finfo%2Flabring_fastgpt。页面加载场景中，系统会通过path字段标识当前页面路由，例如`/dataset/detail?datasetId=6770058fa7ceasd52f12&collectionId=67700217ceae0b7122f35&currentTab=dataCard`与`/`。

## 容易搞错的地方
易混淆部署链接中的path参数与页面路由path的不同用途，且当页面path对应的数据加载量超过128kB时，会触发性能警告，提示该页面数据量过大可能降低系统性能。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/612)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
