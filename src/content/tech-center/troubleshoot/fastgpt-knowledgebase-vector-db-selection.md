---
title: FastGPT知识库创建时向量库类型选择配置指南
slug: /zh/troubleshoot/fastgpt-knowledgebase-vector-db-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1716
source_type: GitHub issue
---

# FastGPT知识库创建时向量库类型选择配置指南

## 现象
当前使用FastGPT创建知识库时，无法自主选择向量库类型，仅能使用默认配置的向量库。不同数据量的知识库无法灵活适配不同向量库，数据量较小的知识库使用高规格向量库会造成资源浪费。

## 可能原因
当前FastGPT未实现多类型向量库热更换以及embedding模型重建向量数据的功能，导致无法在知识库创建阶段自主选择向量库类型，无法满足按数据量灵活选型的需求。

## 排查步骤
1.  确认当前部署的FastGPT版本是否支持多向量库热更换功能。
2.  进入知识库创建页面，检查是否存在向量库类型选择的配置项。
3.  查阅项目官方文档中关于知识库配置的说明，确认是否存在可选向量库的相关设置。

## 解决与验证
根据项目反馈，需支持embedding模型重建向量数据与多类型向量库热更换功能，该issue应覆盖该需求。待对应功能迭代上线后，在知识库创建流程中即可找到向量库类型选择选项，可根据实际数据量选择pg或zilliz。验证时可查看知识库数据的存储逻辑是否匹配所选向量库的配置要求，确认数据正常存储至对应向量库中。

> 来源: [FastGPT GitHub issue #1716](https://github.com/labring/FastGPT/issues/1716)
