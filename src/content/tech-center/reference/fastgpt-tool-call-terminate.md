---
title: FastGPT 工作流工具调用与终止节点的使用方法
slug: /zh/reference/fastgpt-tool-call-terminate
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/tool
source_type: 官方文档小节
---

# FastGPT 工作流工具调用与终止节点的使用方法

## 结论
工具调用&终止节点是FastGPT工作流的内置工具类节点，用于实现外部工具的调用与执行终止管理。该节点可集成到工作流中，完成工具相关的自动化流程配置，是工作流中工具集成的核心配置项。

## 具体怎么做
1. 打开FastGPT的应用构建页面，进入工作流编辑界面。
2. 在工作流的节点面板中，找到工具分类下的工具调用&终止节点。
3. 将该节点添加至工作流画布，完成基础的节点部署。
4. 按照节点的配置指引完成相关设置，适配外部工具的调用需求。

## 注意事项
该节点仅可在FastGPT工作流环境中使用，无法直接在对话界面单独运行。节点的配置需符合工作流的整体流转逻辑，避免出现执行中断或异常的情况。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/tool)
