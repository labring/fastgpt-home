---
title: FastGPT 多套向量结果保留：历史需求与模型对比检查
slug: /zh/troubleshoot/fastgpt-retain-multi-vector-results
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4499
source_type: GitHub issue
---

# FastGPT 多套向量结果保留：历史需求与模型对比检查

同一知识库保留多套向量模型结果是历史功能需求。模型对比应先确认向量结果的存储与切换行为，并使用独立测试知识库保存各模型的实验数据。

## 历史范围与已知事实

[Issue #4499](https://github.com/labring/FastGPT/issues/4499) 于 2025 年 4 月描述切换模型需要重新向量化、旧结果被覆盖的现象，并请求保存多套结果。维护者提到了管理成本，原记录缺少已实现多版本切换的证据和明确部署版本。该记录可用于理解需求背景。

## 诊断与对比步骤

1. 记录当前知识库、向量模型和维度，保留原始文件及导出备份。模型切换行为在测试副本中观察，记录是否重新训练及原索引的变化。
2. 为待比较的模型分别建立测试知识库，导入同一批材料，并保持切块、数据范围和测试问题一致。
3. 分别关联对应知识库执行测试。官方[知识库搜索节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/dataset_search) 要求同一次关联的多个知识库使用相同向量模型。
4. 对照[搜索参数说明](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine) 固定检索模式、引用上限和重排配置，记录命中文段、回答依据、耗时与训练成本。

## 验证结果

确认各测试知识库的模型和数据独立保存，再对固定问题集比较召回质量。单个知识库的多套索引切换能力，需要用对应版本的公开说明及实测结果确认。
