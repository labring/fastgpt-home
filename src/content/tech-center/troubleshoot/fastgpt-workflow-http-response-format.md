---
title: FastGPT工作流HTTP节点自定义聊天记录响应格式说明
slug: /zh/troubleshoot/fastgpt-workflow-http-response-format
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2403
source_type: GitHub issue
---

# FastGPT工作流HTTP节点自定义聊天记录响应格式说明

## 现象
在FastGPT工作流中，用户尝试使用HTTP方法自定义聊天记录，不清楚该HTTP节点的响应格式，同时对该功能是否有实现方法存在疑问。

## 可能原因
未明确工作流HTTP节点的响应格式要求，且无法直接获取该功能的实现状态说明。

## 排查步骤
1. 梳理工作流中HTTP节点的业务需求，明确需要从响应中提取的具体内容。
2. 查阅FastGPT官方文档及项目README，确认相关功能的说明信息。
3. 确认自身使用的API Key可正常调用相关服务，需按实际环境验证。
4. 检查HTTP请求的配置参数是否符合节点的基础要求，需按实际环境确认。

## 解决与验证
1. 构造HTTP响应时，需参考FastGPT官方文档的通用规范，具体的参数与格式需按实际环境确认。
2. 若需确认该功能的实现状态，可通过查阅官方文档或社区反馈核实，相关信息需按实际环境确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2403)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
