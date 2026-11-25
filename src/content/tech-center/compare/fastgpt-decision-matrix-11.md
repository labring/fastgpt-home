---
title: FastGPT 文档复核的证据与规则矩阵
slug: /zh/compare/fastgpt-decision-matrix-11
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract
source_type: 深度场景内容
meta_title: FastGPT 文档复核的证据与规则矩阵
meta_description: 按原文字段、参考规则、条件判断与人工结论划分 FastGPT 文档复核工作。对照字段提取、知识库搜索和判断器，记录缺项、规则版本及复核人如何处理差异。
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-11","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-11","article_id":"W19-matrix-11-zh","slug":"fastgpt-decision-matrix-11","language":"zh","meta_title":"FastGPT 文档复核的证据与规则矩阵","meta_description":"按原文字段、参考规则、条件判断与人工结论划分 FastGPT 文档复核工作。对照字段提取、知识库搜索和判断器，记录缺项、规则版本及复核人如何处理差异。","keywords":"[\"文档复核\",\"规则判断\",\"知识库检索\"]","对应元语义题":"证据、规则执行和人工结论分开","需求依据":"FastGPT W19 客户需求题卡","事实来源":"FastGPT v4.17.4 标签文档","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/tfswitch\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\"]","排期":"W19 2026-11-27","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 文档复核, 规则判断, 知识库检索
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT 文档复核的证据与规则矩阵

## 先区分材料和需要做出的结论

例如核对一份设备采购申请，原文写有型号、交付日期和说明附件。审核人需要知道字段是否齐全、引用的是哪一版流程，以及有例外时由谁确认。可以把核对拆成记录原文、找到参考规则、按明确条件分流和人工确认。每一个步骤都要能回到具体材料。

## 提取值先交给原文核对

FastGPT 的[文本内容提取](https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract)可按字段说明要求模型从文字中找对应内容。输出可能为空或取到文档里另一处日期。设置时写清目标字段含义，保留原文位置。遇到多份附件或不同版本，分别登记文件身份，后续发现提取值不一致时能直接翻回原处。

| 工作 | 判断依据 | 输出 |
| --- | --- | --- |
| 字段提取 | 原文、字段说明 | 候选字段和出处 |
| 参考检索 | 当前适用规则 | 引用和版本 |
| 条件分流 | 已确认的字段条件 | 执行路径 |
| 人工确认 | 原文、规则和例外信息 | 结论及责任人 |

## 参考规则看版本和适用范围

通过[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)找到相关流程、规则或示范材料后，记录适用对象、生效日期和检索返回的片段。返回为空时登记本次没有检索结果，将任务交给负责维护规则的人查看。资料中同时出现新旧规则时，由复核人确认适用哪份，再将确认依据记在记录中。

## 用确定的条件分流

已确认可以用字段判断的缺项，例如附件标识为空，可以用[判断器](https://doc.fastgpt.cn/guide/build/workflow/nodes/tfswitch)根据变量选择后续路径。分支条件需要有明确含义和来源。如果规则为“遇到特殊情况报负责人审批”，则把原文和待确认原因传给负责人，正式结论由其填写。

## 用容易混淆的一例验收

测试同一份申请里的“填写日期”和“计划交付日期”。分别检查提取值指向哪个字段，参考规则采用哪种日期，以及业务分支是否因此变化。两种日期都齐全但含义不明时，先询问提交人或复核人。记录人工结论和依据位置，便于规则更新后回查历史任务。

## 新规则生效后保留旧记录

规则改版时，选一条旧申请和一条新申请分别复核。旧申请先查当时的规则和已经登记的决定，新申请按新版本校验。给处理人保留两套规则的生效日期和查阅位置，避免记录系统只显示当前规则却丢失过去的判断依据。
