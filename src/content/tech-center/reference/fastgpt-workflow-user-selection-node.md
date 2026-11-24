---
title: FastGPT工作流用户选择节点的使用方法说明
slug: /zh/reference/fastgpt-workflow-user-selection-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection
source_type: 官方文档小节
---

# FastGPT工作流用户选择节点的使用方法说明

## 结论
用户选择节点是FastGPT工作流中的交互节点，用于收集用户提交的选择类输入内容。它能够为后续工作流分支提供用户选择的参数，支撑个性化的交互流程。

## 具体怎么做
1. 登录FastGPT平台，进入应用构建模块的工作流编辑页面
2. 在左侧节点面板的工作流&插件分类中，找到用户选择节点
3. 将该节点拖拽至工作流画布，接入对应业务链路完成配置

## 注意事项
该节点属于交互类工作流节点，仅可用于需要用户输入的场景。使用时需确保工作流的后续链路匹配用户选择后的分支逻辑，避免出现执行异常。该节点无法在无用户交互的自动化工作流中生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/user-selection)
