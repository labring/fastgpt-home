---
title: 说明FastGPT并行运行节点的输出参数与使用方法
slug: /zh/glossary/fastgpt-parallel-run-output
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run
source_type: 官方文档
---

# 说明FastGPT并行运行节点的输出参数与使用方法

## 一句话定义
并行运行节点是FastGPT工作流中的一类节点，可同时执行多个子任务，其输出包含三类预设参数。

## 在 FastGPT 里怎么用
该节点属于工作流节点配置项，输入为任务数组。运行后生成三类输出参数：成功结果为仅包含执行成功的任务输出的数组，按输入顺序排列；完整结果为与输入数组一一对应的对象数组，每项包含`success`、`message`、`data`字段，成功时`success=true`、`data`为输出值，失败时`success=false`、`message`为错误提示、`data`为`null`；完成状态为整体执行状态，取值包括`success`（全部成功）、`partial_success`（部分失败）、`failed`（全部失败），可用于后续分支判断。下游环节通常使用成功结果字段。

## 容易搞错的地方
完整结果会保留所有输入任务的对应条目，即使任务执行失败也不会过滤，与输入数组严格一一对应；成功结果仅保留成功任务的输出，失败任务的内容不会被包含在内；完成状态的取值必须为指定的三个字符串，不可自定义或修改。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
