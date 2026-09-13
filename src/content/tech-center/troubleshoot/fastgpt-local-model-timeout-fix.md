---
title: 解决FastGPT调用本地模型的Request timed out报错问题
slug: /zh/troubleshoot/fastgpt-local-model-timeout-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3579
source_type: GitHub issue
---

# 解决FastGPT调用本地模型的Request timed out报错问题

## 现象
FastGPT 4.8.16版本调用本地模型时，因上下文较长、GPU资源有限导致等待时间较长，返回报错{"message": "Request timed out.", "name": "Error"}。直接调用目标模型API可成功，仅FastGPT返回该超时报错，目标模型日志显示状态200，仅FastGPT日志存在timeout相关记录。

## 可能原因
超时限制来自FastGPT内部配置。流响应默认超时时间为1分钟，非流响应默认超时时间为10分钟，长上下文调用可能超出该默认阈值。

## 排查步骤
1. 确认报错文本为{"message": "Request timed out.", "name": "Error"}，且仅FastGPT返回该报错。
2. 查看FastGPT运行日志，确认是否存在timeout相关的记录。
3. 直接调用目标模型的API接口，验证模型服务本身无超时问题。
4. 定位FastGPT的超时配置文件路径，该文件位于FastGPT源码的FastGPT/packages/service/core/ai/config.ts。

## 解决与验证
1. 找到FastGPT源码中的FastGPT/packages/service/core/ai/config.ts文件。
2. 修改该文件中的超时参数，按需调整流响应与非流响应的超时时间。
3. 若使用Docker部署FastGPT，需将修改后的配置文件打包进镜像，或通过挂载方式加载自定义配置。
4. 重启FastGPT服务，测试长上下文的模型调用，确认超时报错不再出现。

> 来源: [FastGPT GitHub issue #3579](https://github.com/labring/FastGPT/issues/3579)
