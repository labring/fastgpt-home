---
title: FastGPT 工作流节点能力速查表
slug: /zh/reference/workflow-nodes-reference
page_type: 基准数据页
source: https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/core/workflow/template/system
source_type: 官方文档
meta_title: FastGPT 工作流节点能力速查表｜FastGPT 技术中心
meta_description: 查阅工作流节点能力速查表，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/中文-fastgpt.cn/reference/workflow-nodes-reference.md
source_sha256: 5d83f5221c21bf06cdea9a9296366c8a62880da5ce086ab1112f01efab5b196d
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT 工作流节点能力速查表

本表对应 FastGPT 开发分支快照 5957d06（2026-09-07）。开发分支包含尚未进入正式版本的能力；部署时请核对所用版本。

## 这张表怎么用

本页把开源仓库中定义的 34 个工作流节点按分类逐条列出，给出节点类型标识、能否作为工具被调用、输入与输出参数的数量，以及官方文档路径。编排工作流前可用它确认某个能力对应哪个节点、需要配置几个参数；排查配置报错时可用「节点类型标识」在导出的工作流 JSON 里定位节点。清单取自节点定义文件。

## 各列的含义

| 列 | 含义 |
| --- | --- |
| 节点类型标识 | 定义中的 `flowNodeType`，导出的工作流 JSON 里用它标识节点，升级时需核对兼容性 |
| 名称 | 界面中显示的节点名 |
| 可作工具 | 「是」表示该节点可被工具调用节点作为工具挂载 |
| 输入 / 必填 | 该节点定义的输入参数总数，以及其中必填的数量 |
| 输出 | 该节点定义的输出参数数量 |
| 官方文档 | 定义中登记的文档路径，空白表示定义中未登记 |

## 使用这张表之前要知道的三件事

**1. 「引入版本」这一列只有 9 个节点有登记，且口径不一。**

| 节点类型标识 | 名称 | 登记的引入版本 | 说明 |
| --- | --- | --- | --- |
| `agent` | Agent | `4.17.0` | 该版本尚未随正式版本发布 |
| `chatNode` | AI 对话 | `4.9.7` | — |
| `classifyQuestion` | 问题分类 | `4.9.2` | — |
| `comment` | — | `4811` | 使用了旧的编号格式 |
| `contentExtract` | 文本内容提取 | `4.9.2` | — |
| `datasetSearchNode` | 知识库搜索 | `4.9.2` | — |
| `emptyNode` | — | `481` | 使用了旧的编号格式 |
| `toolCall` | 工具调用 | `4.9.2` | — |
| `readFiles` | Read files | `4.9.2` | — |

其余 25 个节点的定义中没有这个字段，无法据此判断它从哪个版本开始可用。要确认某个节点在自己的版本里是否存在，可在部署实例的节点面板中直接查看。

其中 1 个节点登记的版本高于当前正式版 `4.16.2`，属于尚未随正式版本发布的能力。

另有 2 个节点使用了旧的编号格式，与语义化版本号不能直接比较。

**2. 有 6 个节点在定义中没有可读名称，本表按缺失处理。**

| 节点类型标识 | 分类 |
| --- | --- |
| `appModule` | 其他 |
| `comment` | 系统输入 |
| `emptyNode` | 系统输入 |
| `pluginModule` | 其他 |
| `tool` | 其他 |
| `toolSet` | 其他 |

这些多为系统内部节点或占位节点，通常不出现在节点面板中。

**3. 参数数量按定义中声明的条目计，与界面中实际显示的数量可能不同。**

部分参数按前置配置动态显示或隐藏，界面上看到的数量会少于表中数值；输入参数数量最多的节点有 33 个参数，绝大多数场景只需配置其中的必填项。

## AI 能力（8 个节点）

| 节点类型标识 | 名称 | 可作工具 | 输入 / 必填 | 输出 | 官方文档 |
| --- | --- | --- | --- | --- | --- |
| `chatNode` | AI 对话 | 是 | 22 / 0 | 4 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/ai_chat) |
| `agent` | Agent | — | 33 / 0 | 2 | — |
| `toolCall` | 工具调用 | 是 | 20 / 0 | 2 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/tool) |
| `stopTool` | 工具调用终止 | — | 0 / 0 | 0 | — |
| `contentExtract` | 文本内容提取 | 是 | 5 / 1 | 3 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/content_extract) |
| `datasetSearchNode` | 知识库搜索 | 是 | 14 / 1 | 2 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/dataset_search) |
| `toolParams` | 自定义工具变量 | 是 | 0 / 0 | 0 | — |
| `classifyQuestion` | 问题分类 | 是 | 5 / 0 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/question_classify) |

