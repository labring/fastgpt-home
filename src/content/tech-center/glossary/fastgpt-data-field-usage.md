---
title: FastGPT中并行运行节点与文件读取接口的data字段说明
slug: /zh/glossary/fastgpt-data-field-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run
source_type: 官方文档
---

# FastGPT中并行运行节点与文件读取接口的data字段说明

## 一句话定义
data字段是FastGPT中用于承载业务返回结果的标准数据载体，应用于并行运行节点输出与文件读取接口响应两个核心场景。

## 在 FastGPT 里怎么用
在并行运行节点的输出参数中，完整结果为与输入数组一一对应的对象数组，每项包含success、message、data三个字段。任务成功时success为true，data为对应输出值；任务失败时success为false，message为错误提示内容，data为null。并行运行节点的成功结果为仅包含执行成功任务输出的数组，按输入顺序排列，下游节点通常直接使用该字段。在文件读取接口的响应示例中，调用/v1/file/read接口后，响应体的data字段包含url字段，值为可直接打开的文件访问链接。

## 容易搞错的地方
一是混淆并行运行节点的成功结果与完整结果的结构，成功结果直接为任务输出数组，无success、message、data层级，无需额外提取data字段。二是误以为文件读取接口的data字段包含更多业务数据，实际仅包含url字段，无其他额外内容。三是忽略并行运行节点的完成状态字段，该字段可用于分支判断，包含success、partial_success、failed三种状态。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
