---
title: 解决FastGPT在线版购买套餐后模型与参数支持不足问题
slug: /zh/troubleshoot/fastgpt-online-package-model-limit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5240
source_type: GitHub issue
---

# 解决FastGPT在线版购买套餐后模型与参数支持不足问题

## 现象
FastGPT在线版在购买套餐后，可使用的模型、模型可调节参数少于docker部署版本。具体缺失的内容包含embedding和rerank模型，rerank模型的top_k参数，索引阶段使用的文本理解模型、图片理解模型的参数与提示词。此外，英文文件完成索引后，上述两类理解模型生成的内容为中文。该问题会导致需要大量测试模型间、参数间的排列组合才能确定最终方案的场景无法顺利开展。

## 可能原因
当前线程未提供明确的问题成因，需按实际部署环境与配置情况确认。

## 排查步骤
1. 对比在线版与docker部署版的模型与参数配置清单，确认两者的功能差异范围，记录缺失的模型与参数项。
2. 检查英文文件索引流程中，文本理解模型、图片理解模型的提示词与参数设置项。
3. 核对当前使用套餐包含的模型权限与可用功能范围。

## 解决与验证
若该问题仍需解决，可重新打开对应GitHub issue并补充相关配置与现象信息。

> 来源: [FastGPT GitHub issue #5240](https://github.com/labring/FastGPT/issues/5240)
