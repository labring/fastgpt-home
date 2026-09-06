---
title: 解决FastGPT自定义大模型及向量模型配置疑问
slug: /zh/troubleshoot/fastgpt-model-configuration-questions
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/323
source_type: GitHub issue
---

# 解决FastGPT自定义大模型及向量模型配置疑问

## 现象
用户尝试接入本地baichuan2-13b-chat模型，同时对ChatGLM2-6B的配置存在疑问，不清楚ChatModels与VectorModels的配置对应关系，以及是否必须使用M3E作为向量模型。

## 可能原因
未明确区分对话模型与向量模型的配置职责，对不同类型模型的配置要求存在认知偏差，或未查阅官方自定义模型配置指引。

## 排查步骤
1. 区分对话模型与向量模型的配置场景，明确各自对应的配置项。
2. 查阅官方提供的ChatGLM2自定义模型配置文档，获取基础配置流程。
3. 核对已配置的模型类型与实际部署的模型是否匹配。
4. 确认向量模型的选型需求，需按实际环境确认是否存在强制选型要求。

## 解决与验证
接入自定义大模型可参考官方提供的ChatGLM2自定义模型配置文档。针对ChatGLM2-6B的配置，对话模型对应ChatModels配置项，向量模型对应VectorModels配置项。向量模型的选型需按实际环境确认，无强制要求必须使用M3E。本地baichuan2-13b-chat模型的接入可遵循相同的自定义模型配置流程。

> 来源: [FastGPT GitHub issue #323](https://github.com/labring/FastGPT/issues/323)
