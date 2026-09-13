---
title: 解决FastGPT私有部署版Doc2X PDF处理超时问题
slug: /zh/troubleshoot/fastgpt-doc2x-pdf-timeout-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4150
source_type: GitHub issue
---

# 解决FastGPT私有部署版Doc2X PDF处理超时问题

## 现象
使用FastGPT 4.9.0私有部署版处理PDF时，触发超时报错。后续手动检查Doc2X的请求状态，显示该请求实际处理成功。

## 可能原因
部分复杂PDF的Doc2X处理需要更长时间，FastGPT默认的轮询次数不足以覆盖该处理时长，导致提前触发超时错误。

## 排查步骤
1. 确认当前FastGPT版本为4.9.0私有部署版。
2. 检查Doc2X的请求状态，确认请求实际已处理成功。
3. 定位到PDF2text处理逻辑的轮询配置代码，对应路径为packages/plugins/src/Doc2X/PDF2text/index.ts第179行。

## 解决与验证
调整PDF2text处理逻辑中的轮询次数参数，增加轮询次数以覆盖复杂PDF的处理时长。重新提交PDF处理请求，确认不再触发超时错误，且Doc2X请求最终返回成功结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4150)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
