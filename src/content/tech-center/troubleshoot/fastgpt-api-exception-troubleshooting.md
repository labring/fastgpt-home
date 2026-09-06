---
title: FastGPT聊天界面发送内容后出现接口异常的排查与解决
slug: /zh/troubleshoot/fastgpt-api-exception-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/115
source_type: GitHub issue
---

# FastGPT聊天界面发送内容后出现接口异常的排查与解决

## 现象
部署FastGPT后，在聊天界面输入文字发送，无返回结果，卡顿后显示接口异常。

## 可能原因
首先排除OpenAI API密钥相关问题，其次可能与docker-compose.yml中的代理配置有关，或接口调用相关日志异常（需按实际环境确认）。

## 排查步骤
1. 执行docker log命令查看FastGPT相关运行日志。
2. 检查日志中是否包含`api response time`、`chat generate success`等关键字段，确认接口调用状态。

## 解决与验证
若日志中出现`api response time: 0.363s`、`chat generate success. text len: 52. token len: 146. pay:true`这类正常调用日志，说明接口调用流程正常，需按实际环境进一步排查其他链路。若日志无上述成功日志，则需检查docker-compose.yml中的代理配置是否正确部署。

> 来源: [FastGPT GitHub issue #115](https://github.com/labring/FastGPT/issues/115)
