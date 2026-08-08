---
title: 解决FastGPT多代理可视化工作流的跨节点协调问题
slug: /zh/troubleshoot/fastgpt-multiagent-workflow-coordination
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6564
source_type: GitHub issue
---

# 解决FastGPT多代理可视化工作流的跨节点协调问题

## 现象
当FastGPT的可视化工作流复杂度提升（包含多代理、多数据源、并行检索场景）时，会出现跨代理节点任务协调困难、多实例部署的流程无法共享任务状态、任务流转状态难以追踪的问题。例如多代理同时认领同一任务导致重复执行，跨实例的流程无法统一管理任务进度。

## 可能原因
FastGPT原生未内置跨代理节点的任务协调能力，多实例部署的流程无法统一同步任务状态；若尝试自建协调机制，往往需要额外搭建消息代理基础设施，会增加运维成本与复杂度。

## 排查步骤
1. 验证当前FastGPT多代理工作流是否出现任务重复执行、状态不一致的问题。
2. 确认是否存在多实例部署的FastGPT流程，需要跨实例协调任务分配与状态同步。
3. 检查现有方案是否依赖额外的消息代理基础设施，评估运维成本是否超出预期。

## 解决与验证
可通过引入GNAP作为协调层解决该问题：以Git仓库作为任务看板，按照`board/todo/`→`board/doing/`→`board/done/`的目录结构管理任务。具体流程为：由流程协调节点创建待处理任务文件存入`board/todo/`目录；对应代理节点认领任务后，将任务文件移动至`board/doing/`目录；任务完成后，将文件移动至`board/done/`目录并提交Git记录。验证时可观察多代理节点的任务分配是否合理，任务状态是否可通过Git仓库完整追踪，多实例部署的流程是否可共享同一Git仓库实现跨实例协调，相关配置需按实际环境确认。

> 来源：https://github.com/labring/FastGPT/issues/6564
