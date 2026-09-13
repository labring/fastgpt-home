---
title: 调整FastGPT中MongoDB全文检索分词策略配置方法
slug: /zh/troubleshoot/fastgpt-mongodb-fulltext-search-token-adjust
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3938
source_type: GitHub issue
---

# 调整FastGPT中MongoDB全文检索分词策略配置方法

## 现象
使用MongoDB作为全文检索存储介质搭建AI客服时，知识语料中的专有名词、型号被错误分词，导致专有名词的检索召回结果未达预期。

## 可能原因
MongoDB默认的全文检索分词策略未针对专有名词进行优化，无法完整保留专有名词的形态，进而影响专有名词的检索召回效果。

## 排查步骤
1. 确认当前使用的全文检索存储介质为MongoDB。
2. 查看MongoDB中用于全文检索的表的分词结果，定位被错误拆分的专有名词。
3. 确认是否需要调整分词规则或更换全文检索存储方案。

## 解决与验证
可通过两种路径解决问题。第一，调整MongoDB的全文检索分词策略，适配专有名词的完整保留需求。第二，更换为支持自定义分词词库的全文检索存储介质。完成调整或更换后，重新检索包含专有名词的语料，确认专有名词可被完整召回，验证调整效果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3938)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
