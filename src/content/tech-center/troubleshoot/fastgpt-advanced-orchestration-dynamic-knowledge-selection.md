---
title: FastGPT高级编排场景下动态选择知识库的配置方法
slug: /zh/troubleshoot/fastgpt-advanced-orchestration-dynamic-knowledge-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1177
source_type: GitHub issue
---

# FastGPT高级编排场景下动态选择知识库的配置方法

## 现象
在FastGPT高级编排功能中，需通过入参或全局变量的方式动态选择目标知识库，但未找到原生直接配置路径，无法快速实现该动态选择逻辑。

## 可能原因
FastGPT高级编排未内置直接通过入参或全局变量动态切换知识库的功能，需通过现有编排组件组合实现。当知识库数量较多时，直接整合所有知识库内容可能导致维护难度提升。

## 排查步骤
1. 统计需动态选择的知识库数量，评估业务场景的复杂度；
2. 确认动态选择的触发依据为入参还是全局变量，明确参数传递逻辑；
3. 梳理现有编排组件的可用能力，匹配对应的实现方案。

## 解决与验证
若需动态选择的知识库组合不多，可通过变量输入与判断器组件实现分支逻辑，每个分支接入对应的知识库。若数据量较大或组合较多，可通过HTTP接口获取目标知识库信息，或整合所有知识库内容，但需注意避免知识库过于庞大难以维护。验证时，传入对应入参或设置全局变量，触发对应分支或接口调用，确认成功选择目标知识库。

> 来源: [FastGPT GitHub issue #1177](https://github.com/labring/FastGPT/issues/1177)
