---
title: 解决FastGPT私有部署知识库检索结果不精确的问题
slug: /zh/troubleshoot/fastgpt-knowledge-retrieval-troubleshooting-2
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/313
source_type: GitHub issue
---

# 解决FastGPT私有部署知识库检索结果不精确的问题

## 现象
FastGPT私有部署场景下，知识库相关内容无法实现精确检索。例如知识库中存在大黄花鱼营养成分的原文，但检索返回结果未匹配到该内容，常规检索可正常获取目标内容。

## 可能原因
已知潜在原因为知识库文本总量较大，导致检索匹配逻辑无法精准定位目标内容。其余潜在因素需按实际环境确认。

## 排查步骤
1. 确认当前部署的FastGPT为私有部署版本。
2. 统计当前关联知识库的总文本数据量。
3. 核对检索关键词与知识库内目标文本的匹配程度。
4. 对比常规检索与知识库检索的执行结果差异。

## 解决与验证
针对知识库文本量较大的情况，可尝试优化检索相关的配置参数，参数值需按实际环境确认。使用原检索关键词再次执行检索，确认是否能匹配到目标文本内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/313)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
