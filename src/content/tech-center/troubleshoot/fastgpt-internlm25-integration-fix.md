---
title: 解决FastGPT中InternLM2.5系列模型的兼容与集成问题
slug: /zh/troubleshoot/fastgpt-internlm25-integration-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2973
source_type: GitHub issue
---

# 解决FastGPT中InternLM2.5系列模型的兼容与集成问题

## 现象
在FastGPT中尝试集成InternLM2.5-7B、InternLM2.5-1.8B、InternLM2.5-20B模型时，会出现兼容性问题，无法正常加载或调用模型。同时官方未提供该系列模型的详细集成步骤，新用户手动调整部署的效率较低。

## 可能原因
当前FastGPT官方仓库未内置InternLM2.5系列模型的支持，缺少对应的集成工具或配置模板，导致无法直接完成该系列模型的部署与调用。

## 排查步骤
1. 确认当前FastGPT的版本及已支持的模型范围，具体信息需按实际环境确认
2. 检查FastGPT官方仓库或文档中是否存在针对InternLM2.5系列模型的集成配置或脚本
3. 核对模型加载的相关配置项是否符合InternLM2.5系列模型的要求，具体参数需按实际环境确认
4. 检索官方提供的相关集成资源，确认是否有可用的指导内容

## 解决与验证
可通过向FastGPT官方提交需求，添加该系列模型的详细集成指导、工具链支持或示例脚本，以完成官方层面的兼容支持。若需临时部署，可参考InternLM官方提供的支持资源完成手动调整。验证时，可在FastGPT中加载对应模型并发起对话，确认模型可正常响应请求。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2973)
