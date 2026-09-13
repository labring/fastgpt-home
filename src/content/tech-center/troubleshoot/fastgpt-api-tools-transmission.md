---
title: 解决FastGPT API调用时tools参数无法透传的问题
slug: /zh/troubleshoot/fastgpt-api-tools-transmission
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5877
source_type: GitHub issue
---

# 解决FastGPT API调用时tools参数无法透传的问题

## 现象
通过API调用FastGPT简单应用时，若传递tools参数，该参数无法透传给模型厂商，无法接收到tool_call调用命令。直接调用模型厂商的API，可正常获取tool_call命令。用户表示自身代码未做改动，直接调用模型厂商API时功能正常。

## 可能原因
暂未明确具体触发原因，需结合实际调用链路、配置参数与部署环境进行排查确认，目前无官方公开的明确归因说明。

## 排查步骤
1. 确认调用FastGPT API时，tools参数的传递格式、内容是否符合规范要求。
2. 对比直接调用模型厂商API与FastGPT API的参数差异，检查是否存在参数遗漏、格式错误或传递逻辑异常。
3. 查看FastGPT的运行日志，确认是否存在与参数透传相关的异常报错信息。
4. 核对当前使用的FastGPT版本为V4.9.11或V4.13.1，确认是否存在版本相关的已知问题。

## 解决与验证
当前无官方公开的快速解决方案。可通过以下方式推进排查与验证：
1. 再次检查tools参数的传递格式与内容，确保符合FastGPT API的调用要求。
2. 收集完整的调用日志、配置信息与复现步骤，提交至项目仓库获取官方协助。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5877)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
