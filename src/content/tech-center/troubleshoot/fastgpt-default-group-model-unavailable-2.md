---
title: 解决FastGPT中default分组无gpt-3.5-turbo-16k可用渠道的问题
slug: /zh/troubleshoot/fastgpt-default-group-model-unavailable-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/215
source_type: GitHub issue
---

# 解决FastGPT中default分组无gpt-3.5-turbo-16k可用渠道的问题

## 现象
在FastGPT中配置模型后执行知识库QA流程时，出现报错信息“当前分组 default 下对于模型 gpt-3.5-turbo-16k 无可用渠道”。此前使用yml配置OpenAI接口可正常完成知识库QA，更换为OneAPI接口后该报错重现。

## 可能原因
1. 未将gpt-3.5-turbo-16k配置为可用于知识库QA的模型；
2. 未使用支持对应功能的FastGPT版本；
3. 更换为OneAPI接口后，未正确配置对应模型的调用渠道。

## 排查步骤
1. 确认当前使用的FastGPT版本是否为v4.2.1及以上；
2. 检查config.json或yml配置文件，确认已添加gpt-3.5-turbo-16k作为QA可用模型；
3. 若使用OneAPI接口，确认OneAPI中已配置gpt-3.5-turbo-16k模型；
4. 检查default分组的模型渠道配置，确认已绑定对应模型。

## 解决与验证
1. 升级FastGPT至v4.2.1及以上版本；
2. 在配置文件中添加gpt-3.5-turbo-16k作为知识库QA的可用模型；
3. 若使用OneAPI接口，需在OneAPI中配置gpt-3.5-turbo-16k模型；
4. 重新执行知识库QA流程，确认不再出现“当前分组 default 下对于模型 gpt-3.5-turbo-16k 无可用渠道”的报错。

> 来源: [FastGPT GitHub issue #215](https://github.com/labring/FastGPT/issues/215)
