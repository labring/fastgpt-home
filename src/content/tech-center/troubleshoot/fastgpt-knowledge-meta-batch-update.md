---
title: 解决FastGPT知识库文件级元信息配置与搜索召回问题
slug: /zh/troubleshoot/fastgpt-knowledge-meta-batch-update
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/867
source_type: GitHub issue
---

# 解决FastGPT知识库文件级元信息配置与搜索召回问题

## 现象
用户希望在FastGPT知识库的文件级别设置元信息（如文件名、作者）作为搜索召回依据，当前通过API修改或页面单条修改数据索引的操作效率较低。

## 可能原因
当前FastGPT未提供便捷的知识库文件级元信息批量配置入口，仅支持单条修改或API调用，导致配置操作不便。

## 排查步骤
1. 明确需配置元信息的知识库文件范围与具体内容
2. 测试当前可用的元信息配置方式，确认是否为单条页面修改或API调用
3. 需按实际环境评估当前操作是否满足业务需求

## 解决与验证
临时解决方法为编写Python脚本，批量更新知识库collection内的所有chunk索引。需按实际业务场景调整脚本逻辑与参数，完成元信息的批量配置。验证时可在搜索环节确认配置的元信息可被作为召回依据。

> 来源: [FastGPT GitHub issue #867](https://github.com/labring/FastGPT/issues/867)
