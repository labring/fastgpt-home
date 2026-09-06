---
title: FastGPT工作流异常中断问题的排错与解决方法
slug: /zh/troubleshoot/fastgpt-workflow-interruption-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5956
source_type: GitHub issue
---

# FastGPT工作流异常中断问题的排错与解决方法

## 现象
工作流运行至对应流程节点时触发异常中断，无法继续执行后续步骤，该问题在复杂场景编排中频繁出现，复现过程与附图的流程图一致。

## 可能原因
该问题暂未完成修复，较为复杂，源于多分支循环场景与当前内置图算法的冲突，当多个独立分支共用同一循环（表单）节点时，会触发该异常。

## 排查步骤
1. 收集出现异常中断的工作流JSON配置文件，该文件在交互中被标注为异常中断.json；
2. 梳理工作流的节点拓扑结构，确认是否存在多分支复用同一循环节点的情况；
3. 核查循环节点的使用范围，确认是否在多个分支中重复调用了同一循环节点。

## 解决与验证
当前临时解决方案为调整工作流配置，确保不同分支不共用循环（表单）节点，为每个独立分支配置专属的循环节点，或调整节点连接逻辑避免循环复用。验证时，修改工作流配置后重新运行，确认流程不再出现异常中断，可正常完成全部执行步骤。

> 来源: [FastGPT GitHub issue #5956](https://github.com/labring/FastGPT/issues/5956)
