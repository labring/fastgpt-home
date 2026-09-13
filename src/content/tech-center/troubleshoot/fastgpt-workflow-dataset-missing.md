---
title: 修复FastGPT导出工作流时知识库配置丢失的问题
slug: /zh/troubleshoot/fastgpt-workflow-dataset-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7555
source_type: GitHub issue
---

# 修复FastGPT导出工作流时知识库配置丢失的问题

## 现象
创建并保存包含知识库搜索节点的工作流后，点击左上角操作导出JSON文本。导出的JSON中datasets.value字段为[]，知识库搜索节点关联的知识库丢失。跨环境导入该导出的JSON时，需重新手动勾选目标知识库。实际结果为知识库配置丢失，未保留原有节点的关联配置。

## 可能原因
导出工作流JSON时未正确附加知识库关联配置信息，导致datasets.value字段为空数组，无法在导入时识别原有知识库配置。

## 排查步骤
1. 完成工作流创建、知识库搜索节点配置、保存操作后，执行左上角导出JSON的操作。
2. 打开导出的JSON文本，查看datasets.value字段的具体内容。
3. 对比预期的知识库标识，确认字段是否为空。
4. 尝试跨环境导入该导出的JSON，观察是否需要重新配置知识库。

## 解决与验证
1. 检查工作流保存状态，确保在导出前已完成知识库节点的配置保存。
2. 验证导出的JSON中datasets.value字段是否包含正确的知识库关联信息。
3. 跨环境导入JSON时，若发现知识库丢失，手动重新勾选目标知识库并保存工作流。
4. 再次导出工作流JSON，确认datasets.value字段已包含正确的知识库标识。

> 来源: [FastGPT GitHub issue #7555](https://github.com/labring/FastGPT/issues/7555)
