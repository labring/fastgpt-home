---
title: 解决FastGPT中不同应用使用独立密钥进行计费的问题
slug: /zh/troubleshoot/fastgpt-separate-key-billing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2395
source_type: GitHub issue
---

# 解决FastGPT中不同应用使用独立密钥进行计费的问题

## 现象
用户最初表述FastGPT仅支持单个密钥，后续澄清实际指OneAPI中配置的密钥，希望为不同应用设置独立的OneAPI密钥以实现分别计费，当前无法通过现有配置实现不同应用对应独立密钥的计费需求，且单个应用同时使用多种模型时，现有间接配置方式较为繁琐。

## 可能原因
未针对不同应用配置独立的OneAPI密钥关联规则，无法实现不同应用的分别计费；当单个应用需使用多种模型时，现有间接配置方式较为繁琐，需按实际部署环境确认具体限制。

## 排查步骤
1. 确认FastGPT中各应用绑定的密钥是否为OneAPI中配置的密钥。
2. 核对OneAPI中已配置的密钥是否被多个应用共用。
3. 检查单个应用是否存在同时使用多种模型的场景，以判断是否需要采用间接配置方式。

## 解决与验证
解决方式分为两种场景：
1. 单应用单模型场景：在FastGPT中创建多个独立应用，每个应用绑定对应OneAPI中的独立密钥，即可实现不同应用的密钥区分与分别计费。
2. 单应用多模型场景：为不同模型定义专属模型名（如gpt1、gpt2），将每个应用绑定对应专属模型名，在OneAPI中按专属模型名配置计费规则，再将FastGPT中的模型名转义为实际可用的统一模型，以此实现不同应用或不同模型的独立计费。
验证方式：查看OneAPI的计费记录，确认不同应用或模型对应的计费数据已独立区分。

> 来源: [FastGPT GitHub issue #2395](https://github.com/labring/FastGPT/issues/2395)
