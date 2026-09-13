---
title: 解决FastGPT中vllm加载模型时不显示思考过程的问题
slug: /zh/troubleshoot/fastgpt-vllm-reasoning-display-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3701
source_type: GitHub issue
---

# 解决FastGPT中vllm加载模型时不显示思考过程的问题

## 现象
使用FastGPT 4.8.20版本，通过vllm-v0.7.1加载deepseek-r1-qwen-1.5b模型时，接口返回结果包含reasoning_content字段，但对话界面仅展示content字段的内容，未显示思考过程。部分部署场景下会出现乱码、重复输出的问题。

## 可能原因
未配置模型支持输出思考的相关参数。系统仅识别model ID为deepseek-reasoner的响应，其他模型ID即使包含reasoning_content字段也不会展示思考过程。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.8.20，vllm版本为0.7.1，以及所加载的模型信息。
2.  检查模型接口返回的字段，确认是否存在reasoning_content字段。
3.  核对当前使用的模型ID是否为deepseek-reasoner，或是否存在未启用的思考内容展示配置。

## 解决与验证
可通过两种方式配置以展示思考过程：在FastGPT配置文件中添加 `"reasoning": true` 字段，启用思考内容展示；添加对应UI配置项，开启模型思考内容展示功能。若使用非deepseek-reasoner的模型ID，需确保配置正确以识别reasoning_content字段。对于vllm部署出现的乱码、重复输出问题，具体参数需按实际环境确认。

> 来源: [FastGPT GitHub issue #3701](https://github.com/labring/FastGPT/issues/3701)
