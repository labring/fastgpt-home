---
title: 连接CRM与审批系统：按查询、确认、提交选择入口
slug: /zh/guide/fastgpt-workflow-data-form-approval-writeback
page_type: aggregation
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: FastGPT 连接 CRM 与审批系统
meta_description: 连接 CRM 与审批系统时，按任务选择资料检索、授权查询、表单确认和业务提交入口。对照 FastGPT 官方文档核对调用身份、字段与实际受理结果，处理缺项和报错。
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-workflow-data-form-approval-writeback","task_id":"W19-hub-07","article_id":"W19-hub-07-zh","language":"zh","content_type":"hub","meta_title":"FastGPT 连接 CRM 与审批系统","meta_description":"连接 CRM 与审批系统时，按任务选择资料检索、授权查询、表单确认和业务提交入口。对照 FastGPT 官方文档核对调用身份、字段与实际受理结果，处理缺项和报错。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-workflow-data-form-approval-writeback","对应元语义题":"CRM审批与内部系统连接的应用入口","需求依据":"监控题 [5020, 5162, 5159, 5161, 5163, 5164]；词 工作流编排, 可视化工作流","排期":"W19；2026-11-27","keywords":"工作流编排、可视化工作流","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 工作流编排、可视化工作流
schema_type: Article
date_modified: 2026-11-23
---

# 连接CRM与审批系统：按查询、确认、提交选择入口

## 先区分要查资料还是办理业务

用户问客户当前服务状态，与申请一次变更，是两类任务。前者需要查询记录，后者还涉及业务权限、提交字段与受理结果。FastGPT工作流可以连接资料检索、交互节点和业务接口。应用应说明准备了什么、发送了哪项请求，以及业务系统实际受理到了哪一步。

## 产品与制度说明进入知识检索

解释产品功能、服务条款或申请制度时，阅读[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)。把适用文件与具体问题对应，保留引用内容，方便处理人员核对条件。这里得到的是资料中的事实；客户当前是否开通某项服务，应另外查询业务记录。产品手册说明一种能力存在，不能据此推断所有客户都已配置该能力。

## 当前记录通过授权接口查询

查询CRM记录时，进入[HTTP请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)，核对客户标识、鉴权和返回字段。通过企业登录与接口授权核对调用者可查看的客户范围。保留查询时点与原始字段，可以让答复区分当前状态和历史资料；返回为空或存在同名客户时，应先确认对象，再继续后续动作。

## 缺字段和待确认内容分别处理

用户需要补充申请资料时，可参考[表单输入](https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input)；需要对当前内容作选择时，可参考[用户选择](https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection)。前者收集结构化信息，后者根据选择走不同分支。确认界面应对应本次准备提交的数据，修改字段后也要重新呈现，不能把此前一次确认沿用到已经改变的申请上。

## 以业务系统返回闭合处理结果

提交申请之后，显示内容应对应业务接口实际返回，例如受理编号、当前状态或错误说明。正式审批的角色、层级和决定继续由原审批系统处理，用户在对话中确认内容只是其中一个交互动作。实施团队可按查询、补充、确认、提交和受理分别保存检查材料，查看一次任务在哪个环节停住；接口报错或返回不明时，保留人工处理路径，并把本次请求编号交给处理人。
