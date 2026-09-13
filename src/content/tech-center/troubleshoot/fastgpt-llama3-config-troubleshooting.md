---
title: 解决FastGPT中Llama3模型配置项匹配与对话异常的问题
slug: /zh/troubleshoot/fastgpt-llama3-config-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1437
source_type: GitHub issue
---

# 解决FastGPT中Llama3模型配置项匹配与对话异常的问题

## 现象
用户在FastGPT中部署并使用Meta-Llama-3-8B-Instruct模型开展对话时，出现交互异常现象。同时用户无法明确config.json中的配置项如何与不同模型对应，附带了config.json配置项截图、Meta-Llama-3-8B-Instruct相关界面截图以及对话异常的截图来描述问题。

## 可能原因
结合用户的疑问与提交的素材，核心可能原因是用户未将目标模型的完整标识、调用参数等与config.json中的对应配置项正确匹配，导致FastGPT无法按照模型的要求发起调用，进而引发对话异常。

## 排查步骤
1. 定位到FastGPT部署目录下的config.json配置文件，打开查看其中与模型相关的配置项结构，明确现有配置的字段名称。
2. 提取Meta-Llama-3-8B-Instruct的完整官方模型标识，作为配置项中对应模型的标识值。
3. 对照配置文件中的每个模型配置项，确认每个字段的作用范围，需按实际部署环境确认具体参数的填写规则。
4. 检查FastGPT中模型调用的请求格式，确认是否与config.json中的配置项要求一致。

## 解决与验证
1. 在config.json的模型配置项中，将模型标识字段填写为完整的Meta-Llama-3-8B-Instruct名称。
2. 根据该模型的实际调用参数要求，调整config.json中对应的配置项参数，需按实际环境确认每个参数的具体数值。
3. 重启FastGPT的部署服务，使新的配置项生效。
4. 在FastGPT的对话界面中发起针对该模型的测试对话，确认之前的交互异常现象消失，模型可以正常返回响应内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1437)
