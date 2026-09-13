---
title: 解决FastGPT多知识库全文检索性能差与排序异常问题
slug: /zh/troubleshoot/fastgpt-multi-dataset-retrieval-sort-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4835
source_type: GitHub issue
---

# 解决FastGPT多知识库全文检索性能差与排序异常问题

## 现象
当使用多个知识库ID进行全文检索时，会出现两个问题。一是检索整体耗时过长，尤其当知识库数量较多时。二是检索结果未按全局的全文检索分数排序，部分高分结果反而排在低分结果之后。在未启用问题优化的场景下，直接返回未排序的结果会引发功能异常，例如出现全文检索分数5.866的结果排在1.355结果之后的情况。

## 可能原因
存在两个核心问题。第一，代码会为每个知识库单独发起全文检索查询，当知识库数量较多时，并发查询会导致整体耗时显著增加。第二，每个知识库内部仅对自身的检索结果按分数排序，最终flat合并后的数组未进行全局排序，导致结果顺序混乱，未启用问题优化时直接返回该未排序数组会触发bug。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8.21，可选择公有云或私有部署版本。
2. 检查检索场景是否涉及多个知识库ID，且未配置全局结果排序逻辑。
3. 查看进入RRF阶段前的fullTextRecallList数据，对比各结果的全文检索分数，确认是否存在跨知识库的顺序异常。
4. 统计多知识库检索场景下的接口耗时，确认是否存在耗时过长的问题。

## 解决与验证
针对上述问题，需修改`packages/service/core/dataset/search/controller.ts`中的`searchDatasetData.fullTextRecall`函数。首先保留每个知识库的单库排序与分页逻辑，在所有知识库的检索结果flat合并后，新增全局按`score`字段降序排序的步骤。验证时可执行以下操作：1. 部署修改后的代码，重新进行多知识库全文检索，确认所有结果按全文检索分数全局降序排列。2. 测试多知识库场景下的接口耗时，确认耗时较修改前明显缩短。3. 验证未启用问题优化时，返回的结果仍保持全局排序的正确性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4835)
