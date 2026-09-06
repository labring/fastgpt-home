---
title: 解决FastGPT接入ChatGLM2及相关配置的问题
slug: /zh/troubleshoot/fastgpt-chatglm2-configuration-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/123
source_type: GitHub issue
---

# 解决FastGPT接入ChatGLM2及相关配置的问题

## 现象
用户希望在FastGPT中完全使用ChatGLM2完成所有业务流程，包括问答对生成与问题回复，同时希望支持类似的训练功能，且询问是否可完全脱离原有依赖工具。另有用户反馈已可接入该模型，但对训练功能的使用存在疑问，还有用户询问该功能的发布时间。

## 可能原因
可能原因包含三类：一是未使用支持自定义模型抽离配置的FastGPT版本；二是未完成ChatGLM2相关的模型参数配置；三是对自定义模型的训练功能存在使用需求，但未明确相关适配情况。

## 排查步骤
1. 确认当前使用的FastGPT版本，查看是否为4.1及以上版本；
2. 检查是否已完成ChatGLM2相关的模型参数配置；
3. 若需使用训练功能，需按实际环境确认相关适配情况。

## 解决与验证
在FastGPT 4.1及以上版本中，qa生成模型与向量模型已支持抽离配置，可完成ChatGLM2的接入。配置完成后，即可使用ChatGLM2完成问答对生成与问题回复。如需使用相关训练功能，需按实际环境确认适配情况。验证时，可通过配置ChatGLM2相关参数后，执行问答对生成与问题回复流程，若流程正常运行，则表示接入成功。

> 来源: [FastGPT GitHub issue #123](https://github.com/labring/FastGPT/issues/123)
