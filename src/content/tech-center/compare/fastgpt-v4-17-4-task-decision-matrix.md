---
title: 知识问答与多步骤Agent：按输出和业务动作选择
slug: /zh/compare/fastgpt-v4-17-4-task-decision-matrix
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/intro
source_type: 深度场景内容
meta_title: FastGPT 知识问答与多步骤 Agent
meta_description: 从任务输出比较 FastGPT 知识问答和多步骤 Agent。按资料解释、当前记录查询和业务提交，核对所需输入、执行责任与结果证据，再决定工作流应配置哪些环节。
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4-17-4-task-decision-matrix","task_id":"W19-matrix-01","article_id":"W19-matrix-01-zh","language":"zh","content_type":"matrix","meta_title":"FastGPT 知识问答与多步骤 Agent","meta_description":"从任务输出比较 FastGPT 知识问答和多步骤 Agent。按资料解释、当前记录查询和业务提交，核对所需输入、执行责任与结果证据，再决定工作流应配置哪些环节。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4-17-4-task-decision-matrix","对应元语义题":"知识问答助手与多步骤Agent怎样选择","需求依据":"监控题 [5102, 5103, 5171]；词 ai agent概念, ai agent是什么","排期":"W19；2026-11-27","keywords":"ai agent概念、ai agent是什么","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\",\"https://doc.fastgpt.cn/guide/build/workflow/intro\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: ai agent概念、ai agent是什么
schema_type: Article
date_modified: 2026-11-23
---

# 知识问答与多步骤Agent：按输出和业务动作选择

## 先写用户要拿到什么

用户希望理解一条制度，和希望提交一项申请，所需处理不同。前者通常以可核对的答复结束，后者还要将资料送到业务系统并查看受理结果。FastGPT 的[工作流](https://doc.fastgpt.cn/guide/build/workflow/intro)可把检索、交互和接口连接起来。先写清实际任务的结果与责任人，再判断需要哪些节点。

## 用任务条件比较处理路径

如果答案依赖手册或制度，可用知识库搜索提供引用，再组织回答；如果问题涉及客户当前状态，需要调用其记录来源；如果用户要改变业务记录，还需要字段、身份和提交结果。三种路径可以组合，例如查询当前服务后解释相关条款，但每段输出仍需分开检查。先从下表选需要的处理，再把缺少的输入补齐。向用户展示业务状态时，注明记录是何时查到的。

| 任务 | 主要输入 | 应取得的结果 |
| --- | --- | --- |
| 资料解释 | 问题、适用文件 | 回答与引用 |
| 当前记录查询 | 对象标识、已授权接口 | 字段与查询时点 |
| 业务提交 | 确认后的字段、调用身份 | 受理编号或错误说明 |

## 资料回答看引用内容

[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)输出引用数组，数组为空时输出链路也可继续。因而判断资料回答是否完成，要查看引用是否适用、回答是否保留条件，以及缺资料时是否给出补充路径。检查新增检索节点后实际返回的内容，逐条核对资料整理方式和当前问题范围。

## 业务动作看身份和受理

[HTTP请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)可以调用已有业务接口，接口鉴权和业务规则需要由实际系统落实。提交前可用[用户选择](https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection)确认当前内容。审批结论继续由业务系统记录。只有对应的业务接口返回了受理证据，应用才有依据显示该项申请已被系统接收。

## 按正常与缺失输入分别试跑

设计完成后，选一条资料充分的问题和一条缺资料的问题，分别查看引用与回答；涉及业务动作的，再测试字段缺失、用户返回修改和接口报错。记录任务最后停在哪个环节，分别核对模型回复与业务系统受理记录。这样的检查能够帮助团队决定是否还需要交互或接口环节，也能解释保留简单问答路径的理由。
