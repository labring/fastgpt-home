---
title: 解决FastGPT开启思考模式后非流请求插件执行异常问题
slug: /zh/troubleshoot/fastgpt-non-stream-plugin-exception
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4782
source_type: GitHub issue
---

# 解决FastGPT开启思考模式后非流请求插件执行异常问题

## 现象
使用FastGPT v4.9.6私有部署版本，调用deepseek r1模型并开启思考模式，同时配置非流请求插件时，流程的后续节点无法正常执行。用户同时提出需增加超时时间配置项。

## 可能原因
暂未明确具体技术根因，需按实际环境确认。已知触发场景为开启deepseek r1思考模式且使用非流请求插件的组合操作。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.9.6。
2. 按照复现步骤操作：调用deepseek r1模型并开启思考模式，配置非流请求插件，执行整体流程。
3. 查看系统执行日志，确认是否存在节点执行中断的相关报错信息。
4. 核对插件配置与模型调用参数是否符合官方文档要求。

## 解决与验证
针对当前触发场景，可尝试调整插件请求的超时相关参数（需按系统实际配置路径操作）。验证流程为：重新配置相同的流程，使用deepseek r1思考模式与非流请求插件，执行后观察后续节点是否正常执行。若需调整超时时间，需按系统实际配置项进行修改。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4782)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
