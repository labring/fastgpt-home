---
title: 解决FastGPT无法自动化评测知识库搜索精度的问题
slug: /zh/troubleshoot/fastgpt-knowledge-search-evaluation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1191
source_type: GitHub issue
---

# 解决FastGPT无法自动化评测知识库搜索精度的问题

## 现象
当前FastGPT仅支持手动发起搜索测试，无法通过自动化流程完成知识库搜索精度的客观评估，也无法生成可量化的搜索性能指标。

## 可能原因
FastGPT当前版本未内置自动化搜索精度评测的功能，仅提供手动测试的交互入口。

## 排查步骤
1. 确认当前FastGPT已升级到最新版本，检查是否已新增自动化评测相关功能。
2. 检查FastGPT的配置项与公开接口，确认是否存在可用于自动化评测的参数或调用方式，需按实际环境确认。
3. 查阅FastGPT官方README文档，确认是否有自动化评估的相关说明，需按实际环境确认。

## 解决与验证
如需实现自动化搜索精度评测，可参考以下流程：
1. 问题生成：调用大语言模型从知识库文档中自动生成相关问题。
2. 问题/上下文对创建：为每个生成的问题配对对应的正确上下文块，即问题答案或相关信息所在的文档段落，形成问题-上下文对。
3. 搜索评估：使用生成的问题调用FastGPT的搜索接口，记录返回的上下文块；对比返回结果与预设的正确上下文块，计算topk命中率与平均倒数排名（MRR）指标。
验证时，可通过运行多组测试用例，查看生成的指标是否符合预期的搜索性能表现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1191)
