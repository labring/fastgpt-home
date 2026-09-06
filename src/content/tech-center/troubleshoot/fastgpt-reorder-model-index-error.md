---
title: 修复FastGPT替换重排序模型后出现的列表索引越界报错
slug: /zh/troubleshoot/fastgpt-reorder-model-index-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3955
source_type: GitHub issue
---

# 修复FastGPT替换重排序模型后出现的列表索引越界报错

## 现象
用户在FastGPT私有部署环境中，将原bge重排序模型替换为conan-embedding-v1后，调用重排序接口报错。具体报错信息为`IndexError: list index out of range`，报错位置为代码第64行：`new_docs.append({"index": index, "text": query_docs.documents[index], "score": 1 / (1 + np.exp(-score))})`。经排查，报错源于代码第44行的`self.reranker.compute_score(pairs, normalize=True)`调用后，返回的分数列表长度与输入文档列表长度不一致。本次场景中，`query_docs.documents`列表长度为84，`scores`列表长度为168。

## 可能原因
调用重排序模型的`compute_score`接口后，返回的分数列表长度与输入的文档列表长度不匹配，导致后续通过文档索引访问列表时触发索引越界错误。本次场景中，输入的文档列表长度为84，但接口返回的分数列表长度为168，出现明显的长度不一致问题。

## 排查步骤
1. 打印并记录`query_docs.documents`的实际长度，以及调用`compute_score`后`scores`的实际长度，对比两者是否一致。
2. 检查重排序模型的初始化代码，确认`FlagReranker`的配置参数是否符合预期。
3. 梳理构造`pairs`参数的逻辑，确认每个查询与文档的配对数量是否符合模型输入要求。
4. 核对重排序模型的输入格式要求，确保`pairs`的结构正确。

## 解决与验证
1. 调整`pairs`的构造逻辑，确保每个查询仅与每个输入文档组成一对，避免重复配对导致分数列表长度翻倍。
2. 重新运行重排序接口，确认不再触发`IndexError: list index out of range`报错。
3. 验证生成的`new_docs`列表长度与`query_docs.documents`列表长度一致，确保后续索引访问不会出现越界问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3955)
