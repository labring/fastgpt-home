---
title: 解决FastGPT知识库匹配相似性异常问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-similarity-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/587
source_type: GitHub issue
---

# 解决FastGPT知识库匹配相似性异常问题

## 现象
使用chatglm3+m3e-base模型组合时，出现知识库匹配相似性差距过大的问题，无法匹配到知识库原有知识。另有场景出现相似度过小的问题，导致对话回答无引用信息。

## 可能原因
问题可能与向量模型或语言模型的配置、知识库向量生成的升维处理相关，需按实际环境确认具体诱因。

## 排查步骤
1. 确认当前使用的向量模型与语言模型的具体选型，记录相关配置信息。
2. 检查知识库向量生成环节的升维配置，确认是否完成升维至1536的处理。
3. 验证相似性匹配的相关配置参数是否符合业务需求。
4. 测试向量模型的输出结果，确认向量生成是否存在异常。

## 解决与验证
1. 核对知识库向量生成时的升维配置，确保与向量模型输出维度一致，即1536维度。
2. 确认向量模型与语言模型的选型适配当前业务场景。
3. 重新生成知识库向量并执行匹配测试，观察相似性结果是否恢复正常。

> 来源: [FastGPT GitHub issue #587](https://github.com/labring/FastGPT/issues/587)
