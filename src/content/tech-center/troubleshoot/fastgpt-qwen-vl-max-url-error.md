---
title: 解决FastGPT 4.8.22 Docker版本调用qwen-vl-max时出现的url error问题
slug: /zh/troubleshoot/fastgpt-qwen-vl-max-url-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4536
source_type: GitHub issue
---

# 解决FastGPT 4.8.22 Docker版本调用qwen-vl-max时出现的url error问题

## 现象
在FastGPT 4.8.22的Docker版本中，调用qwen-plus等模型可正常运行，当引入qwen-vl-max模型进行调用时，系统弹出报错提示：url error, please check url！ (request id: 2025041411401766447340301436313)

## 可能原因
目前无公开的明确原因说明，需结合实际的部署环境、配置参数及日志信息进行排查。

## 排查步骤
1. 核对qwen-vl-max的调用配置，确认与可正常使用的模型（如qwen-plus）的配置参数一致，包括模型名称、接口地址等。
2. 结合报错中的request id（2025041411401766447340301436313），查看FastGPT或对应模型服务的请求日志，确认请求URL是否正确。
3. 确认当前FastGPT 4.8.22版本是否对qwen-vl-max模型有适配性要求，或是否存在已知兼容性问题。

## 解决与验证
若该问题仍需解决，可重新打开对应GitHub issue，并补充FastGPT部署环境、模型调用配置、相关日志等信息后进一步排查。

> 来源: [FastGPT GitHub issue #4536](https://github.com/labring/FastGPT/issues/4536)
