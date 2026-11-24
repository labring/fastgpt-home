---
title: FastGPT工作流循环节点的配置与使用方法
slug: /zh/reference/fastgpt-workflow-loop-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/loop_run
source_type: 官方文档小节
---

# FastGPT工作流循环节点的配置与使用方法

## 结论
循环节点是FastGPT工作流模块的内置节点，仅支持4.15.0及以上版本使用。它可以遍历指定的列表变量，为每个列表项运行一次后续连接的工作流节点，实现批量重复逻辑的自动化执行。

## 具体怎么做
1. 在FastGPT工作流编辑界面中添加循环节点。
2. 配置循环节点的遍历数据源，选择需要循环处理的列表变量。
3. 将需要重复执行的工作流节点连接至循环节点的输出端口，完成循环逻辑的搭建。

## 注意事项
1. 该节点仅可在FastGPT 4.15.0及以上版本中使用，低版本无此节点。
2. 循环节点的遍历数据源必须为列表类型的变量，非列表变量无法正常触发循环。
3. 后续连接的节点可获取当前循环项的变量数据，用于执行对应处理逻辑。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/loop_run)
