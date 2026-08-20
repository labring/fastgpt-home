---
title: 讲解FastGPT工作流中AI对话节点的配置与使用方法
slug: /zh/node/ai-chat-workflow-node
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/ai_chat
source_type: 官方文档
---

# 讲解FastGPT工作流中AI对话节点的配置与使用方法

### 节点功能与特点
FastGPT工作流中的AI对话节点是核心功能模块，支持重复添加至工作流画布，且可通过触发机制执行。该节点主要承载基于配置AI模型的对话生成能力，是工作流中实现交互类逻辑的基础组件。

### 配置操作步骤
1. 进入FastGPT工作流编辑界面，添加AI对话节点至工作流画布；
2. 点击节点内的「AI模型」选项，可查看并选择已配置的对话模型；
3. 通过`config.json`文件配置节点可选的对话模型列表；
4. 如需调整模型的相关参数，参考官方提供的AI参数配置说明文档完成设置。

### 使用边界与注意事项
该节点存在明确的使用边界，仅支持基于已配置的AI模型生成对话内容，无法直接集成知识库搜索、外部接口调用等其他功能，如需结合多类能力需搭配对应专用工作流节点使用。若未通过`config.json`完成可选模型的配置，节点将无法正常加载可用的模型选项，导致无法完成对话逻辑配置。当需要处理纯文本格式转换、内容提取等非对话类任务时，不应使用该节点，建议选择文本拼接、文本内容提取等专用节点完成对应操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/ai_chat)
