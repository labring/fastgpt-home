---
title: 解决FastGPT高级编程http模块触发AxiosError报错的问题
slug: /zh/troubleshoot/fastgpt-http-module-axios-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/695
source_type: GitHub issue
---

# 解决FastGPT高级编程http模块触发AxiosError报错的问题

## 现象
在FastGPT高级编程场景中使用http模块模拟发送OpenAI格式的请求时，无论调整何种参数，均会触发AxiosError报错。用户配置的流程包含userChatInput、chatModule等模块，且尝试绑定用户问题输入到对应节点。

## 可能原因
目前未明确具体根因，需结合实际部署环境排查。潜在相关因素包括请求参数格式不符合目标服务要求、接口地址配置错误、调用密钥权限不足、网络连通性异常、请求超时或访问限制等，具体细节需按实际环境确认。

## 排查步骤
1.  核对http模块的请求配置，确保接口地址、请求头、请求体符合目标服务的OpenAI格式规范。
2.  确认已正确配置可用的调用密钥，且该密钥具备对应接口的调用权限。
3.  检查FastGPT运行环境的网络连通性，确认可以正常访问目标接口地址。
4.  核对流程中各模块的连接关系与参数绑定，确保输入输出参数的键名匹配正确，比如userChatInput的输出是否正确连接到http模块的对应输入键。
5.  记录完整的AxiosError报错信息，包括错误码与详细描述，用于后续定位问题。

## 解决与验证
根据排查结果修正对应问题，例如调整请求参数格式、修复错误的接口地址、补充配置正确的调用密钥、修复网络连通问题等。修正完成后，重新保存并部署流程配置，触发对话流程，确认不再触发AxiosError报错，且http模块可返回预期的响应结果。若仍存在报错，需结合完整的错误日志进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/695)
