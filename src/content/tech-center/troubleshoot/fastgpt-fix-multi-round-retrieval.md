---
title: 解决FastGPT多轮对话重复检索知识库与Token占用过高问题
slug: /zh/troubleshoot/fastgpt-fix-multi-round-retrieval
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4416
source_type: GitHub issue
---

# 解决FastGPT多轮对话重复检索知识库与Token占用过高问题

## 现象
每一次问答都调用知识库，产生大量无用Token占用，拖长回答时间。多轮对话中，即使上一轮问答已召回相关知识库分块，仍会重复检索，导致上下文冗余，难以记住前序问题。

## 可能原因
多轮对话编排逻辑存在缺陷，未添加条件判断，每次问答都执行知识库检索流程，未区分是否需要依赖历史上下文或当前问题是否已有匹配的知识库结果。

## 排查步骤
1. 检查多轮对话的编排配置，确认是否存在每次问答都触发知识库检索的逻辑。
2. 核对历史对话上下文，确认当前问题是否可通过已召回的知识库分块直接解答。
3. 确认是否有对话历史的上下文提取与匹配逻辑。

## 解决与验证
通过在多轮问答流程中添加条件判断，仅当当前问题无法通过历史对话上下文直接解答时，才执行知识库检索。FastGPT自带mineru PDF解析程序和API接口，向量化可使用bge-m3模型。mineru PDF解析与mark PDF的对比效果需按实际环境确认。验证时，开启条件判断逻辑后，观察多轮对话的知识库检索次数、Token占用量及回答时长是否符合预期。

> 来源: [FastGPT GitHub issue #4416](https://github.com/labring/FastGPT/issues/4416)
