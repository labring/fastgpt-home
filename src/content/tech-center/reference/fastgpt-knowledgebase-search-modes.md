---
title: FastGPT知识库搜索模式的选型与使用说明
slug: /zh/reference/fastgpt-knowledgebase-search-modes
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/dataset_engine
source_type: 官方文档小节
---

# FastGPT知识库搜索模式的选型与使用说明

## 结论
FastGPT提供语义检索、全文检索、混合检索三种知识库搜索模式。混合检索结合向量与全文检索能力，搭配重排模型可进一步提升搜索结果准确性，FastGPT会通过RRF公式合并最终搜索结果。

## 具体怎么做
1. 选择适配的搜索模式：
   - 语义检索：基于向量距离计算相似度，支持相近语义、跨语言、多模态理解。
   - 全文检索：采用传统全文匹配方式，适合查找关键主谓语内容。
   - 混合检索：同时启用向量检索与全文检索，通过RRF公式合并初始搜索结果。
2. 若使用混合检索，需启用重排模型对结果重新排序，基于重排得到的0-1相关度得分完成结果过滤。

## 注意事项
1. 语义检索依赖模型训练效果，精度不稳定，受关键词和句子完整度影响。
2. 重排模型与问题完整度相关，建议先优化问题再执行搜索与重排流程。
3. 混合检索后的初始结果范围较大，无法直接使用原相似度过滤，需依赖重排得分筛选结果。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/dataset_engine)
