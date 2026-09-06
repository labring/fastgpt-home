---
title: FastGPT私有部署后工作台MCP服务不显示的排错方法
slug: /zh/troubleshoot/fastgpt-mcp-displayed-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4636
source_type: GitHub issue
---

# FastGPT私有部署后工作台MCP服务不显示的排错方法

## 现象
进入FastGPT私有部署版本的工作台后，无法看到MCP服务的相关选项，界面无对应展示内容，相关情况与问题反馈的展示一致。

## 可能原因
当前无明确的通用关联原因，所有可能触发该问题的因素需结合实际部署环境、配置项及运行日志逐一确认，无法通过单一条件直接定位。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.9.6私有部署版本，与问题反馈的版本信息匹配。
2. 确认已配置的密钥可正常使用，且具备访问MCP服务所需的对应权限。
3. 检查工作台界面的相关配置项，确认MCP服务的显示开关是否处于启用状态。
4. 查看FastGPT的部署日志，确认MCP相关的服务进程是否正常启动，无异常报错信息。

## 解决与验证
根据上述排查步骤定位到具体问题后，执行对应的修复操作。修复完成后，重新登录FastGPT工作台，确认MCP服务是否正常显示。若仍未显示，需进一步结合实际部署环境进行更细致的排查，确保所有相关配置与运行状态符合要求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4636)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
