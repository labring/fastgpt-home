---
title: 解决FastGPT v4.8.20部署后API响应common:code_error.app_error.not_exist报错的问题
slug: /zh/troubleshoot/fastgpt-v4-8-20-api-not-exist
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3719
source_type: GitHub issue
---

# 解决FastGPT v4.8.20部署后API响应common:code_error.app_error.not_exist报错的问题

## 现象
用户在Sealos上创建FastGPT v4.8.20镜像的应用后，导入4.8.18版本的工作流应用时出现报错。后续仅创建仅包含AI对话的简单应用，仍出现相同报错。完整报错日志为：`Api response error: /api/core/chat/init?appId=67a5bd0e9f5f8afbee1c8b29&chatId=cNgQvdzwKXXgkqzRBZ7UdFiS { message: 'common:code_error.app_error.not_exist', stack: undefined`。该问题在直接部署v4.8.20时出现，但先部署4.8.18版本并逐版本升级至v4.8.20后未出现。

## 可能原因
目前未明确官方根因，结合复现场景推测可能与v4.8.20版本的部署初始化逻辑、应用导入的版本兼容性或镜像部署的配置缺失有关，需按实际环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8.20。
2. 复现报错场景，记录完整的报错日志，包括请求路径和错误信息`common:code_error.app_error.not_exist`。
3. 对比可正常运行的FastGPT版本（如4.8.18）的部署流程，检查当前部署的镜像配置是否存在差异。
4. 尝试先部署4.8.18版本的FastGPT应用，验证基础AI对话功能可正常使用后，再逐版本升级至v4.8.20，排查是否为直接部署高版本导致的初始化问题。

## 解决与验证
根据复现结果，可尝试先部署4.8.18版本的FastGPT应用，验证基础功能正常后再逐版本升级至v4.8.20。具体验证步骤如下：
1. 部署4.8.18版本的FastGPT应用。
2. 创建仅包含AI对话的简单应用，确认无报错。
3. 按照官方升级流程逐版本升级至v4.8.20。
4. 再次创建应用，确认报错不再出现。
若仍出现报错，需按实际环境进一步排查相关配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3719)
