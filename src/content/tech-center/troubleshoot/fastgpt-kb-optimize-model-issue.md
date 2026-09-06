---
title: 解决FastGPT知识库问题优化的默认模型调用逻辑异常
slug: /zh/troubleshoot/fastgpt-kb-optimize-model-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1529
source_type: GitHub issue
---

# 解决FastGPT知识库问题优化的默认模型调用逻辑异常

## 现象
FastGPT私有部署v4.8版本中，config.json支持配置各模型是否可用于问题优化功能。当知识库开启问题优化且未手动选择AI模型时，系统会默认调用config.json中的第一个模型，忽略了配置项中对模型可用状态的限制，逻辑不符合预期。

## 可能原因
当前系统的知识库问题优化功能，在未手动选择AI模型的场景下，未校验config.json中配置的模型可用规则，直接选取config.json中的首个模型进行调用，导致配置项的限制未生效。

## 排查步骤
1. 确认当前使用的FastGPT为v4.8私有部署版本。
2. 打开config.json文件，查看各模型的问题优化可用配置参数。
3. 登录FastGPT管理后台，进入目标知识库的设置页面，开启问题优化功能，不手动选择AI模型。
4. 触发知识库的问题优化操作，记录实际调用的模型，与config.json中的配置进行对比。

## 解决与验证
解决方式为调整系统的模型选择逻辑，将知识库问题优化的AI模型设置为必选项，或在未手动选择时，仅调用config.json中配置为可用于问题优化的模型，不直接使用首个模型。验证流程如下：
1. 编辑config.json文件，配置各模型的问题优化可用状态。
2. 进入目标知识库的设置页面，开启问题优化功能，不手动选择AI模型。
3. 触发知识库的问题优化操作，检查实际调用的模型是否符合config.json中的配置要求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1529)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
