---
title: FastGPT 业务查询、确认与提交矩阵
slug: /zh/compare/fastgpt-decision-matrix-10
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 深度场景内容
meta_title: FastGPT 业务查询、确认与提交矩阵
meta_description: 比较 FastGPT 工作流中的查询、确认、提交与审批，明确各步骤的输入、执行方和结果依据。对照表单、用户选择和接口节点，核查聊天反馈如何对应业务系统状态。
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-10","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-10","article_id":"W19-matrix-10-zh","slug":"fastgpt-decision-matrix-10","language":"zh","meta_title":"FastGPT 业务查询、确认与提交矩阵","meta_description":"比较 FastGPT 工作流中的查询、确认、提交与审批，明确各步骤的输入、执行方和结果依据。对照表单、用户选择和接口节点，核查聊天反馈如何对应业务系统状态。","keywords":"[\"工作流编排\",\"业务提交\",\"审批受理\"]","对应元语义题":"查询、确认、提交与审批各由谁完成","需求依据":"FastGPT W19 客户需求题卡","事实来源":"FastGPT v4.17.4 标签文档","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection\"]","排期":"W19 2026-11-27","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 工作流编排, 业务提交, 审批受理
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT 业务查询、确认与提交矩阵

## 先把查询和写入列成不同动作

在订单变更场景，客服可能先查看这张订单能否修改，接着向客户确认修改内容，再向系统提交。查询只需要读取权限，提交需要写入权限和待变更字段。确认则需要把即将提交的字段让用户看清楚。把这几个动作及可能结果放进矩阵，才能安排每一步由谁执行。

## 查询环节保留对象和读权限

在 FastGPT 用[HTTP 请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)查询订单时，对照接口的授权和返回字段，核实输入的订单编号是否对应真实对象。可以把允许修改的项、当前版本和查询时点记在这一阶段的结果中。处理同名或缺少编号的请求时，先向使用者补问，取得能核对的标识之后再查询。

| 动作 | 执行方 | 结果依据 |
| --- | --- | --- |
| 查询 | 已授权的业务接口 | 对象字段及查询时间 |
| 确认 | 当前用户 | 当时展示并确认的内容版本 |
| 提交 | 业务接口 | 受理状态或返回错误 |
| 审批 | 正式审批系统 | 审批记录和责任人 |

## 需要补资料和需要确认分别处理

缺少新地址或联系人时，可在[表单输入](https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input)中收集，再把完整变更项展示给客户。[用户选择](https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection)可以按选择继续或返回修改。一次确认指向当时展示的字段。若修改了日期、地址或对象，重新展示相关字段，并保留最终确认所对应的内容版本。

## 提交和审批分别取证

向业务系统发送已确认内容后，看接口约定的结果字段。已接收、待审和审批通过各有不同状态。应用应传达接口实际报告的状态，正式审批人和结果由审批系统保留。接口返回请求编号时可供业务人员查回原始申请，超时时先从系统确认原请求是否受理。

## 用一次回退检查各环节的责任

测试时让申请人先确认、再返回改一个字段，检查旧内容是否会被提交。随后模拟接口不可用或业务拒绝，分别查看用户提示与系统里实际出现的记录。把未提交、已接收和待审批时可展示的信息列清楚，确保客服能解释接下来要查哪一个系统。

## 检查重复确认与重复提交

同一次申请可能因网络中断收到两次点击。核对界面第二次确认后是否产生了新的提交编号，再根据业务系统的查询结果确认是否生成多条申请。需要重送时，由经办人按接口约定处理，并在原记录上关联补送结果。
