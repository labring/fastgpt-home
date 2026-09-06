---
title: 解决FastGPT多工具依赖调用时参数未正确替换的问题
slug: /zh/troubleshoot/fastgpt-multi-tool-parameter-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5671
source_type: GitHub issue
---

# 解决FastGPT多工具依赖调用时参数未正确替换的问题

## 现象
私有部署版本4.12.3的FastGPT中，创建应用并配置自定义MCP Server，使用千问系列模型且functionCall设为false时，多工具依赖调用会出现回答中断的情况，工具参数未被正确替换。例如，调用查询本月最新文章的工具前，需先调用另一工具获取当前月份，但该流程无法正常完成，参数替换失败。

## 可能原因
当前无明确公开根因，可能与functionCall关闭状态下的多工具链式调用逻辑、参数传递机制相关，具体根因需结合实际部署环境与日志进一步确认。

## 排查步骤
1. 确认FastGPT私有部署版本为4.12.3，核对模型配置中functionCall参数的设置状态。
2. 检查自定义MCP Server的配置是否正确，确保工具间的参数传递链路无配置错误。
3. 查看应用运行日志，定位工具调用中断时的具体报错信息。
4. 复现多工具依赖调用场景，记录每次工具调用的参数与返回结果。

## 解决与验证
首先调整functionCall参数的配置，确认是否符合模型支持的工具调用模式。随后重新配置自定义MCP Server，确保工具间的参数传递逻辑正常。最后复现多工具依赖调用场景，验证工具参数能否正确替换，确认调用流程不再中断，回答正常生成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5671)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
