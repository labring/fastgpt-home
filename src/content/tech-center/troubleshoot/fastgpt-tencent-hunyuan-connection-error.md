---
title: 解决FastGPT添加腾讯混元模型后出现连接错误的问题
slug: /zh/troubleshoot/fastgpt-tencent-hunyuan-connection-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3870
source_type: GitHub issue
---

# 解决FastGPT添加腾讯混元模型后出现连接错误的问题

## 现象
在FastGPT中添加腾讯混元模型并执行测试时，界面返回connection error报错。同时通过其他可正常调用该模型的测试工具验证，配置可正常工作。

## 可能原因
结合用户反馈，可能的原因包括：FastGPT与目标模型服务的网络连接异常；FastGPT中配置的模型相关参数存在错误；部署环境的网络限制阻断了请求链路。部分原因需按实际环境确认。

## 排查步骤
1.  核对FastGPT中配置的腾讯混元模型的密钥、模型标识等参数，确保与实际可用的配置一致。
2.  检查部署FastGPT的环境的网络连通性，确认可以正常访问目标模型服务的地址。
3.  对比其他可用测试工具的配置，确认FastGPT中的模型配置参数与其他测试工具的配置完全一致。
4.  查看FastGPT的运行日志，提取详细的报错信息，辅助进一步定位问题。

## 解决与验证
根据排查结果进行对应处理。若参数配置错误，修正相关配置参数；若存在网络连接问题，调整网络配置，比如设置代理或开放防火墙规则。处理完成后，重新在FastGPT中发起模型测试，确认不再显示connection error报错，且可以正常获取模型返回结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3870)
