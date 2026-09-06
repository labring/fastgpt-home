---
title: FastGPT并行运行节点failed状态的定义与用法说明
slug: /zh/glossary/fastgpt-parallel-failed-state
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run
source_type: 官方文档
---

# FastGPT并行运行节点failed状态的定义与用法说明

## 一句话定义
failed是FastGPT并行运行节点的整体完成状态枚举值，代表所有并行任务均执行失败的状态。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
failed属于并行运行节点完成状态字段的可选值之一，该字段为string类型，可用于工作流的分支判断逻辑。当所有并行任务执行失败时，该字段会被设置为failed。此外，在数据集导出操作中，export dataset failed是导出失败的报错提示，常见于私有部署版本v4.6.1的Docker镜像环境中。

## 容易搞错的地方
需区分failed与partial_success的适用场景，failed特指所有并行任务均失败的情况，partial_success对应部分任务失败的场景。当出现export dataset failed报错时，需结合Docker运行日志排查具体异常原因。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
