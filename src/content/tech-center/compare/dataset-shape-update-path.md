---
title: 文档与问答对：按资料形态组织企业知识
slug: /zh/compare/dataset-shape-update-path
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: FastGPT 知识库文档与问答条目
meta_description: 企业知识可以保留成完整文档，也可以整理为问答条目。本文按上下文、更新方式与适用范围比较两种资料形态，说明FastGPT检索需要核对的来源关系，并给出条目整理和回查原文的方法。
delivery_metadata: {"source_front_matter":{"slug":"dataset-shape-update-path","task_id":"W19-matrix-04","article_id":"W19-matrix-04-zh","language":"zh","content_type":"matrix","meta_title":"FastGPT 知识库文档与问答条目","meta_description":"企业知识可以保留成完整文档，也可以整理为问答条目。本文按上下文、更新方式与适用范围比较两种资料形态，说明FastGPT检索需要核对的来源关系，并给出条目整理和回查原文的方法。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"dataset-shape-update-path","对应元语义题":"文档资料与问答对怎样组织企业知识","需求依据":"监控题 [5155, 5156, 5173]；词 企业知识库, ai知识库搭建","排期":"W19；2026-11-27","keywords":"企业知识库、ai知识库搭建","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor\",\"https://doc.fastgpt.cn/guide/chat/quoteList\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 企业知识库、ai知识库搭建
schema_type: Article
date_modified: 2026-11-23
---

# 文档与问答对：按资料形态组织企业知识

## 先看知识有没有必须保留的上下文

制度、合同和产品手册常有定义、例外与章节引用；一条常见问题则可能只需一段稳定解释。选择资料形态，应从这些关系出发。整理为问答条目可以帮助集中回答具体问题，保留完整文档则便于查看相邻条件，两者也可以共同使用。FastGPT检索所返回的片段是否足以支持答复，需要以具体问题和原始材料检查。

## 比较资料维护的基本单位

维护整份文档时，版本变化可能影响多个问题；维护问答条目时，同一条规定可能出现在不同答复中。把采用来源和适用范围一起记录，能够在文件改版后找到受影响条目。下表按不同工作任务比较两种资料的维护对象。文件是否易读、问题如何表述以及资料是否过期，都可能影响最终返回的内容。

| 维度 | 完整文档 | 问答条目 |
| --- | --- | --- |
| 上下文 | 保留章节与相邻条件 | 需主动保留适用条件和原文出处 |
| 更新对象 | 文件与受影响章节 | 条目及其引用的规则 |
| 适用任务 | 查条款、阅读上下文 | 集中回答已整理的问题 |

## 检索先核对片段与来源

[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)返回引用内容，维护者可据此检查条目或文档片段是否来自预期资料。对于同时关联多个知识库的搜索，需要采用相同向量模型。空返回只记录本次没有引用片段，先查资料处理状态与查询范围。若片段只含结论，原文中的适用对象与例外还应保留在可核对的资料中。

## 问答整理保留问题与原文关系

把长文档整理为问答时，可先列真实咨询问题，再为每个问题找支撑片段。需要按固定要求组织文本，可参考[文本拼接](https://doc.fastgpt.cn/guide/build/workflow/nodes/text_editor)，但固定格式不会自动决定内容是否准确。编辑仍要核对条目有没有把建议写成制度、把某个场景写成通用规则，尤其要查看数字、日期和处理条件是否完整。

## 用改版样本检查维护是否闭合

选一份有版本变化的资料，查看哪些问答条目需要修改，再以原问题重新检索，核对引用是否指向正确版本。借助[引用阅读](https://doc.fastgpt.cn/guide/chat/quoteList)查看可见原文时，还应确认分享范围符合使用对象。把文档、条目和回查结果联系起来，能够帮助维护者选择保留全文、维护条目或两者并用的方式，并明确各自需要的持续工作。
