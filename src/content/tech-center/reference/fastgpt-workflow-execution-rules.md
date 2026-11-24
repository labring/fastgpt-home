---
title: FastGPT工作流的运行流程与节点执行规则说明
slug: /zh/reference/fastgpt-workflow-execution-rules
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/intro
source_type: 官方文档小节
---

# FastGPT工作流的运行流程与节点执行规则说明

## 结论
FastGPT工作流从【流程开始】节点启动，以单轮调用中所有节点不再运行为结束标志。工作流通过节点间的前置线、后置线的状态变化控制执行逻辑，依据前置线状态判断节点是否触发。

## 具体怎么做
1. 明确节点连线的三种状态：
   - waiting：被连接的节点等待执行
   - active：被连接的节点可以执行
   - skip：被连接的节点无需执行，直接跳过
2. 遵循节点执行原则：
   - 若前置线存在waiting状态，等待执行
   - 若前置线存在active状态，执行当前节点
   - 若前置线无waiting或active状态，跳过当前节点
3. 节点执行完毕后，需将后置线状态设为active或skip，并将自身前置线状态设为waiting等待下一轮调用。
4. 参考执行流程：【流程开始】节点执行后将后置线设为active → 【知识库搜索】节点触发执行，执行后将后置线设为active、前置线设为waiting → 【AI对话】节点触发执行，流程结束。

## 注意事项
1. 工作流无固定出口，仅以单轮调用中所有节点不再运行为结束条件。
2. 需准确区分前置线与后置线：被连接到当前节点的线为前置线，当前节点连接其他节点的线为后置线。
3. 节点执行后必须同步更新后置线与自身前置线的状态，否则会导致工作流执行异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/intro)
