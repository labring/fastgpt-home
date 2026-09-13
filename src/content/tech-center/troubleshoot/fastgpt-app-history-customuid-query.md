---
title: 解决FastGPT应用历史记录接口无法按customUid查询的问题
slug: /zh/troubleshoot/fastgpt-app-history-customuid-query
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3929
source_type: GitHub issue
---

# 解决FastGPT应用历史记录接口无法按customUid查询的问题

## 现象
对话CRUD模块中的获取某个应用历史记录接口，无法根据用户ID查询对应应用的历史对话记录。在发起会话时可自定义customUid参数，但当前接口仅能返回全部历史记录，需在代码层面通过customUid字段手动过滤，导致查询效率降低。

## 可能原因
目前未明确已知的配置或代码层面的既定原因，需结合实际部署环境与接口源码，确认该接口是否未集成按customUid参数过滤历史记录的逻辑。

## 排查步骤
1. 确认调用获取应用历史记录接口时，是否传入了customUid参数。
2. 核对接口的官方文档或源码，确认该接口是否支持以customUid作为查询条件。
3. 查看接口返回的历史记录数据结构，确认返回结果中包含customUid字段。
4. 对比手动过滤后的结果与接口返回的全部数据，确认过滤逻辑是否正确。

## 解决与验证
若接口未支持按customUid参数查询，需调整接口的查询逻辑，添加customUid作为过滤条件。验证时，传入合法的customUid参数调用接口，确认返回的历史记录仅包含对应用户的对话数据，无需额外在代码层面进行手动过滤。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3929)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
