---
title: 说明FastGPT嵌入向量维度设置为1536的规则与处理方法
slug: /zh/troubleshoot/fastgpt-embedding-dimension-rules
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/623
source_type: GitHub issue
---

# 说明FastGPT嵌入向量维度设置为1536的规则与处理方法

## 现象
使用者在查看FastGPT的files/models/Baichuan2/openai_api.py文件时，发现嵌入向量的维度被拓展至1536，并产生两个疑问：该维度设置的原因，以及是否所有嵌入入库操作都需采用1536维度。

## 可能原因
该维度设置与OpenAI接口的标准维度要求相关，FastGPT内部需统一嵌入向量维度以适配自身逻辑。当前多数模型的原生嵌入维度为756或1024，需通过转换适配统一要求。

## 排查步骤
1. 查看FastGPT对应模型的openai_api.py文件，确认嵌入向量维度的配置代码。
2. 核对当前使用的嵌入模型原生输出维度，记录实际维度值。
3. 确认业务场景是否需要适配统一维度要求。
4. 需按实际环境确认维度转换的具体实现逻辑。

## 解决与验证
OpenAI接口的标准嵌入维度为1536，FastGPT内部要求嵌入向量维度为1536。处理方式为将原生维度非1536的嵌入向量进行维度转换，适配至1536。验证方式为确认嵌入入库后的维度为1536，且业务流程可正常运行。

> 来源: [FastGPT GitHub issue #623](https://github.com/labring/FastGPT/issues/623)
