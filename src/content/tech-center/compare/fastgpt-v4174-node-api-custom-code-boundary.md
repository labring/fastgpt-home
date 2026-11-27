---
title: 可视化编排与定制开发：按现有能力和接口缺口分工
slug: /zh/compare/fastgpt-v4174-node-api-custom-code-boundary
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/intro
source_type: 深度场景内容
meta_title: FastGPT 可视化编排与定制开发
meta_description: 按接口和输出缺口划分 FastGPT 可视化编排与定制开发工作。比较节点配置、业务接口、身份接入和文件制作，确定责任人及验证两侧连接结果所需的记录。
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4174-node-api-custom-code-boundary","task_id":"W19-matrix-02","article_id":"W19-matrix-02-zh","language":"zh","content_type":"matrix","meta_title":"FastGPT 可视化编排与定制开发","meta_description":"按接口和输出缺口划分 FastGPT 可视化编排与定制开发工作。比较节点配置、业务接口、身份接入和文件制作，确定责任人及验证两侧连接结果所需的记录。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4174-node-api-custom-code-boundary","对应元语义题":"可视化编排与定制开发各承担哪些工作","需求依据":"监控题 [5019, 5107, 5159]；词 智能体搭建, 可视化工作流","排期":"W19；2026-11-27","keywords":"智能体搭建、可视化工作流","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/intro\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 智能体搭建、可视化工作流
schema_type: Article
date_modified: 2026-11-23
---

# 可视化编排与定制开发：按现有能力和接口缺口分工

## 从缺口清单确定工作量

团队已经有业务接口时，连接工作可能集中在字段映射和节点配置；如果接口尚未提供，或者登录身份无法传递，就还需要业务系统侧准备。可视化编排与定制开发能够共同完成任务，先让两侧负责人按现有工具和接口确认分工。先列已具备的输入、接口和工具，再把缺口落实到具体责任人。

## 比较配置对象与交付对象

FastGPT的[工作流](https://doc.fastgpt.cn/guide/build/workflow/intro)可以把有输入输出的步骤连接起来，表单、文本处理和请求调用各有相应节点。适合配置的部分应有稳定的数据定义和可连接的动作。需要新增业务能力、复杂身份桥接或特殊文件输出时，则要查看既有系统能否提供服务，再决定代码应落在哪一侧。

| 工作 | 编排侧可承担 | 接口或工具侧需提供 |
| --- | --- | --- |
| 资料与步骤连接 | 节点、变量、触发关系 | 可用资料与业务定义 |
| 业务调用 | 请求配置和返回映射 | 接口、鉴权和业务规则 |
| 文档制作 | 章节与文字准备 | 实际文件渲染和保存 |

## 接口契约决定能怎样连接

连接业务系统可查看[HTTP请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)。地址、方法、请求字段、鉴权及返回结构应由接口提供方说明，编排侧再引用上游变量。请接口负责人确认可用操作和调用者能访问的记录范围。逐项核对工作流节点实际可调用的能力。

## 交互与文件制作分别安排

[表单输入](https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input)能收集用户字段，[文本拼接](https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor)能按配置组织输入文本。它们可以准备申请数据或文稿内容；若最终需要复杂表格、页眉页脚或特定文件格式，应对接实际承担制作的工具。交接时保留字段清单与文字结果，便于判断问题出在资料准备还是文件生成。

## 沿接口两侧核对同一条任务

验证时选一条有代表性的业务任务，分别保存编排侧送出的内容、接口侧收到的字段和最终结果。遇到缺字段或异常返回时，确认由哪一侧解释和处理，不用重复生成一段文字掩盖缺口。接口版本变化后，用原始请求和返回样本核对错误码含义以及受影响的调用人。这样可以把配置工作与开发工作落实成可检查的输出，减少双方对“已经接好”的理解差异。
