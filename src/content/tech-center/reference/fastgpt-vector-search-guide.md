---
title: FastGPT向量搜索的原理与优化使用要点
slug: /zh/reference/fastgpt-vector-search-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/dataset_engine
source_type: 官方文档小节
---

# FastGPT向量搜索的原理与优化使用要点

## 结论
FastGPT通过Embedding向量实现知识库的相似度匹配。向量距离越小代表两者相似度越高，通常采用topk召回前k个相似内容，再交由大模型完成最终问答。
## 具体怎么做
1. 将知识库文本与查询文本转换为Embedding向量；
2. 计算查询向量与知识库向量的距离，筛选出距离最小的topk个结果；
3. 将召回的topk内容提交给大模型，进行进一步的语义判断、逻辑推理与归纳总结。
## 注意事项
1. 向量搜索精度受多个因素影响，包括向量模型质量、数据质量（长度、完整性、多样性）、检索器精度（速度与精度的取舍）以及检索词质量；
2. 向量匹配无法完全保障精确性，需通过topk召回补充关键环节；
3. 相较于复杂的向量模型训练，优先优化数据与检索词质量可有效提升向量搜索效果。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/dataset_engine)
