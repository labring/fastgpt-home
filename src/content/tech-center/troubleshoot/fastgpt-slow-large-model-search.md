---
title: 解决FastGPT中大模型关联知识库时的速度缓慢问题
slug: /zh/troubleshoot/fastgpt-slow-large-model-search
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1335
source_type: GitHub issue
---

# 解决FastGPT中大模型关联知识库时的速度缓慢问题

## 现象
FastGPT单独聊天功能运行速度正常，使用小模型关联知识库进行搜索时速度较快，但仅在使用大模型关联知识库时出现运行速度缓慢的问题。

## 可能原因
目前无明确已知的关联原因，需结合实际部署环境进行排查确认。

## 排查步骤
1.  对比小模型与大模型的配置差异，记录相关的配置项内容。
2.  检查知识库关联后的搜索流程，确认无未配置或异常的耗时环节。
3.  确认密钥可正常使用，无调用限额或限流限制。

## 解决与验证
根据排查出的具体问题调整对应环节或配置参数。再次使用大模型关联知识库执行搜索操作，确认运行速度是否恢复至正常水平。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1335)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
