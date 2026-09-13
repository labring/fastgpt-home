---
title: 解决FastGPT v4.6.4文本内容提取无法提取目标字段的问题
slug: /zh/troubleshoot/fastgpt-text-extract-field-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/614
source_type: GitHub issue
---

# 解决FastGPT v4.6.4文本内容提取无法提取目标字段的问题

## 现象
在FastGPT v4.6.4私有部署版本中，使用实验室预约范例的测试文本运行文本内容提取工具，尝试提取姓名、时间、实验室名三类目标字段时，所有字段均返回空值。该场景下本地模型通过text-generation-webui载入yentinglin/Taiwan-LLaMa-v1.0模型，用户预期可正确提取目标字段，并通过HTTP模块将结果发送至Python API。

## 可能原因
结合当前问题场景，可能的原因需按实际部署环境确认，包括：本地加载的大模型对结构化信息提取的指令遵循能力不足；文本内容提取工具的提示词配置未适配目标模型的输出格式；模型调用或HTTP模块的相关配置参数存在偏差。

## 排查步骤
1. 确认当前运行的FastGPT版本为v4.6.4，且为私有部署模式。
2. 核对本地模型的加载配置，确认是否通过text-generation-webui载入yentinglin/Taiwan-LLaMa-v1.0模型。
3. 检查文本内容提取工具的字段配置，确认已正确设置需提取的姓名、时间、实验室名三类目标字段。
4. 调整文本提取的提示词格式，明确指定输出要求，重新运行提取任务。
5. 验证HTTP模块的调用配置，确认目标接收接口的参数匹配需求。

## 解决与验证
若排查后发现为模型指令遵循能力不足，可调整文本提取的提示词，明确要求模型按指定格式返回提取结果；若为配置偏差，需修正对应环节的参数设置。验证时重新运行文本内容提取任务，确认可正确提取姓名、时间、实验室名三类字段，并成功通过HTTP模块将结果发送至Python API。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/614)
