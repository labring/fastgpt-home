---
title: 讲解FastGPT工作流批量运行节点的配置与使用方法
slug: /zh/reference/fastgpt-batch-run-workflow-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/loop
source_type: 官方文档小节
---

# 讲解FastGPT工作流批量运行节点的配置与使用方法

## 结论
批量运行节点是FastGPT工作流中的专用执行节点，用于批量处理多组输入的流程任务。使用该节点可简化重复执行相同工作流的操作步骤。

## 具体怎么做
1. 进入FastGPT的应用构建模块，打开目标工作流的编辑页面。
2. 在左侧节点列表中找到批量运行节点，添加到工作流画布。
3. 点击节点打开配置面板，关联需要批量执行的目标流程。
4. 配置批量运行的输入参数，匹配目标流程的输入要求。
5. 保存所有配置并启用工作流，即可触发批量执行任务。

## 注意事项
1. 批量运行节点仅可在工作流编辑页面的节点列表中添加配置。
2. 需正确关联对应的目标执行流程，否则无法正常触发批量任务。
3. 关联的目标流程需支持多组输入数据，否则无法完成批量执行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/loop)
