---
title: 解决FastGPT多知识库场景下用户动态选择的配置问题
slug: /zh/troubleshoot/fastgpt-multi-knowledge-base-dynamic-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/809
source_type: GitHub issue
---

# 解决FastGPT多知识库场景下用户动态选择的配置问题

## 现象
用户在使用FastGPT过程中，当存在多个已创建的知识库时，无法实现让用户动态选择目标知识库的功能，无法完成基于多知识库的交互调用。

## 可能原因
未采用关键词、判断工具与知识库结合的配置方案，导致无法实现多知识库的动态选择功能。

## 排查步骤
1. 确认系统中已创建多个可用知识库，且各知识库的配置状态正常。
2. 检查当前的交互调用逻辑，确认是否存在多知识库动态选择的配置缺失。
3. 需按实际环境确认相关调用参数与工具的适配情况。

## 解决与验证
通过关键词、判断工具与知识库结合的组合方式，配置多知识库的动态选择功能。配置完成后，可触发对应交互流程，验证用户是否可在界面中选择目标知识库，并完成后续的调用操作。

> 来源: [FastGPT GitHub issue #809](https://github.com/labring/FastGPT/issues/809)
