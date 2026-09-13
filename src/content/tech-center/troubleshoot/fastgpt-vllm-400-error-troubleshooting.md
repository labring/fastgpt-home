---
title: 解决FastGPT调用vllm部署模型时返回400错误的问题
slug: /zh/troubleshoot/fastgpt-vllm-400-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5579
source_type: GitHub issue
---

# 解决FastGPT调用vllm部署模型时返回400错误的问题

## 现象
使用FastGPT v4.12.1私有部署版本，配置vllm部署Qwen3模型后，工具模型调用直接返回400错误，对话模型约70%的请求返回400错误，且模型服务本身运行正常。

## 可能原因
该问题暂无明确关联的已知原因，需结合实际部署环境的交互日志、参数配置等信息进行排查确认。

## 排查步骤
1.  确认FastGPT中配置的vllm模型接口地址、密钥等参数是否正确无误。
2.  查看FastGPT的后端日志，提取返回400错误的具体请求内容与响应信息。
3.  直接调用vllm模型服务的接口，使用FastGPT生成的同款请求参数，验证是否会返回400错误。
4.  核对Qwen3模型的官方接口要求，确认FastGPT发送的请求参数格式、字段是否符合规范。

## 解决与验证
根据排查得到的具体问题，调整FastGPT的模型请求参数，使其符合vllm部署的Qwen3模型的接口要求。调整完成后，重新发起工具模型调用与对话模型请求，验证400错误是否不再出现，且模型能正常返回响应结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5579)
