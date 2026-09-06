---
title: 解决FastGPT私有部署向量检索结果分数值一致问题
slug: /zh/troubleshoot/fastgpt-private-retrieval-score-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1923
source_type: GitHub issue
---

# 解决FastGPT私有部署向量检索结果分数值一致问题

## 现象
使用V4.8.5私有部署版本的FastGPT，搭配bge-m3或m3e-large向量模型进行向量检索时，所有返回结果的分数值完全一致，无法正常使用搜索结果。

## 可能原因
暂未明确该问题的具体触发原因，需结合实际部署环境逐步排查。该问题同时出现在bge-m3与m3e-large两款向量模型中，推测与向量模型调用、向量数据库召回逻辑或FastGPT检索配置相关。

## 排查步骤
1. 确认当前FastGPT为V4.8.5私有部署版本。
2. 核对使用的向量模型为bge-m3或m3e-large，确认模型可正常加载与调用。
3. 查看向量检索的相关配置，确认未存在异常修改。
4. 检查向量数据库的召回与分数计算环节是否存在异常。

## 解决与验证
目前暂无通用的一键修复方案，可按以下步骤尝试验证与修复：
1. 调整向量模型的调用参数，重新测试向量检索功能。
2. 检查FastGPT的向量检索模块，确认分数计算逻辑未出现异常。
3. 更换其他兼容向量模型，验证问题是否复现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1923)
