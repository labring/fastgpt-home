---
title: 日报、文档审核与模板写作：按交付结果选择工作流
slug: /zh/guide/fastgpt-workflow-task-navigation-monitoring
page_type: aggregation
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 深度场景内容
meta_title: FastGPT 日报、审核与模板写作入口
meta_description: 日报、文档审核与模板写作需要不同的材料和输出。本文按完整任务连接FastGPT接口、字段提取、知识检索与文本组织文档，帮助团队区分原始数据、模型草稿、人工结论和最终文件制作。
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-workflow-task-navigation-monitoring","task_id":"W19-hub-08","article_id":"W19-hub-08-zh","language":"zh","content_type":"hub","meta_title":"FastGPT 日报、审核与模板写作入口","meta_description":"日报、文档审核与模板写作需要不同的材料和输出。本文按完整任务连接FastGPT接口、字段提取、知识检索与文本组织文档，帮助团队区分原始数据、模型草稿、人工结论和最终文件制作。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-workflow-task-navigation-monitoring","对应元语义题":"日报文档审核与模板写作的工作流入口","需求依据":"监控题 [5169, 5170, 5173, 5174, 5175, 5176, 5178, 5179, 5180, 5181, 5182, 5183, 5160, 5165, 5166]；词 ai工作流, 自动化工作流","排期":"W19；2026-11-27","keywords":"ai工作流、自动化工作流","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/ai_chat\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: ai工作流、自动化工作流
schema_type: Article
date_modified: 2026-11-23
---

# 日报、文档审核与模板写作：按交付结果选择工作流

## 先确定交付的是数据、文字还是文件

日报需要口径清楚的数字与说明，合同审核需要原文及待确认差异，模板写作需要章节与资料对应。三类任务各自准备输入，日报用接口字段，审核用文档和参考规则，写作用章节及相关资料。先列最终读者要检查什么，再选择输入和输出。FastGPT可以把数据接口、检索和文本处理组合起来，文稿确认与办公文件制作则要继续接上原有工作安排。

## 经营日报从接口字段开始

整理经营日报时，阅读[HTTP请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)，把返回字段、单位和统计周期放在一起。已经结构化的数值可以直接交给模板引用，解释性段落再由模型组织。跨期比较先确定日期口径与计算来源，避免把累计值当当日新增。核对材料应保留原始返回，使编辑能够查到每个数字从哪里来。

## 文档审核连接原文与参考规则

整理合同或其他文档的审阅材料时，可先查看[文本内容提取](https://doc.fastgpt.cn/guide/build/workflow/nodes/content_extract)，再通过[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)取得参考条款。保留文档身份和版本，区分原文明示内容、提取字段与模型提出的差异候选。审核人员据此回看具体位置，决定哪些差异需要补充解释或进一步处理。

## 模板写作围绕章节问题组织

报告与方案模板可从[文本拼接](https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor)和[AI对话](https://doc.fastgpt.cn/guide/build/workflow/nodes/ai_chat)进入。先为章节定义要回答的问题，再提供该次任务的事实资料。固定栏目要求与随项目变化的内容分开维护，编辑更容易看出一段草稿采用了什么。缺材料的章节保留补充入口，避免把通用介绍写成当前项目进展。

## 文本确认后再连接最终制作

三类任务都应保留原始输入和可核对的中间结果：日报看字段与周期，文档审核看原文与规则，模板写作看章节与出处。确认文字后，再交给实际使用的报表、文档或业务系统完成版式、保存与分发。若需要接口回写，应另外检查返回凭证。这样可以分别判断文字生成是否完成、文件是否保存以及业务记录是否已经受理。
