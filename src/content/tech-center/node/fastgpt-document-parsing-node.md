---
title: FastGPT文档解析节点的功能说明与配置使用方法
slug: /zh/node/fastgpt-document-parsing-node
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/document_parsing
source_type: 官方文档
---

# FastGPT文档解析节点的功能说明与配置使用方法

## 节点概述
文档解析是FastGPT工作流内置的基础节点，需先开启文件上传功能后方可正常使用。该节点属于应用构建模块下工作流节点分类中的核心组件，用于对接上传的文档文件处理流程。你也可以通过GitHub页面编辑该节点的相关官方文档，同步更新内容。

## 快速配置步骤
1. 进入FastGPT应用构建模块的工作流编辑页面；
2. 在左侧节点列表中找到「文档解析」节点并添加至画布；
3. 确认当前工作区已开启文件上传功能，确保节点可正常调用；
4. 将该节点与其他工作流节点完成连线配置。

## 关联节点说明
文档解析节点可与AI对话、知识库搜索、文本拼接等工作流节点配合使用，支持搭建包含文档处理的完整业务流程。该节点的配置可参考工作流通用配置项完成基础参数调整，适配不同的文档处理需求。同时其功能定位与指定回复、HTTP请求等节点形成互补，共同支撑复杂工作流的搭建。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/document_parsing)
