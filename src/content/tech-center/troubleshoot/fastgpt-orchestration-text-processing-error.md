---
title: 解决FastGPT高级编排文本加工节点504/500报错问题
slug: /zh/troubleshoot/fastgpt-orchestration-text-processing-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1167
source_type: GitHub issue
---

# 解决FastGPT高级编排文本加工节点504/500报错问题

## 现象
使用FastGPT高级编排的“文本加工”节点时触发报错，报错日志显示Axios请求错误，状态码包含504（Gateway Time-out）与500。完整报错信息包含`AxiosError: Request failed with status code 500`的堆栈跟踪，涉及axios@1.6.8的调用链路、本地项目的chunks文件与`chatTest.js`接口，请求数据为`{"university":"中科大","messages":[],"question":"你好"}`，运行环境为本地部署的FastGPT-4.7版本。

## 可能原因
1.  请求链路中的网关超时，导致返回504状态码；
2.  后端服务执行文本加工逻辑时出现内部错误，返回500状态码；
3.  部署环境的网络、资源配置不足以支撑节点执行，引发请求异常；
4.  节点输入参数的格式或内容不符合预期，触发调用异常。

## 排查步骤
1.  查看完整报错日志，确认具体的状态码、请求参数与调用堆栈信息，如本次报错中的504/500状态码与请求数据；
2.  检查FastGPT后端核心服务的运行状态，确认服务未崩溃且资源占用处于正常范围；
3.  核对文本加工节点的配置与输入参数，确认格式符合节点要求；
4.  验证部署环境的网络连通性，确认服务间通信无防火墙或代理限制；
5.  根据调用堆栈定位具体的报错代码位置，排查业务逻辑中的异常点。

## 解决与验证
针对504网关超时问题，可调整网关超时时间配置，或优化文本加工节点的执行逻辑以缩短响应时长。针对500内部错误，需根据调用堆栈修复对应的业务逻辑异常。验证时，重新配置文本加工节点并使用原输入参数执行测试，确认报错消失且节点可正常返回处理结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1167)
