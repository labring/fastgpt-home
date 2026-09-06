---
title: FastGPT并行运行节点的输出参数与结果说明
slug: /zh/tutorial/parallel-run-node-output-params
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run
source_type: 官方文档
---

# FastGPT并行运行节点的输出参数与结果说明

并行运行节点执行批量任务后，会生成结构化的输出结果，用于传递至下游流程。不同的输出字段对应不同的使用场景，需根据业务需求选择合适的字段获取任务结果。这些字段无需额外转换，即可直接接入后续的节点逻辑，满足快速搭建工作流的需求。

### 输出参数详情
| 参数     | 类型            | 说明                                                                                                                                                    |
| -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 成功结果 | `Array<any>`    | 只包含执行成功的任务输出，按输入顺序排列；失败的那些会被过滤掉。下游通常用这个字段                                                                  |
| 完整结果 | `Array<object>` | 与输入数组**一一对应**，每项形如 `{ success, message, data }`。成功时 `success=true`、`data` 是输出值；失败时 `success=false`、`message` 是错误提示、`data` 为 `null` |
| 完成状态 | `string`        | 整体状态：`success`（全部成功）、`partial_success`（部分失败）、`failed`（全部失败），可用于分支判断                                                    |

成功结果字段仅保留执行成功的任务输出，按输入顺序排列，失败任务的输出会被自动过滤，该字段是下游节点最常用的输入数据源。使用成功结果字段可快速获取有效任务输出，无需额外过滤失败任务，可直接用于下游流程的常规调用。

完整结果字段与输入数组一一对应，每项形如 `{ success, message, data }`。成功时 `success=true`、`data` 是输出值；失败时 `success=false`、`message` 是错误提示、`data` 为 `null`。完整结果字段与输入任务数组一一对应，可用于查看每个任务的具体执行情况，包括成功状态、错误提示与输出数据，适合排查单个任务的执行异常。

完成状态字段为字符串类型，可表示三种整体执行状态：`success`（全部成功）、`partial_success`（部分失败）、`failed`（全部失败），可用于分支判断。完成状态字段可反映整体任务的执行情况，包含全部成功、部分失败、全部失败三种取值，可作为分支判断的依据，触发对应的后续处理逻辑，根据不同的整体状态调整后续的执行流程。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
