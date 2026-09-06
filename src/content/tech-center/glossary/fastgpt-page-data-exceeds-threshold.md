---
title: 解释FastGPT中页面数据量超过阈值的警告场景
slug: /zh/glossary/fastgpt-page-data-exceeds-threshold
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3490
source_type: 官方文档
---

# 解释FastGPT中页面数据量超过阈值的警告场景

## 一句话定义
exceeds在FastGPT中特指页面加载数据量超过128KB阈值的警告触发状态。

## 在FastGPT里怎么用
该警告出现在FastGPT 4.8.16及以上版本中。在FastGPT运行过程中，当单个页面加载的数据量超过128KB阈值时，会触发对应警告。该警告会明确标注触发警告的页面路径、数据量大小以及阈值数值，同时提示该数据量可能降低系统性能。具体报错文本格式为：`data for page "[页面路径]" is [数据量] kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.` 已记录的触发场景包括数据集详情页与首页，对应实测报错分别为`data for page "/dataset/detail" is 175 kB which exceeds the threshold of 128 kB` 与 `data for page "/" is 150 kB which exceeds the threshold of 128 kB`。

## 容易搞错的地方
部分使用者会将该警告误认为是FastGPT系统本身的功能限制，实际该提示为页面数据量过大触发的性能预警。此外，需注意该警告的触发阈值固定为128KB，目前无公开的自定义调整阈值的说明。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3490)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
