---
title: 解决FastGPT RAG连续对话中知识库搜索匹配失效的问题
slug: /zh/reference/fastgpt-rag-question-optimization
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/dataset_engine
source_type: 官方文档小节
---

# 解决FastGPT RAG连续对话中知识库搜索匹配失效的问题

## 结论
FastGPT的问题优化模块可补全连续对话中的用户问题，帮助知识库搜索匹配到更相关的内容。该模块通过模型调用完成指代消除与问题扩展，提升连续对话的检索效果。
## 具体怎么做
1. 在正式执行知识库数据检索前，触发FastGPT的问题优化流程
2. 模型自动完成用户问题的指代消除，明确问题中的指代对象
3. 扩展问题的语义丰富度，补全上下文关联的内容
4. 可通过单次对话的详情页面，查看最终补全后的问题内容
## 注意事项
1. 问题优化会在正式检索前增加一次模型调用，会提升整体响应耗时
2. 该模块主要解决连续对话中问题指代不明确、语义不完整的场景
3. 若当前问题表述明确，或对响应速度有较高要求，可根据实际情况决定是否开启
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/dataset_engine)
