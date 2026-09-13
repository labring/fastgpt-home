---
title: FastGPT的RAG工作流程、配置方法与应用场景详细说明
slug: /zh/tutorial/fastgpt-rag-workflow-guide
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/rag
source_type: 官方文档
---

# FastGPT的RAG工作流程、配置方法与应用场景详细说明

## RAG 标准工作流程
RAG是FastGPT知识库问答的核心执行流程，完整步骤分为五个环节：
1.  数据加载与查询输入：用户通过界面或API提交自然语言查询，系统接收查询后将其传递至向量化器，利用BERT或Sentence Transformer将自然语言查询转换为向量表示。
2.  文档检索：向量化后的查询传递给检索器，检索器在知识库中查找最相关的文档片段。检索可基于BM25稀疏检索技术或DPR密集检索技术，提升匹配效率和精度。
3.  生成器处理与自然语言生成：检索到的文档片段作为生成器的输入，生成器基于GPT、BART或T5模型，结合查询和文档内容生成自然语言回答。生成器融合外部检索结果与预训练模型的语言知识，使回答更加精准、自然。
4.  结果输出：系统生成的答案通过API或界面返回给用户，确保答案连贯且知识准确。
5.  反馈与优化：用户可对生成的答案进行反馈，系统根据反馈微调模型参数、调整检索权重，优化检索与生成过程，逐步提升后续查询的准确性与效率。

## RAG 相关资源与应用
可参考[各种分类领域下的 RAG](https://github.com/hymie122/RAG-Survey)获取不同分类领域的RAG相关案例。RAG模型已在多个领域得到广泛应用。

## 核心配置参数
FastGPT的RAG流程支持多种技术工具选型，核心配置参数如下：
| 配置环节 | 支持的技术工具 |
| --- | --- |
| 向量化处理 | BERT、Sentence Transformer |
| 文档检索 | BM25（稀疏检索）、DPR（密集检索） |
| 答案生成 | GPT、BART、T5 |
系统可通过微调模型参数、调整检索权重，优化整体性能。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/guide/dataset/rag)
