---
title: 解决FastGPT通过OneAPI接入GLM4:9b模型时的400报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-glm4-9b-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1812
source_type: GitHub issue
---

# 解决FastGPT通过OneAPI接入GLM4:9b模型时的400报错问题

## 现象
用户私有部署FastGPT 4.8.4-fix版本，通过OneAPI接入xinference部署的glm4:9b模型，在使用该模型进行对话功能时返回400报错。直接通过curl命令调用OneAPI的`/v1/chat/completions`接口，请求可正常返回结果，OneAPI运行日志中出现`model ratio not found: glm4:9b`的系统提示。

## 可能原因
根据OneAPI的运行日志，报错的核心原因为OneAPI未找到glm4:9b模型的计费倍率配置，导致FastGPT发起的请求无法被正常处理，最终返回400错误。

## 排查步骤
1.  查看OneAPI的运行日志，确认是否存在`model ratio not found: glm4:9b`的提示。
2.  核对FastGPT侧的模型配置，用户提供的配置中`model`与`name`字段均为`glm4:9b`，确认模型名称配置无误。
3.  对比curl测试请求与FastGPT发起的请求参数，确保两者的模型名称、请求头、请求体格式一致。
4.  检查OneAPI后台的模型管理界面，确认是否已添加glm4:9b模型的计费配置。

## 解决与验证
1.  在OneAPI后台管理界面，为glm4:9b模型添加计费倍率配置，根据日志记录设置模型倍率为30.00、分组倍率为1.00、补全倍率为1.00。
2.  保存配置后，重新在FastGPT中发起对话请求。
3.  验证FastGPT可正常调用模型，同时检查OneAPI日志中不再出现`model ratio not found: glm4:9b`的提示，且请求返回状态码为200。
> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1812)
