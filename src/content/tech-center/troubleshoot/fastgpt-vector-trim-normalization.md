---
title: 解决FastGPT向量截断未归一化影响语义搜索的问题
slug: /zh/troubleshoot/fastgpt-vector-trim-normalization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3762
source_type: GitHub issue
---

# 解决FastGPT向量截断未归一化影响语义搜索的问题

## 现象
当输入的向量维度超过1536时，FastGPT会触发日志`The current vector dimension is ${vector.length}, and the vector dimension cannot exceed 1536. The first 1536 dimensions are automatically captured`，并直接截取前1536维向量。该处理未对截取后的向量做归一化，导致截取后的向量长度不一致，影响语义搜索的结果准确性。

## 可能原因
原代码中`packages\service\core\ai\embedding\index.ts`文件内的`unityDimensional`函数，仅对超过1536维的向量执行截断或补零操作，未对截取后的前1536维向量进行L2归一化处理。不同输入向量的模长存在差异，会导致语义搜索的相似度计算出现偏差。

## 排查步骤
1.  打开`packages\service\core\ai\embedding\index.ts`文件，定位`unityDimensional`函数。
2.  查看该函数的处理逻辑，确认是否仅对超长度向量进行截断或补零，未添加归一化步骤。
3.  输入维度大于1536的测试向量，运行语义搜索任务，观察搜索结果是否存在异常。
4.  对比不同超长度向量的处理结果，确认向量模长是否存在不一致的情况。

## 解决与验证
解决方法为修改`unityDimensional`函数，对超过1536维的向量，先截取前1536维，计算该子向量的L2范数，再将每个元素除以该范数完成归一化。可参考L2归一化的通用处理逻辑：先提取目标维度的子向量，计算其范数后对每个元素做除法操作。
验证步骤如下：
1.  将原函数替换为添加了归一化处理的优化代码。
2.  输入多个维度大于1536的测试向量，确认截取后的向量模长统一为1。
3.  运行语义搜索任务，验证搜索结果的一致性和准确性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3762)
