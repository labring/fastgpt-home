---
title: FastGPT工作流HTTP插件流式请求相关问题排查与解决
slug: /zh/troubleshoot/fastgpt-workflow-http-stream-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2643
source_type: GitHub issue
---

# FastGPT工作流HTTP插件流式请求相关问题排查与解决

## 现象
工作流中的HTTP插件无法传入stream=True参数，仅能等待流式返回全部结束后统一获取结果，无法实时获取流式过程中的返回数据。该需求场景为将其他接口作为插件接入工作流，适配基于大模型的流式响应应用。

## 可能原因
目前HTTP插件未配置stream参数支持项，且不同流式接口的响应格式无统一标准，难以通用捕获结构化数据。同时流式响应需等待全部内容返回后才能完成后续处理，无法实现实时流式交互。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新正式版本。
2. 检查工作流中HTTP插件的配置项，确认未提供stream相关的配置参数。
3. 确认目标接口的返回类型是否为流式响应格式。

## 解决与验证
目前官方暂未计划支持HTTP插件的流式功能。可将目标接口封装为OpenAI兼容的接口响应后，作为模型输出接入工作流。若需自定义处理流式数据，可通过编写代码添加stream=True参数获取实时流返回结果，再对接至工作流流程中。需注意不同流式接口的格式存在差异，需按实际环境确认结构化数据的处理方式。

> 来源: [FastGPT GitHub issue #2643](https://github.com/labring/FastGPT/issues/2643)
