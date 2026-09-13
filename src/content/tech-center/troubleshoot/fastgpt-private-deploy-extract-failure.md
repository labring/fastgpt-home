---
title: 解决FastGPT私有部署4.8.10版本内容提取功能失效问题
slug: /zh/troubleshoot/fastgpt-private-deploy-extract-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2859
source_type: GitHub issue
---

# 解决FastGPT私有部署4.8.10版本内容提取功能失效问题

## 现象
用户在FastGPT私有部署4.8.10版本中，使用配置的qwen-turbo模型时，无法正常执行内容提取操作。用户已确认密钥可正常使用，附带的模型配置文件包含maxContext:8000、maxResponse:4000等参数，同时提供了完整的模型配置JSON内容。

## 可能原因
结合用户反馈，可能的原因包括：模型配置文件中的参数存在不符合系统要求的配置项；私有部署的服务未正确加载模型的内容提取相关配置；内容提取功能未正确关联到当前使用的模型。

## 排查步骤
1.  核对当前使用的模型配置文件，确认所有参数与用户提供的配置一致，检查usedInExtractFields、customExtractPrompt等与内容提取相关的配置项是否正确配置。
2.  确认qwen-turbo模型已在FastGPT系统中正确导入并启用，且绑定的密钥有效。
3.  查看FastGPT服务的运行日志，结合issue中提供的日志截图，排查与内容提取功能相关的报错信息。
4.  测试模型的其他功能（如对话、工具调用）是否可正常运行，排除全局服务异常的可能。

## 解决与验证
如果排查发现是配置文件问题，调整对应配置项后重启FastGPT服务，重新尝试内容提取操作，验证功能是否恢复。若日志存在明确报错，需根据报错提示修复对应的配置或依赖项。完成修复后，再次执行内容提取操作，确认功能正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2859)
