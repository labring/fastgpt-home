---
title: 解决FastGPT私有部署环境中Moonshot模型调用返回异常问题
slug: /zh/troubleshoot/fastgpt-moonshot-model-call-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2218
source_type: GitHub issue
---

# 解决FastGPT私有部署环境中Moonshot模型调用返回异常问题

## 现象
FastGPT私有部署环境（版本4.8.8，搭配one-api 0.6.8）中，配置moonshot-v1-32k模型后，调用该模型的返回结果与公有云版本表现不一致。用户已确认自身密钥可正常使用，且提供了该模型的配置文件，其中包含maxContext:16000、maxResponse:4000、quoteMaxToken:13000、vision:true、toolChoice:true、functionCall:true等参数。

## 可能原因
1. 私有部署的FastGPT版本与公有云版本存在功能差异，导致模型调用逻辑不一致；
2. 模型配置参数未与公有云版本对齐，部分参数设置不符合当前版本的要求；
3. 搭配的one-api版本（0.6.8）与FastGPT 4.8.8存在兼容性问题，影响模型返回结果的透传与处理。

## 排查步骤
1. 查阅FastGPT 4.8.8版本的官方文档，确认moonshot系列模型的支持参数与公有云版本的差异；
2. 对比issue中提供的私有部署配置文件与公有云版本的配置（issue未提供公有云配置，需按实际环境核对），调整参数至合理范围；
3. 登录私有部署环境的日志系统，提取模型调用的请求体、返回体内容，排查是否存在参数缺失或错误；
4. 检查one-api的配置，确认模型密钥的绑定状态与权限是否正常。

## 解决与验证
1. 根据官方文档调整模型配置参数，确保与公有云版本的配置对齐，包括vision、toolChoice、functionCall等开关项的设置；
2. 若one-api版本存在兼容性问题，可尝试升级至兼容FastGPT 4.8.8的版本，或更换符合要求的模型代理服务；
3. 重新发起模型调用请求，对比返回结果与公有云版本的表现；
4. 验证模型的工具调用、视觉处理等功能是否正常运行，确认问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2218)
