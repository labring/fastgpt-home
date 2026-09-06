---
title: 解决FastGPT使用VLLM+OneAPI调用GLM-4-9B-chat的间歇性API错误问题
slug: /zh/troubleshoot/fastgpt-glm4-vllm-api-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1710
source_type: GitHub issue
---

# 解决FastGPT使用VLLM+OneAPI调用GLM-4-9B-chat的间歇性API错误问题

## 现象
使用FastGPT私有部署4.8.3版本，通过OneAPI网关调用VLLM加载的glm-4-9b-chat大模型时，会间歇性出现API错误，并非完全无法调用，调用中断无明显规律。

## 可能原因
目前可推测的潜在原因包括OneAPI网关与模型服务的连接波动、VLLM加载的模型服务间歇性超时、大模型服务并发限制触发中断，具体原因需结合实际运行日志与监控数据确认，无法直接通过issue信息锁定根本原因。

## 排查步骤
1.  查看FastGPT的调用日志，提取间歇性出现的API错误具体提示内容。
2.  检查OneAPI网关的运行状态，确认网关与VLLM加载的模型服务之间的网络连接是否稳定。
3.  统计模型服务的并发请求数量，确认是否触发了预设的并发限制阈值。
4.  重启VLLM加载的模型服务与OneAPI网关，观察间歇性API错误是否复现。

## 解决与验证
根据排查出的具体原因进行针对性调整：若为连接波动问题，可调整OneAPI网关的重试策略与超时时间配置；若为模型服务间歇性超时，可优化模型加载参数或延长服务超时设置；若为并发限制触发，可调整模型服务的并发上限。调整完成后，连续发起多轮测试调用，确认间歇性API错误不再出现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1710)
