---
title: 解决FastGPT知识库搜索相似度数值异常偏高问题
slug: /zh/troubleshoot/fastgpt-knowledge-similarity-normalization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/221
source_type: GitHub issue
---

# 解决FastGPT知识库搜索相似度数值异常偏高问题

## 现象
本地部署FastGPT后，在知识库内执行搜索测试时，返回的单条结果相似度数值达到276.6083。在线使用版本的搜索结果相似度均控制在1以内。

## 可能原因
用于生成向量的embedding模型未执行归一化处理，导致相似度计算结果超出合理范围。

## 排查步骤
1. 确认当前使用的embedding模型在编码句子时是否配置了归一化相关参数。
2. 检查知识库向量生成流程中，是否对embedding模型的输出结果执行了归一化处理。
3. 对比本地部署与在线版本的embedding模型配置差异。

## 解决与验证
在调用embeddings_model.encode方法时，添加normalize_embeddings=True参数，该参数用于对embedding结果执行归一化处理，确保相似度计算结果处于合理范围。具体调用格式为：`embeddings_model.encode(sentences=text, normalize_embeddings=True)`。完成参数配置后，重新生成知识库向量，再次执行搜索测试，确认相似度数值恢复至1以内的合理范围。

> 来源: [FastGPT GitHub issue #221](https://github.com/labring/FastGPT/issues/221)
