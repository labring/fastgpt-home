---
title: 解决FastGPT节点选择数组渲染与标题匹配配置问题
slug: /zh/troubleshoot/fastgpt-node-select-dynamic-render
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3037
source_type: GitHub issue
---

# 解决FastGPT节点选择数组渲染与标题匹配配置问题

## 现象
当前FastGPT节点选择功能无法支持传入数组渲染节点选项，无法通过下一个连接节点的标题进行匹配筛选，难以满足动态流程节点展示的需求。

## 可能原因
当前FastGPT的节点选择组件仅支持固定配置的选项，未开放数组传入渲染及基于连接节点标题匹配的配置能力，无法适配动态流程触发的场景。

## 排查步骤
1. 查看节点选择功能的配置文档，确认是否存在支持数组传入的参数项；
2. 检查节点连接逻辑的配置项，确认是否可通过节点标题实现匹配筛选；
3. 验证当前使用的FastGPT版本是否支持该动态渲染与匹配功能，需按实际环境确认版本兼容性。

## 解决与验证
可通过后端逻辑判断触发对应的流程节点，实现动态渲染节点选项。需按实际环境配置后端代码，根据运行结果匹配对应流程节点，完成十一二个小流程的动态展示。验证时触发对应业务流程，确认节点选项是否按预期动态渲染并完成标题匹配。

> 来源: [FastGPT GitHub issue #3037](https://github.com/labring/FastGPT/issues/3037)
