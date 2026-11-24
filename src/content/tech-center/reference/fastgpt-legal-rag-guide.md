---
title: FastGPT中RAG法律领域检索增强生成的操作说明
slug: /zh/reference/fastgpt-legal-rag-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/rag
source_type: 官方文档小节
---

# FastGPT中RAG法律领域检索增强生成的操作说明

## 结论
FastGPT的RAG功能可基于检索到的文档生成总结、报告等内容。在法律领域，可通过LegalBench-RAG基准优化检索与生成效果，提升内容准确性与严谨性。

## 具体怎么做
1. 输入查询问题，可附带参考问答对（格式：Q: ?, A: ?）
2. 系统将查询转换为向量，在配置的知识库中执行相似度检索，获取相关文档片段
3. 基于检索到的相关信息，调用生成模型生成自然语言答案
4. 系统对比历史相关问答后，返回最终生成的答案

## 注意事项
1. RAG生成结果完全依赖检索到的信息，错误的检索内容会导致生成输出出现偏差
2. 法律文档的长度与专业术语会提升检索和生成的难度
3. LegalBench-RAG基准包含6858个查询-答案对，涵盖合同、隐私政策等法律文档，仅适用于法律领域的检索效果评估
4. 该基准的数据集经过多次人工校验，可保障文本精确性与注释质量

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/rag)
