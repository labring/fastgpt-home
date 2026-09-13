---
title: 解决FastGPT知识库问题优化的默认模型调用逻辑异常
slug: /zh/troubleshoot/fastgpt-knowledgebase-question-optimize-model-logic
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1530
source_type: GitHub issue
---

# 解决FastGPT知识库问题优化的默认模型调用逻辑异常

## 现象
在FastGPT v4.8私有部署版本中，当知识库开启问题优化功能且未手动选择AI模型时，系统会默认使用config.json配置的第一个模型，未遵循用户的配置预期。

## 可能原因
该问题由知识库问题优化功能的默认模型调用逻辑缺陷导致，逻辑未校验是否已配置专属AI模型，直接读取config.json中的首个模型，覆盖或忽略用户的手动配置项。

## 排查步骤
1. 登录FastGPT私有部署实例，进入目标知识库的管理页面。
2. 开启知识库的问题优化功能，确认未手动选择对应的AI模型。
3. 查看config.json文件，确认其中配置的模型列表及首个模型的信息。
4. 触发知识库问答流程，观察实际调用的模型是否为config.json的首个模型。

## 解决与验证
1. 为知识库的问题优化功能手动选择专属的AI模型，避免依赖默认调用逻辑。
2. 再次触发知识库问答流程，验证实际调用的模型为手动选择的模型。
3. 若需从根源调整逻辑，需修改对应代码，将问题优化功能的AI模型设为必选配置项，移除直接读取config.json首个模型的默认行为。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1530)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
