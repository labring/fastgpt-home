---
title: FastGPT工作流节点知识库搜索的使用与配置方法
slug: /zh/reference/fastgpt-workflow-dataset-search
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search
source_type: 官方文档小节
---

# FastGPT工作流节点知识库搜索的使用与配置方法

## 结论
知识库搜索是FastGPT工作流的标准节点，用于触发知识库内容检索。其具体参数说明与内部逻辑需参考官方指定的知识库搜索方案文档。

## 具体怎么做
1. 进入FastGPT应用构建模块下的工作流编辑页面；
2. 在节点列表中添加知识库搜索节点；
3. 进入节点配置界面，按照官方知识库搜索方案完成参数配置；
4. 完成节点与其他工作流节点的链路关联，保存当前工作流。

## 注意事项
1. 该节点需在工作流编辑界面中添加，属于工作流节点范畴；
2. 具体参数与内部逻辑需严格遵循官方知识库搜索方案，不可自行随意配置；
3. 需确保关联的知识库集合已正常创建并配置完成，否则节点运行可能出现异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/dataset_search)
