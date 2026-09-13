---
title: 配置FastGPT环境变量调整全局超时时间以适配超长上下文
slug: /zh/troubleshoot/fastgpt-modify-timeout-env
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1133
source_type: GitHub issue
---

# 配置FastGPT环境变量调整全局超时时间以适配超长上下文

## 现象
在本地Docker环境中运行FastGPT时，使用超过80k token的上下文进行文章总结任务。模型本身支持超200k的上下文处理，但FastGPT平台触发超时，无法返回最终结果，任务耗时超过15分钟仍未完成。

## 可能原因
FastGPT默认配置的全局超时时间较短，无法适配超长上下文推理的长耗时场景，导致推理任务未完成即被平台终止，无法获取模型返回结果。

## 排查步骤
1. 确认FastGPT的部署环境为Docker容器模式。
2. 验证超长上下文推理任务的实际执行情况，确认模型侧未触发超时，仅FastGPT平台返回超时错误。
3. 检查当前FastGPT的环境变量配置，确认未手动修改过全局超时相关参数。
4. 确认任务使用的上下文token数超过当前FastGPT默认的超时适配阈值。

## 解决与验证
通过Docker环境变量配置FastGPT的全局超时参数，具体参数名需按实际环境确认。配置完成后，重新启动FastGPT容器，再次运行超长上下文推理任务，验证任务是否可在调整后的超时时间内完成并返回预期结果。若任务可正常完成并返回结果，则说明配置生效。

> 来源: [FastGPT GitHub issue #1133](https://github.com/labring/FastGPT/issues/1133)
