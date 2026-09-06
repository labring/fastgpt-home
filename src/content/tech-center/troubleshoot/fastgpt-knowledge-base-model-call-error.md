---
title: 解决FastGPT使用知识库时模型调用路径异常报错问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-model-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1600
source_type: GitHub issue
---

# 解决FastGPT使用知识库时模型调用路径异常报错问题

## 现象
用户使用FastGPT 4.8.1私有部署版本，配置了两台主机的模型，分别为chatglm和ollama，并通过oneapi完成模型配置。当模型配置列表中第一个模型为未启动的chatglm，第二个为ollama模型时，使用ollama模型且不调用知识库时可正常完成对话，但添加知识库后，调用会指向chatglm的主机IP并触发报错。

## 可能原因
FastGPT在启用知识库的场景下，模型路由逻辑未正确关联当前选中的目标模型，而是调用了配置列表中第一个模型的地址，导致出现IP不匹配的报错。

## 排查步骤
1. 确认当前FastGPT版本为4.8.1，查看模型配置列表的先后顺序。
2. 核对当前选中的模型对应的主机IP，与报错提示中的调用IP是否一致。
3. 测试不启用知识库时，使用当前选中的模型是否可以正常完成对话。
4. 检查oneapi中配置的模型地址是否与对应主机的服务地址一致。

## 解决与验证
将当前常用的目标模型调整至配置列表的第一位，或确保配置列表中第一个模型处于正常启动状态。调整完成后，启用知识库并使用目标模型发起对话，确认调用地址正确，无报错且对话流程正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1600)
