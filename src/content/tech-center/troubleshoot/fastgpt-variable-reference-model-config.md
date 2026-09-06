---
title: 解决FastGPT中无法通过变量引用调整温度与模型选择的问题
slug: /zh/troubleshoot/fastgpt-variable-reference-model-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2842
source_type: GitHub issue
---

# 解决FastGPT中无法通过变量引用调整温度与模型选择的问题

## 现象
用户在FastGPT中尝试通过变量引用调整模型温度参数与模型选择，无法完成对应的配置操作。

## 可能原因
当前FastGPT的配置逻辑中，通过变量引用调整模型温度与模型选择的用户体验设计过于复杂，暂不支持该操作的实现路径。

## 排查步骤
1. 明确当前需求为通过变量引用调整模型温度参数或模型选择
2. 进入FastGPT的对应配置页面，查看可用的配置选项范围
3. 核对配置界面是否存在变量引用关联模型温度或选择的配置入口
4. 需按实际环境确认系统配置逻辑是否支持该类变量引用操作

## 解决与验证
根据官方反馈，当前无法通过变量引用调整模型温度与模型选择。该功能的用户体验逻辑设计较为复杂，暂无直接的实现方案。若需完成模型温度或选择的配置，需采用非变量引用的其他方式进行操作。

> 来源: [FastGPT GitHub issue #2842](https://github.com/labring/FastGPT/issues/2842)
