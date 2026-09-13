---
title: 解决FastGPT通过OneAPI调用大模型工具时出现的报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-tool-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3716
source_type: GitHub issue
---

# 解决FastGPT通过OneAPI调用大模型工具时出现的报错问题

## 现象
在FastGPT 4.8.20-fix2私有部署版本中，当使用通过OneAPI配置的大模型时，无法正常使用工具功能，调用时弹出报错文本"模型流响应为空，请检查模型流输出是否正常"。若直接连接模型服务配置大模型，则不会出现该报错。

## 可能原因
暂未明确具体触发原因，需结合实际部署环境与配置细节排查，推测可能与OneAPI的流输出配置、响应格式或返回参数有关。

## 排查步骤
1. 确认当前部署的FastGPT版本为4.8.20-fix2私有部署版本。
2. 分别测试直接连接模型服务与通过OneAPI连接的大模型工具调用功能，确认仅通过OneAPI配置时出现指定报错。
3. 检查OneAPI平台中对应大模型的配置参数，确认流输出相关设置是否符合FastGPT的调用要求。
4. 查看FastGPT系统日志，提取与该报错相关的详细日志信息，辅助排查。

## 解决与验证
若通过排查确认OneAPI的流输出配置或响应格式不符合FastGPT的调用要求，调整对应配置后重新测试工具调用功能。验证标准为使用通过OneAPI配置的大模型执行工具调用，确认不再弹出"模型流响应为空，请检查模型流输出是否正常"的报错，且工具可正常完成调用流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3716)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
