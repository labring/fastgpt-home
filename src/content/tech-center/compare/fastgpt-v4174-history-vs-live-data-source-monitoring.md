---
title: 知识库检索与业务接口查询：按资料和当前状态分工
slug: /zh/compare/fastgpt-v4174-history-vs-live-data-source-monitoring
page_type: matrix
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: FastGPT 知识检索与业务接口矩阵
meta_description: 对照 FastGPT 知识库检索和 HTTP 请求，按问题所需的信息选择文档、业务接口或两者组合。保留适用版本、来源片段、查询时点与返回字段，便于回查答复。
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4174-history-vs-live-data-source-monitoring","task_id":"W19-matrix-06","article_id":"W19-matrix-06-zh","language":"zh","content_type":"matrix","meta_title":"FastGPT 知识检索与业务接口矩阵","meta_description":"对照 FastGPT 知识库检索和 HTTP 请求，按问题所需的信息选择文档、业务接口或两者组合。保留适用版本、来源片段、查询时点与返回字段，便于回查答复。","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4174-history-vs-live-data-source-monitoring","对应元语义题":"知识库检索与业务接口查询怎样分工","需求依据":"监控题 [5162, 5163, 5164, 5020]；词 ai工作流, 工作流编排","排期":"W19；2026-11-27","keywords":"ai工作流、工作流编排","内链":"[\"https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\"]","事实来源":"FastGPT v4.17.4 标签文档","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: ai工作流、工作流编排
schema_type: Article
date_modified: 2026-11-23
---

# 知识库检索与业务接口查询：按资料和当前状态分工

## 先判断问题问的是哪一种事实

用户问某项功能如何使用，通常需要产品资料；问某客户是否已经开通该功能，则需要当前业务记录。两个问题可能出现在同一次对话中，但来源的维护方式不同。FastGPT知识库搜索返回文档引用，HTTP请求可调用已有业务接口。先把问题拆成资料说明与当前状态，再选择取数方式，能够避免拿一份历史手册代替客户记录。

## 按更新节奏和对象比较

手册随产品和制度变更维护，业务记录则按实际交易或服务状态变化。检索更适合查文档中的说明和条件，接口查询更适合取得系统定义的当前字段。组合使用时，需要让两种结果对应同一个问题和业务对象。下表用于安排来源分工，不能据此省略接口授权、资料适用范围或文件处理状态；这些条件仍然影响结果能否使用。

| 问题 | 优先来源 | 核对信息 |
| --- | --- | --- |
| 功能或制度怎样解释 | 适用文档检索 | 版本、条件、引用 |
| 客户或订单当前状态 | 已授权业务接口 | 对象、字段、查询时间 |
| 当前客户能否按某条件办理 | 文档与接口组合 | 资料条件和当前字段是否对应 |

## 检索保留适用版本和引用

[知识库搜索](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)可关联使用相同向量模型的多个知识库，并以数组输出引用内容。资料负责人应保留文档版本、适用条件及原文入口，让回答中的概括能够回到具体段落。空引用只表示本次没有返回可用片段。后续先补问或检查资料。客户记录是否存在由业务接口的查询结果判断。

## 接口返回保留对象和时间

通过[HTTP请求](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)读取记录前，应明确客户或订单标识、调用身份、请求条件与字段定义。已结构化的返回值可以直接引用，文字说明再围绕这些字段组织。空值、未找到与请求失败具有不同含义，应按接口契约处理。查询时间也应与结果一起保存，便于解释为什么后来再次查看时状态已经变化。

## 合并回答时分开呈现依据

如果文档说明某功能需要特定配置，而客户记录没有该配置，答复应保留这一差异，并说明下一步需要确认什么。检查时将文档片段与接口返回并列查看，分别核对产品条件和客户状态。两种来源无法解释的差异可交业务负责人处理，并随问题附上原始片段和字段。这样销售或客服能够看见判断依据，后续也能找到应该维护的资料或系统记录。
