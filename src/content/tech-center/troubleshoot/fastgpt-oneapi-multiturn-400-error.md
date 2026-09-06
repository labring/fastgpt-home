---
title: 解决FastGPT对接OneAPI后多轮问答出现400 no body报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-multiturn-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2622
source_type: GitHub issue
---

# 解决FastGPT对接OneAPI后多轮问答出现400 no body报错问题

## 现象
用户通过Docker部署FastGPT服务，通过OneAPI接入本地Qwen2-7B模型，OneAPI自身测试成功耗时0.05秒。在FastGPT页面创建应用并选中该模型后，首次提问可正常返回回答内容，继续发起提问时，页面提示"400 no body"报错。vllm控制台仅显示400错误码，无具体请求体信息，用户附带了Docker日志截图。

## 可能原因
目前无明确通用原因，需结合实际部署环境与请求链路细节确认。该问题首次请求正常、后续请求报错的特征，提示可能与多轮对话的上下文请求体处理、接口转发逻辑存在关联。

## 排查步骤
1.  查看FastGPT的Docker容器日志，定位"400 no body"报错的触发时机与相关请求信息。
2.  对比首次正常请求与后续报错请求的请求头、请求体参数，排查参数缺失或格式异常问题。
3.  检查OneAPI的模型转发配置，确认是否支持多轮对话的上下文传递规则。
4.  核对FastGPT中配置的模型接口地址、密钥等参数，确保与OneAPI的配置完全一致。

## 解决与验证
若排查发现多轮请求的请求体为空或格式错误，需调整FastGPT的模型调用配置，确保会话上下文参数正确传递。若OneAPI转发存在请求体丢失问题，可重新配置OneAPI的模型转发规则，保证请求体完整转发。验证时，重新发起多轮对话，确认首次及后续提问均可正常返回回答内容，无"400 no body"报错，同时查看vllm控制台与Docker日志无异常报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2622)
