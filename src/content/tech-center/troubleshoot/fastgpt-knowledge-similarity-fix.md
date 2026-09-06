---
title: 解决FastGPT知识库导入后相似度计算数值异常问题
slug: /zh/troubleshoot/fastgpt-knowledge-similarity-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/641
source_type: GitHub issue
---

# 解决FastGPT知识库导入后相似度计算数值异常问题

## 现象
用户在FastGPT中导入知识库后，执行相似度计算得到的数值为100、200多，未处于0到1的常规正常区间，该数值未符合相似度计算的标准输出范围，本次问题场景中使用的embedding模型为m3e-large。

## 可能原因
未对相似度计算结果进行归一化处理，该处理缺失会导致原始相似度分数未被缩放至0到1的标准区间内。

## 排查步骤
1. 确认当前FastGPT环境中配置的embedding模型类型，本次场景为m3e-large。
2. 检查相似度计算环节的相关配置参数，确认是否存在归一化相关设置。
3. 核对知识库导入流程与相似度计算流程的参数传递逻辑。

## 解决与验证
为相似度计算环节添加归一化处理配置，即可修正数值异常问题。完成配置更新后，重新执行相似度计算，查看输出数值是否处于0到1的正常区间，即可验证问题是否解决。

> 来源: [FastGPT GitHub issue #641](https://github.com/labring/FastGPT/issues/641)
