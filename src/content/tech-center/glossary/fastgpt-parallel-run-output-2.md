---
title: 说明FastGPT并行运行节点的输出参数与使用规则
slug: /zh/glossary/fastgpt-parallel-run-output-2
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run
source_type: 官方文档
---

# 说明FastGPT并行运行节点的输出参数与使用规则

## 一句话定义
FastGPT并行运行节点的输出为结构化对象，包含多任务并行执行的结果统计与详情数据。

## 在FastGPT里怎么用
该输出包含三个固定参数。成功结果类型为`Array<any>`，仅包含执行成功的任务输出，按输入顺序排列，过滤失败任务，是下游节点常用的输入字段。完整结果类型为`Array<object>`，与输入数组一一对应，每项形如`{ success, message, data }`：成功时`success=true`、`data`为输出值；失败时`success=false`、`message`为错误提示、`data`为`null`。完成状态类型为`string`，取值包括`success`（全部成功）、`partial_success`（部分失败）、`failed`（全部失败），可用于分支判断逻辑。该输出模块位于并行运行节点的输出配置中。

## 容易搞错的地方
部分用户会误以为成功结果的排列顺序是任务执行完成的先后顺序，实际成功结果严格按照原始输入任务的顺序排列。部分场景下会混淆成功结果与完整结果的适用范围，完整结果包含所有输入任务的执行详情，包括失败任务，而成功结果仅保留成功任务的输出。此外，完成状态的取值仅支持官方给定的三个选项，不能随意自定义。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
