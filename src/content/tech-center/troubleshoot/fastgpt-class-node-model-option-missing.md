---
title: 解决FastGPT私有部署版分类节点找不到模型选项的问题
slug: /zh/troubleshoot/fastgpt-class-node-model-option-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5063
source_type: GitHub issue
---

# 解决FastGPT私有部署版分类节点找不到模型选项的问题

## 现象
FastGPT 4.9.13私有部署版本中，分类节点无法找到可用模型选项，AI对话节点可正常加载模型选项。

## 可能原因
该问题暂无公开明确原因，仅可确认出现于指定版本的私有部署环境，且AI对话节点的模型加载功能正常。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.13私有部署版。
2. 验证AI对话节点可正常加载模型选项，确认全局模型配置无异常。
3. 打开分类节点的配置界面，查看可用模型选项列表是否为空。
4. 对比分类节点与AI对话节点的配置参数，排查潜在差异。

## 解决与验证
暂无公开明确的通用解决方法，需结合实际部署环境进行排查。验证该问题是否解决的方式为：进入分类节点配置界面，确认可用模型选项可正常显示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5063)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
