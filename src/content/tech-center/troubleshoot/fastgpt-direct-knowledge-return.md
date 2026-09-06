---
title: 配置FastGPT实现高相似度问答直接返回知识库内容
slug: /zh/troubleshoot/fastgpt-direct-knowledge-return
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/390
source_type: GitHub issue
---

# 配置FastGPT实现高相似度问答直接返回知识库内容

## 现象
用户希望在FastGPT中配置相似度阈值（如90%），当用户问题与知识库内容相似度超过阈值时，直接返回最高匹配的知识库QA内容并结束对话；未达阈值时使用AI对话加工结果。该需求用于接口调用场景，避免AI模型处理带来的延迟。用户尝试相关配置后，发现HTTP模块返回无法直接输出到对话框，同时希望支持流式返回结果。

## 可能原因
高相似度匹配结果可能存在多个，内置统一逻辑难以适配所有场景；使用HTTP模块自定义逻辑时，未按照官方示例配置返回格式，导致无法直接将结果输出到对话对话框。

## 排查步骤
1. 明确业务需求，确定相似度阈值及直接返回的触发条件
2. 梳理知识库匹配逻辑，获取相似度计算的相关参数
3. 检查HTTP模块的配置，参考官方示例调整返回内容格式
4. 测试流式返回的配置是否符合系统要求

## 解决与验证
使用HTTP模块自定义排序和输出逻辑，可直接返回知识库QA结果，无需经过AI对话。按照官方示例配置HTTP模块的返回内容，即可将结果直接输出到对话对话框。若需实现流式返回，需参考官方文档中的示例进行配置。

> 来源: [FastGPT GitHub issue #390](https://github.com/labring/FastGPT/issues/390)
