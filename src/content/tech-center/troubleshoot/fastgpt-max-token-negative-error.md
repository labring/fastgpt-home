---
title: 解决FastGPT调用大模型时max_token参数传入负数的问题
slug: /zh/troubleshoot/fastgpt-max-token-negative-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/911
source_type: GitHub issue
---

# 解决FastGPT调用大模型时max_token参数传入负数的问题

## 现象
用户在私有部署FastGPT中，使用m3e与qwen1.5 14b模型，配置最大token为1024。完成知识库添加并测试搜索功能正常后，调用机器人提问时，m3e相关参数运行正常，但向qwen1.5发送请求时，max_token参数被错误传入负数，最终触发请求报错。

## 可能原因
该问题的直接表现为大模型调用时max_token参数为负数。结合部署场景推测，可能是配置的最大token参数未被正确传递至调用链路，或存在逻辑错误导致参数值异常变为负数。具体触发逻辑需结合部署代码进一步确认。

## 排查步骤
1. 登录FastGPT后台，查看大模型配置页面，确认已设置的max_token参数为正整数（如本次案例中的1024）。
2. 测试知识库搜索功能，确认该环节的参数传递与运行状态正常，与本次案例的前置表现一致。
3. 查看FastGPT的系统日志，定位大模型调用接口处的max_token参数值，确认是否为负数。
4. 核对大模型调用的代码逻辑，检查参数从配置到接口的传递链路是否存在异常。

## 解决与验证
针对参数传递异常的情况，修正代码中max_token参数的传递逻辑，确保配置的正整数参数被正确传入大模型调用接口。验证流程如下：
1. 重新配置大模型的max_token参数为正整数。
2. 重启FastGPT服务，调用机器人发起提问。
3. 查看大模型调用日志，确认max_token参数为配置的正整数，无负数情况。
4. 确认机器人可以正常返回结果，无报错信息。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/911)
