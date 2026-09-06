---
title: 解决FastGPT工作流非流式输出时自建模型stream参数不匹配报错
slug: /zh/troubleshoot/fastgpt-workflow-stream-param-mismatch
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5140
source_type: GitHub issue
---

# 解决FastGPT工作流非流式输出时自建模型stream参数不匹配报错

## 现象
该问题出现在FastGPT私有部署版本v4.9.14中，工作流内AI对话模块设置为非流式输出，但调用自建模型的请求仍携带stream=True参数，导致工作流执行报错。

## 可能原因
工作流的非流式输出配置未正确同步至自建模型的请求参数，导致stream参数被强制设置为True，与配置的非流式输出要求不匹配。

## 排查步骤
1. 登录FastGPT私有部署实例，进入目标工作流的编辑页面。
2. 找到AI对话模块，确认输出模式是否配置为非流式。
3. 查看自建模型的调用请求详情，核对stream参数的实际取值。
4. 对比工作流配置与实际请求参数，确认参数不一致的环节。

## 解决与验证
1. 调整工作流配置，确保非流式输出模式下，调用自建模型的stream参数设为False。
2. 保存工作流配置并重新触发运行。
3. 确认工作流不再触发报错，且自建模型的返回结果符合非流式输出的预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5140)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
