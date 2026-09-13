---
title: 解决FastGPT向量模型接口数据异常的排错方法
slug: /zh/troubleshoot/fastgpt-vector-data-normalization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2467
source_type: GitHub issue
---

# 解决FastGPT向量模型接口数据异常的排错方法

## 现象
FastGPT私有部署4.8.9版本中，向量模型接口返回的数据未经过归一化处理，引发相关功能异常。

## 可能原因
向量模型接口未对返回的向量数据执行归一化处理，无法匹配FastGPT的调用要求。

## 排查步骤
1. 确认当前FastGPT部署版本为私有部署4.8.9
2. 验证自有向量模型Key可正常调用接口，确认返回数据的原始格式
3. 检查接口返回的向量数据是否未经过归一化处理

## 解决与验证
在FastGPT与向量模型接口之间搭建中间层Web应用，实现向量数据的归一化处理。可通过Python编写实现，或使用熟悉的编程语言与框架完成开发。将中间层接入现有调用链路后，验证功能异常消失，且向量数据符合归一化要求。

> 来源: [FastGPT GitHub issue #2467](https://github.com/labring/FastGPT/issues/2467)
