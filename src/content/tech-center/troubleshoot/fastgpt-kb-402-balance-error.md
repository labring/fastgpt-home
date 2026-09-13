---
title: 解决FastGPT挂载知识库后触发402余额不足报错的问题
slug: /zh/troubleshoot/fastgpt-kb-402-balance-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3708
source_type: GitHub issue
---

# 解决FastGPT挂载知识库后触发402余额不足报错的问题

## 现象
用户从FastGPT v4.8.14逐级升级至v4.8.20，配置知识库使用M3E+GLM4，工作台应用挂载该知识库后，发起对话触发`402 Insufficient Balance`报错。移除知识库挂载后，AI对话恢复正常。报错日志显示，LLM响应错误的请求体中调用的模型为`deepseek-reasoner`，请求ID为`2025020606181420503720450454627`。

## 可能原因
挂载知识库后，系统自动调用`deepseek-reasoner`模型生成检索词，但该模型未在配置中启用，且其绑定的密钥存在余额不足的情况，因此返回402错误。

## 排查步骤
1. 查看报错日志中的`requestBody`字段，确认触发报错的模型名称。
2. 登录FastGPT后台，检查该模型的启用状态与密钥配置情况。
3. 核对该模型绑定密钥的账户余额，确认是否存在余额不足的问题。
4. 检查知识库关联的模型配置，确认检索词生成环节调用的模型是否为已启用且正常可用的模型。

## 解决与验证
解决方法分为两种：一是为该模型绑定的密钥充值，恢复账户余额；二是将检索词生成的默认模型更换为已启用且余额充足的模型（如本例中的GLM4）。验证时，重新挂载知识库并发起对话，确认不再出现`402 Insufficient Balance`报错，AI对话功能恢复正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3708)
