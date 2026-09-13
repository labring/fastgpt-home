---
title: FastGPT知识库数据集细分选择问题解决指南
slug: /zh/troubleshoot/fastgpt-knowledge-dataset-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5114
source_type: GitHub issue
---

# FastGPT知识库数据集细分选择问题解决指南

## 现象
当前FastGPT仅支持选择完整知识库进行检索，无法细分到选择知识库内的单个或多个数据集。当单个知识库包含多个数据集时，无法单独指定其中部分数据集供工作流使用，易造成资源浪费。

## 可能原因
需按实际环境确认，当前FastGPT的知识库检索配置未开放细分到单个或多个数据集的选择选项，仅支持全知识库范围的检索。

## 排查步骤
1. 确认业务场景是否需要在单个知识库内选取部分数据集用于检索。
2. 进入FastGPT的检索或工作流配置页面，查看知识库选择相关的配置项。
3. 检查是否存在可细分选择数据集的选项，记录未找到对应功能的情况。

## 解决与验证
可通过临时配置实现指定数据集的检索：
1. 配置知识库检索时，指定目标数据集对应的索引参数。
2. 将检索相似度阈值（检索度）设置为0.99，缩小检索匹配范围，仅命中指定的目标文件或数据集。
3. 执行检索操作，验证返回结果是否仅包含指定的数据集内容。

> 来源: [FastGPT GitHub issue #5114](https://github.com/labring/FastGPT/issues/5114)
