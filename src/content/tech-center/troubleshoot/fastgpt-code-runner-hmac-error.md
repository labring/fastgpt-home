---
title: 解决FastGPT私有部署中代码运行工具的createHmac报错问题
slug: /zh/troubleshoot/fastgpt-code-runner-hmac-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3952
source_type: GitHub issue
---

# 解决FastGPT私有部署中代码运行工具的createHmac报错问题

## 现象
在FastGPT私有部署版本v4.8.22的代码运行工具中使用createHmac时，出现报错Cannot find name 'createHmac'.(2304)。

## 可能原因
该报错为TypeScript语法检查报错，可能与代码运行工具的内置API支持情况、代码导入逻辑有关。

## 排查步骤
1.  检查代码中createHmac的拼写是否正确，确认无语法错误。
2.  确认当前FastGPT部署版本为v4.8.22，匹配问题场景。
3.  核对已使用的key是否与当前部署环境的配置一致。
4.  检查代码运行工具的运行环境是否支持该API的调用。

## 解决与验证
1.  若为代码导入缺失，需添加正确的依赖导入语句。
2.  若为代码运行工具环境限制，需确认环境配置是否允许调用相关API。
3.  修改代码后重新执行，确认报错Cannot find name 'createHmac'.(2304)不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3952)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
