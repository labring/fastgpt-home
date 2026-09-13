---
title: 解决FastGPT部署时本地模型接入与外网依赖问题
slug: /zh/troubleshoot/fastgpt-local-model-access
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/245
source_type: GitHub issue
---

# 解决FastGPT部署时本地模型接入与外网依赖问题

## 现象
部署FastGPT过程中，需配置中转地址与密钥，无法实现完全私有化部署。用户希望使用本地开源大模型替代付费在线服务，且未在部署文档中找到本地模型的接入方法。

## 可能原因
部署文档未明确说明本地模型的接入方式，默认配置依赖中转服务导致需访问外网，且未提供本地模型对接的相关指引。

## 排查步骤
1.  检查部署文档是否包含本地模型接入的相关说明。
2.  确认当前配置是否强制要求中转地址与密钥。
3.  核实本地模型的接口格式是否与FastGPT兼容。
4.  需按实际环境确认硬件是否满足本地模型的运行需求。

## 解决与验证
可通过OneAPI对接本地模型或在线API，文档中有相关说明。可不通过OneAPI直接对接部署的模型接口。本地模型运行对硬件要求较高，性价比需按实际环境确认。配置完成后，发起模型调用测试，确认调用正常且无需访问外网即可完成验证。

> 来源: [FastGPT GitHub issue #245](https://github.com/labring/FastGPT/issues/245)
