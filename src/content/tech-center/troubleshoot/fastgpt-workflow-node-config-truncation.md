---
title: 解决FastGPT工作流节点配置文本异常截断问题
slug: /zh/troubleshoot/fastgpt-workflow-node-config-truncation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6167
source_type: GitHub issue
---

# 解决FastGPT工作流节点配置文本异常截断问题

## 现象
在FastGPT v4.14.1版本的工作流配置中，出现两类异常：一是自定义的“问题分类”节点的介绍文本（intro字段）被异常截断，仅显示至“关于商品“使”即停止，未完整展示配置的全部内容；二是工作流内的userGuide、workflowStart等节点的所有配置项的渲染类型均被设置为隐藏，无法在界面正常编辑。

## 可能原因
目前可基于现有信息推断三类潜在原因：一是用户误将节点配置项的渲染类型设置为隐藏，导致界面无法显示配置内容；二是自定义节点的文本配置在保存过程中出现截断，导致内容不完整；三是当前使用的v4.14.1版本存在配置保存异常的问题，需按实际环境确认具体根因。

## 排查步骤
1. 导出当前工作流的完整配置JSON，检查各节点的`renderTypeList`参数，确认是否存在误设置为`["hidden"]`的配置项；
2. 查看配置JSON中自定义节点的`intro`字段内容，确认是否存在未完整保存的截断文本；
3. 核对当前部署的FastGPT版本是否为v4.14.1，确认版本相关的兼容性问题。

## 解决与验证
### 解决方法
1. 若发现配置项被设置为隐藏渲染，修改`renderTypeList`参数，移除`"hidden"`项以恢复界面编辑功能；
2. 重新完整输入自定义节点的`intro`文本内容，保存工作流配置；
3. 若排查后确认是版本兼容性问题，需按实际环境确认是否需要进行版本升级。
### 验证方式
重新进入工作流配置页面，检查节点的配置项是否正常显示，自定义节点的介绍文本是否完整展示，保存配置后再次打开页面，确认文本未再次出现截断。

> 来源：[FastGPT GitHub Issue #6167](https://github.com/labring/FastGPT/issues/6167)
