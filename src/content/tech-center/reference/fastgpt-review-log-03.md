---
title: 工作流请求、返回与业务受理记录
slug: /zh/reference/fastgpt-review-log-03
page_type: baseline
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input
source_type: 深度场景内容
meta_title: 工作流请求、返回与业务受理记录
meta_description: 填写 FastGPT 工作流中的请求身份、输入字段、接口返回与业务受理证据，逐次记录表单确认、接口异常和系统状态，便于核对申请到底停在哪一步及由谁处理。
delivery_metadata: {"source_front_matter":{"task_id":"W19-baseline-03","content_type":"baseline","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-review-log-03","article_id":"W19-baseline-03-zh","slug":"fastgpt-review-log-03","language":"zh","meta_title":"工作流请求、返回与业务受理记录","meta_description":"填写 FastGPT 工作流中的请求身份、输入字段、接口返回与业务受理证据，逐次记录表单确认、接口异常和系统状态，便于核对申请到底停在哪一步及由谁处理。","keywords":"[\"工作流编排\",\"业务受理记录\",\"接口返回\"]","对应元语义题":"按请求身份、字段、返回结果和业务受理证据记录","需求依据":"FastGPT W19 客户需求题卡","事实来源":"FastGPT v4.17.4 标签文档","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract\"]","排期":"W19 2026-11-27","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 工作流编排, 业务受理记录, 接口返回
schema_type: Article
date_modified: 2026-11-23
---

# 工作流请求、返回与业务受理记录

## 确定一条业务动作的起点

选一个已确定受理接口的任务，例如提交设备借用申请。先对照业务系统的字段清单，标明哪些由申请人确认，哪些由当前身份或系统记录提供。可通过[表单输入](https://doc.fastgpt.cn/guide/build/workflow/nodes/form_input)收集需确认的信息，提交前核对读取的值和展示给申请人的值。若业务对象允许修改，记录修改后的字段来源，再发出请求。

## 记录结构化字段和补全动作

已经有类型和含义的字段可以直接映射。若由[文本内容提取](https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract)从一段说明中提取申请对象或日期，把提取值标作待核，再用原文或表单让人补齐。对标识、时间和确认结果分别留痕。无需把凭证、完整个人信息或生产记录复制进测试表，保留业务人员可回查的受控记录位置即可。

## 把接口响应和业务受理结果对应起来

用[HTTP 请求节点](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)发出请求后，记下调用身份、关联编号、返回状态和业务字段。按接口契约判断返回表示收到请求、受理成功还是需要补充资料。若后续审批仍在等待，在记录表里单列这个状态，让处理人员可以在实际业务系统里继续查询。出现超时也要保留该次调用编号。

| 请求或关联编号 | 调用身份与入口 | 输入及确认记录 | 接口状态及业务字段 | 业务受理或审批状态 | 证据位置与处理人 |
| --- | --- | --- | --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## 用不同返回状态填几条记录

表中每一行对应一次请求。测试时覆盖请求成功、资料缺项和暂时未得到结果的情况。需要再次提交前，先到业务系统核原请求是否已受理，并按该接口的重试规则办理。把重试请求与原请求对应起来，给编辑或业务人员留下能追查的证据，也便于确认使用者最后看到的是哪种提示。

## 区分可向申请人显示的状态和内部查找依据

给申请人展示申请对象、当前状态和下一步能做的事。受理编号能提供给申请人时，可以随状态附上查询入口。内部记录则保留对应的请求标识、调用时间及响应位置，以便业务人员发现同一个申请被记录两次时追查。对于表单已完成但尚未提交的测试，注明停止在确认、字段校验还是请求发送，方便核实该提示是否和实际业务进度一致。
