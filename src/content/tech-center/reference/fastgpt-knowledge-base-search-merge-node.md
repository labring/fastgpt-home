---
title: 介绍FastGPT工作流内知识库搜索引用合并节点的使用方法
slug: /zh/reference/fastgpt-knowledge-base-search-merge-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/knowledge_base_search_merge
source_type: 官方文档小节
---

# 介绍FastGPT工作流内知识库搜索引用合并节点的使用方法

## 结论
知识库搜索引用合并是FastGPT工作流中的内置节点，用于整合多来源的知识库搜索结果。该节点可标准化整理检索到的知识库内容，为后续流程提供统一格式的引用数据。

## 具体怎么做
1. 进入FastGPT的应用构建模块，打开目标工作流。
2. 在工作流的节点列表中，找到知识库搜索引用合并节点并添加至画布。
3. 连接该节点与前置的知识库搜索节点，完成数据链路的搭建。

## 注意事项
该节点仅支持处理知识库搜索返回的结果数据，无法接入非检索类的输入内容。需在工作流的官方节点列表中添加该节点，不可通过自定义路径调用。使用该节点前，需确保前置的知识库搜索节点已完成配置，否则无法正常获取待合并的数据。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/knowledge_base_search_merge)
