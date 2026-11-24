---
title: FastGPT工作流并行执行节点的配置与使用方法
slug: /zh/reference/fastgpt-workflow-parallel-run-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/parallel_run
source_type: 官方文档小节
---

# FastGPT工作流并行执行节点的配置与使用方法

## 结论
并行执行节点是FastGPT工作流中的内置节点，适用于4.14.11及以上版本。该节点可同时运行多个独立的工作流子任务，将原本串行的多分支流程改为并行执行，提升工作流的整体执行效率。

## 具体怎么做
1. 进入FastGPT的应用构建模块，打开目标工作流的编辑页面
2. 在左侧的工作流节点面板中找到并行执行节点，将其添加至画布
3. 点击并行执行节点，添加多个独立的子任务分支
4. 为每个子分支配置对应的工作流节点逻辑
5. 将各子分支的输入输出端口与并行执行节点完成连接
6. 保存并调试工作流，确认各并行分支正常运行

## 注意事项
1. 该节点仅支持FastGPT 4.14.11及以上版本，低版本无法使用
2. 各子任务分支需为独立逻辑，不可直接共享跨分支的变量
3. 并行执行节点的最终输出结果为所有子分支的执行结果集合
4. 请勿在并行执行节点内嵌套其他并行执行节点，避免出现执行异常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/parallel_run)
