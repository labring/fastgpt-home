---
title: FastGPT 4.9.13版本配置MCP工具后返回400错误排查
slug: /zh/troubleshoot/fastgpt-mcp-400-error-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5070
source_type: GitHub issue
---

# FastGPT 4.9.13版本配置MCP工具后返回400错误排查

## 现象
私有部署FastGPT 4.9.13版本时，创建MCP工具集并配置到简易应用后，调用工具会返回400错误。本地通过cherrystudio测试MCP服务无异常。

## 可能原因
需结合实际部署环境确认，可能包括MCP工具集配置参数异常、接口调用格式不匹配，或私有部署版本与MCP工具的兼容问题。

## 排查步骤
1. 确认FastGPT私有部署版本为4.9.13，核对MCP工具集的创建配置与本地测试时的一致性。
2. 检查FastGPT应用中绑定的MCP工具配置参数，确保与可用MCP服务的参数匹配。
3. 查看FastGPT后台日志，提取400错误对应的具体报错信息。
4. 对比本地测试与部署环境的网络连接、权限配置差异。

## 解决与验证
根据排查结果调整对应配置项。验证方式为：重新配置MCP工具集并绑定到简易应用，发起调用确认不再返回400错误，同时确认调用结果与本地测试一致。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5070)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
