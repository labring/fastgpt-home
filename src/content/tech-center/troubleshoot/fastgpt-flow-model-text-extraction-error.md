---
title: 解决FastGPT私有部署中部分模型无法提取文本的问题
slug: /zh/troubleshoot/fastgpt-flow-model-text-extraction-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1055
source_type: GitHub issue
---

# 解决FastGPT私有部署中部分模型无法提取文本的问题

## 现象
同一FastGPT流程编排对话中，使用通义千问模型可正常提取文本，使用百度、智谱相关模型无法获取文本，且两类模型的config.json配置参数完全一致。

## 可能原因
目前无明确指向性的故障原因，需结合实际运行环境的调用日志、接口细节确认，可能与模型接口适配逻辑、参数传递规则相关。

## 排查步骤
1. 导出流程编排脚本与config.json文件，对比可正常运行与异常模型的配置项。
2. 核对流程中配置的模型标识与config.json中定义的模型标识是否完全匹配。
3. 查看模型调用的详细日志，提取接口请求与返回的具体信息。
4. 验证异常模型的API接口连通性与权限配置。

## 解决与验证
1. 修正配置项中不匹配的内容，更新流程配置或重新部署相关服务。
2. 再次执行流程编排对话，验证异常模型是否可正常提取文本。
3. 确认所有配置项与可正常运行的模型配置保持一致。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1055)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
