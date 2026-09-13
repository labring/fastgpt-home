---
title: 解决FastGPT私有部署vllm工具调用参数格式不符问题
slug: /zh/troubleshoot/fastgpt-vllm-tool-call-param-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1880
source_type: GitHub issue
---

# 解决FastGPT私有部署vllm工具调用参数格式不符问题

## 现象
使用FastGPT私有部署4.8.5版本，搭配vllm 0.4.3版本部署qwen2-72B-instruction模型时，执行工具调用知识库问答流程，出现参数格式不符合的错误提示。相关报错信息可通过部署日志获取。

## 可能原因
该问题的具体根因需结合实际部署环境与日志确认，已知关联要素包括FastGPT私有部署4.8.5版本、vllm 0.4.3版本、qwen2-72B-instruction模型，以及工具调用知识库问答的业务流程。目前无公开的通用根因结论。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为4.8.5，vllm版本为0.4.3，部署的模型为qwen2-72B-instruction。
2. 复现工具调用知识库问答的操作，记录出现的参数格式不符合提示。
3. 查看相关部署日志，提取具体的错误信息文本。
4. 核对模型调用的参数配置与传递流程，确认参数格式符合当前业务逻辑。

## 解决与验证
目前暂无通用的标准化解决步骤，需根据排查步骤中提取的具体报错文本与配置信息，针对性调整参数格式或相关部署配置。验证方式为重新执行工具调用知识库问答流程，确认参数格式不符合的提示不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1880)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
