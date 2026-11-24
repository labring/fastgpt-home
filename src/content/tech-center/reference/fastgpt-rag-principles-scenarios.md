---
title: FastGPT中RAG模型的核心机制与应用场景说明
slug: /zh/reference/fastgpt-rag-principles-scenarios
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/rag
source_type: 官方文档小节
---

# FastGPT中RAG模型的核心机制与应用场景说明

## 结论
RAG模型结合生成与检索模型的优势，可解决纯生成模型的事实错误与检索模型的回答不连贯问题。其生成的文本兼具上下文连贯性与准确的知识支撑，适配智能问答、信息检索推理等场景。

## 具体怎么做
1. 启动检索环节，从外部知识库中匹配与用户问题相关的信息
2. 将匹配到的相关信息作为上下文融入生成任务
3. 生成模型基于补充的上下文与用户问题生成连贯且准确的回答

## 注意事项
1. 需确保外部知识库的内容准确，否则生成结果可能存在事实偏差
2. 不适用于无外部事实支撑的纯创意生成场景
3. 无法单独完成无上下文连贯要求的简单检索类任务

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/rag)
