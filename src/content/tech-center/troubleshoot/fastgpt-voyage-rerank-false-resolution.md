---
title: 解决FastGPT中voyage rerank-2重排显示false的问题
slug: /zh/troubleshoot/fastgpt-voyage-rerank-false-resolution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4255
source_type: GitHub issue
---

# 解决FastGPT中voyage rerank-2重排显示false的问题

## 现象
在FastGPT 4.9.1私有部署版本的知识库中，配置`Pro/BAAI/bge-reranker-v2-m3`模型作为重排工具时，可以正常实现召回文本的重排；但配置voyage的`rerank-2`模型时，重排结果始终显示为false。

## 可能原因
结合用户反馈的情况，主要可能原因包括：FastGPT当前版本未适配voyage rerank-2重排模型；模型配置参数存在错误；模型调用的相关权限或链路存在异常。其中未适配模型为最直观的推测方向，其余项需按实际环境确认。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为4.9.1，核对知识库重排模型的配置信息，确保模型名称、调用参数等与模型官方要求一致。
2. 使用voyage rerank-2模型的官方调用工具，测试模型能否正常返回重排结果，验证模型本身可用性。
3. 查看FastGPT的运行日志，检索是否存在与voyage rerank-2模型调用相关的报错内容。
4. 对比可正常工作的`Pro/BAAI/bge-reranker-v2-m3`模型的配置，排查两者的配置差异。

## 解决与验证
若确认是FastGPT版本未适配voyage rerank-2模型，需等待官方更新以添加对该模型的支持；若为配置参数错误，需修正模型的调用参数；若为调用权限或链路问题，需确认模型key的权限及网络连通性是否正常。验证方式为：重新配置voyage rerank-2模型后，发起知识库重排测试，查看是否不再显示false，可正常返回重排结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4255)
