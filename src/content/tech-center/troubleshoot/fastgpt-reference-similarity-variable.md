---
title: 配置FastGPT引用模板的相似度变量以调整输出内容
slug: /zh/troubleshoot/fastgpt-reference-similarity-variable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/380
source_type: GitHub issue
---

# 配置FastGPT引用模板的相似度变量以调整输出内容

## 现象
引用模板无法基于匹配结果的相似度调整输出内容，无法实现根据相似度差异生成差异化回答。

## 可能原因
FastGPT的引用模板默认未集成相似度相关变量，无法获取匹配结果的相似度数值用于动态调整回答逻辑。

## 排查步骤
1. 确认当前FastGPT版本是否包含#439提交的更新，可通过查看版本更新日志或提交记录核对
2. 检查引用模板的配置内容，确认是否预留了相似度变量的配置位置
3. 核对变量的官方命名规则，确保使用正确的变量名称

## 解决与验证
在引用模板中添加官方新增的score变量，即可在回答过程中基于该变量获取匹配结果的相似度值，实现根据相似度差异调整输出内容。完成配置后，可通过测试不同匹配相似度的输入，验证回答内容是否随相似度变化调整。

> 来源: [FastGPT GitHub issue #380](https://github.com/labring/FastGPT/issues/380)
