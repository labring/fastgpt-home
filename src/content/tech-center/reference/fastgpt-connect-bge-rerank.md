---
title: FastGPT接入bge-rerank重排模型的配置操作指南
slug: /zh/reference/fastgpt-connect-bge-rerank
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/bge-rerank
source_type: 官方文档小节
---

# FastGPT接入bge-rerank重排模型的配置操作指南

## 结论
完成配置后可将bge-rerank重排模型接入FastGPT系统，用于优化搜索结果的重排序环节。该配置可提升搜索结果的相关性排序效果，属于FastGPT本地模型使用的标准流程。

## 具体怎么做
1. 进入FastGPT的本地模型使用配置页面
2. 打开模型配置方案模块
3. 查找bge-rerank重排模型的配置入口
4. 参考环境变量说明完成所需参数的配置

## 注意事项
1. 配置过程需严格遵循环境变量说明的要求，不得修改未提及的参数
2. 若配置后出现异常，可参考模型问题排查的相关内容进行处理
3. 该配置仅支持在FastGPT自部署环境下完成

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/bge-rerank)