## 工具（10 个节点）

| 节点类型标识 | 名称 | 可作工具 | 输入 / 必填 | 输出 | 官方文档 |
| --- | --- | --- | --- | --- | --- |
| `httpRequest468` | HTTP 请求 | 是 | 10 / 3 | 4 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http) |
| `code` | 代码运行 | 是 | 5 / 2 | 5 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2) |
| `ifElseNode` | 判断器 | 是 | 1 / 0 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/tfswitch) |
| `parallelRun` | 并行执行 | 是 | 7 / 3 | 3 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/parallel_run) |
| `loopRunBreak` | 循环终止 | — | 0 / 0 | 0 | — |
| `loopRun` | 循环节点 | 是 | 7 / 2 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/loop_run) |
| `answerNode` | 指定回复 | 是 | 1 / 1 | 0 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/reply) |
| `textEditor` | 文本拼接 | 是 | 1 / 1 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/text_editor) |
| `readFiles` | 读取文件 | 是 | 1 / 1 | 3 | — |
| `variableUpdate` | 更新变量 | 是 | 1 / 0 | 0 | — |

## 系统输入（8 个节点）

| 节点类型标识 | 名称 | 可作工具 | 输入 / 必填 | 输出 | 官方文档 |
| --- | --- | --- | --- | --- | --- |
| `nestedStart` | 开始 | — | 2 / 1 | 1 | — |
| `loopRunStart` | 循环开始 | — | 3 / 0 | 3 | — |
| `pluginInput` | 插件输入 | — | 0 / 0 | 0 | — |
| `pluginOutput` | 插件输出 | — | 0 / 0 | 0 | — |
| `workflowStart` | 流程开始 | — | 1 / 0 | 1 | — |
| `nestedEnd` | 结束 | — | 1 / 1 | 0 | — |
| `comment` | — | — | 2 / 0 | 0 | — |
| `emptyNode` | — | — | 0 / 0 | 0 | — |

## 交互（2 个节点）

| 节点类型标识 | 名称 | 可作工具 | 输入 / 必填 | 输出 | 官方文档 |
| --- | --- | --- | --- | --- | --- |
| `userSelect` | 用户选择 | 是 | 2 / 0 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/user-selection) |
| `formInput` | 表单输入 | 是 | 2 / 0 | 1 | — |

## 其他（6 个节点）

| 节点类型标识 | 名称 | 可作工具 | 输入 / 必填 | 输出 | 官方文档 |
| --- | --- | --- | --- | --- | --- |
| `datasetConcatNode` | 知识库搜索引用合并 | — | 2 / 0 | 1 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/knowledge_base_search_merge) |
| `customFeedback` | 自定义反馈 | 是 | 1 / 1 | 0 | [节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/custom_feedback) |
| `appModule` | — | — | 0 / 0 | 0 | — |
| `pluginModule` | — | 是 | 0 / 0 | 0 | — |
| `tool` | — | 是 | 0 / 0 | 0 | — |
| `toolSet` | — | 是 | 0 / 0 | 0 | — |

## 什么情况下这张表会过期

1. **新增节点与参数调整会随版本变化。** 表中数量按定义文件的当前内容计，
   升级后需要重新核对。
2. **商业版可能提供额外节点**，本表只覆盖开源仓库中的定义。
3. **参数数量不代表配置复杂度。** 多数节点的必填项只有一两个，
   其余参数有默认值或按场景启用。
4. **节点类型标识的兼容性应在升级时核对，名称可能调整。** 做程序判断请用节点类型标识。

## 参考资料

- [FastGPT workflow nodes reference — 5957d06](https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/core/workflow/template/system)

## 参数统计口径

参数数量按快照内节点定义的数组项统计，包含共享参数模板；必填数量统计本定义直接声明的 required 标志，共享模板与运行时条件还会影响实际必填项。
