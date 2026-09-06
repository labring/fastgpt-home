---
title: 解决FastGPT工作流历史空回复引发的大模型调用报错问题
slug: /zh/troubleshoot/fastgpt-empty-history-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3667
source_type: GitHub issue
---

# 解决FastGPT工作流历史空回复引发的大模型调用报错问题

## 现象
该问题出现在FastGPT私有部署版本4.8.17中。工作流设计过程中，当历史问题的回复因超时导致执行失败时，LLM返回的内容为空。此时系统会将该空内容作为历史上下文传入后续对话，生成形如{"role":"assistant","content":""}的数据。该数据在部分大模型中会触发报错，且根据逻辑，未能正确回复的历史数据不应被计入对话上下文。

## 可能原因
该问题的核心原因是，超时导致的空回复内容被错误地计入了历史对话上下文列表中。当后续调用大模型时，系统会携带该无效的空内容数据，从而触发部分大模型的报错规则。

## 排查步骤
1. 检查工作流的历史对话记录逻辑，确认超时场景下的回复处理是否生成了空content的assistant类型消息。
2. 查看大模型调用时传入的上下文参数，确认是否包含{"role":"assistant","content":""}这类数据。
3. 复现超时场景，观察历史上下文的生成与传递情况，确认空数据是否被带入。

## 解决与验证
解决该问题需在记录历史对话的环节，增加过滤逻辑，排除content为空的assistant回复数据。验证步骤如下：
1. 复现超时场景，确认系统不再生成空content的assistant消息。
2. 调用大模型时，检查传入的上下文参数，确认不再包含{"role":"assistant","content":""}这类数据，原报错消失。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3667)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
