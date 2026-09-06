---
title: 解决FastGPT中Qwen服务的品牌与API端点配置问题
slug: /zh/troubleshoot/fastgpt-qwencloud-config-adjust
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7503
source_type: GitHub issue
---

# 解决FastGPT中Qwen服务的品牌与API端点配置问题

## 现象
在FastGPT中配置Qwen系列模型时，现有配置无法直接匹配官方QwenCloud的API端点、品牌标识与官方文档链接，且无法区分直接调用QwenCloud与用户自定义聚合网关的配置。

## 可能原因
FastGPT内置的Qwen服务提供商未更新为官方QwenCloud的品牌信息、官方链接、API端点与模型维护来源，未针对国际用户的官方路径做适配，也未区分直接调用QwenCloud与聚合网关的配置逻辑。

## 排查步骤
1.  查看FastGPT中已保存的Qwen模型配置，记录当前的API端点、品牌名称与关联链接。
2.  对照官方QwenCloud的公开信息，包括官网https://www.qwencloud.com/、API密钥获取页面https://home.qwencloud.com/api-keys、开发者文档https://docs.qwencloud.com/developer-guides/getting-started/introduction、模型列表页面https://www.qwencloud.com/models与定价页面https://docs.qwencloud.com/developer-guides/getting-started/pricing，确认所需的API端点、密钥获取路径等官方参数。
3.  对比现有配置与官方QwenCloud的参数差异，明确需要调整的内容。
4.  确认是否需要保留已保存的配置ID，或新增独立的QwenCloud专属配置。

## 解决与验证
若选择更新现有服务提供商配置，将原有Qwen配置的品牌、官方链接、API端点与模型维护来源替换为QwenCloud官方内容，保留已保存的配置ID。若选择新增独立预设，创建新的QwenCloud专属服务提供商配置，保留原有Qwen配置不变。验证时，使用官方QwenCloud的API密钥调用配置后的模型，确认可正常访问模型，且官方文档、定价等信息可正确展示，原有配置不受影响。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/7503)
