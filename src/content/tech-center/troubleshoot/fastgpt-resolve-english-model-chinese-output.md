---
title: 解决FastGPT全英文场景下模型输出中文的问题
slug: /zh/troubleshoot/fastgpt-resolve-english-model-chinese-output
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2247
source_type: GitHub issue
---

# 解决FastGPT全英文场景下模型输出中文的问题

## 现象
在Agent和QA Prompt、业务数据均为全英文的使用场景中，FastGPT调用的大模型会存在输出中文的情况。

## 可能原因
大模型本身可能无法严格遵循语言限制类提示词，且FastGPT配置大模型时可自定义的系统提示词存在范围限制。

## 排查步骤
1. 确认当前Agent和QA的Prompt、业务数据均为全英文格式
2. 检查大模型配置中的系统提示词设置内容
3. 确认FastGPT中可配置的系统提示词相关范围，需按实际环境确认

## 解决与验证
在大模型配置的系统提示词中添加明确的语言限制指令，要求模型仅使用英文输出。若大模型未严格遵循该提示词，可通过config.json配置大模型时补充相关限制。FastGPT中可配置的系统提示词存在一定范围限制，若需更灵活的配置，需按实际环境确认源码部署相关调整。使用全英文Prompt和业务数据发起请求，验证模型输出语言为英文，完成验证。

> 来源: [FastGPT GitHub issue #2247](https://github.com/labring/FastGPT/issues/2247)
