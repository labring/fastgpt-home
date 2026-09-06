---
title: 解决FastGPT部署时无法使用Azure密钥接入的问题
slug: /zh/troubleshoot/fastgpt-azure-key-configuration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/343
source_type: GitHub issue
---

# 解决FastGPT部署时无法使用Azure密钥接入的问题

## 现象
用户希望FastGPT支持Azure密钥接入服务，部署后服务器可直接调用无需VPN。当前FastGPT版本无法直接配置Azure密钥，需依赖VPN连接OpenAI服务，无法满足该使用需求。

## 可能原因
FastGPT默认仅支持OpenAI密钥的接入配置，未集成Azure密钥的原生接入选项，导致部署时无法直接使用Azure密钥，需依赖VPN连接OpenAI服务。

## 排查步骤
1. 确认已将FastGPT升级至最新版本
2. 明确需接入的密钥类型，区分OpenAI密钥与Azure密钥
3. 查阅官方提供的[配置文档](https://doc.fastgpt.run/docs/installation/one-api/)，确认配置所需的参数与步骤
4. 按照文档指引完成Azure密钥的接入配置前检查

## 解决与验证
参考官方提供的[配置文档](https://doc.fastgpt.run/docs/installation/one-api/)完成Azure密钥的接入配置，配置完成后，服务器可直接调用相关服务，无需依赖VPN。测试连接成功后，即可正常使用配置后的服务。

> 来源: [FastGPT GitHub issue #343](https://github.com/labring/FastGPT/issues/343)
