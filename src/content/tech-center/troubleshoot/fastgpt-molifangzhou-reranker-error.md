---
title: 解决FastGPT中自定义模力方舟reranker模型调用报错的问题
slug: /zh/troubleshoot/fastgpt-molifangzhou-reranker-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5478
source_type: GitHub issue
---

# 解决FastGPT中自定义模力方舟reranker模型调用报错的问题

## 现象
在FastGPT私有部署V4.12.1版本中，添加自定义模力方舟平台的reranker模型（Qwen3-Reranker-8B、bge-reranker-v2-m3）时，会返回报错信息：`{"error":{"code":"400","message":"[Bad Request] Validation error for body application/json: provided array should have size <= 25","type":"server_error"}}`。此时同平台的索引模型可正常使用，替换为同型号的其他reranker模型则无报错。

## 可能原因
报错信息明确提示请求体的数组大小超出限制，结合现象可推测，模力方舟平台对reranker模型的输入文本数组长度设置了不超过25条的限制，当传入的文本数量超出该上限时，会触发此Bad Request错误。此外，也存在FastGPT的自定义平台配置与模力方舟平台的接口参数要求不匹配的可能性。

## 排查步骤
1.  统计调用reranker模型时传入的文本数组的条目数量，确认是否超过25条。
2.  查询模力方舟平台公开的reranker模型输入参数限制，确认数组大小的上限要求。
3.  检查FastGPT中自定义模力方舟平台的reranker模型配置，确认接口地址、请求头、请求格式等参数是否与平台要求一致。
4.  减少传入的文本数组条目数，重新发起调用，观察报错是否消失。
5.  对比同平台可正常使用的索引模型与报错的reranker模型的配置，确认是否存在参数差异。

## 解决与验证
解决方法为将传入reranker模型的文本数组条目数控制在25条以内，符合模力方舟平台的输入限制。验证步骤：调整输入文本的数量，使其不超过25条，重新发起调用，确认报错信息不再出现，reranker模型可正常返回结果。若仍存在报错，需进一步核对FastGPT的自定义平台配置与模力方舟平台的接口要求是否完全匹配。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5478)
