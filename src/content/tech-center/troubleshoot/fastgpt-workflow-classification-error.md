---
title: 解决FastGPT问题分类节点初始化AI模型运行报错问题
slug: /zh/troubleshoot/fastgpt-workflow-classification-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5237
source_type: GitHub issue
---

# 解决FastGPT问题分类节点初始化AI模型运行报错问题

## 现象
FastGPT 4.10.0私有部署版本中，新建工作流并添加问题分类节点，使用初始化的默认AI模型时，执行运行或保存发布操作会触发报错。切换为其他AI模型后操作不再报错，再次切换回初始化的AI模型，操作也可正常执行。

## 可能原因
目前无明确官方说明，需结合实际部署环境确认。

## 排查步骤
1.  确认FastGPT部署版本为4.10.0私有部署版本。
2.  新建工作流并添加问题分类节点，使用默认初始化的AI模型。
3.  执行运行或保存发布操作，记录实际报错日志信息。
4.  切换为其他可用AI模型，再次执行操作确认功能正常。
5.  切换回初始化的AI模型，再次执行操作验证。

## 解决与验证
当出现该报错时，先切换为其他可用AI模型完成操作，再切换回初始化的AI模型即可恢复正常使用。验证方式为重新新建问题分类节点，使用初始化AI模型执行操作，确认无报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5237)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
