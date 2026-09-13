---
title: FastGPT调用Qwen2.5 72B模型工具失败的排错指南
slug: /zh/troubleshoot/fastgpt-qwen2-72b-tool-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3289
source_type: GitHub issue
---

# FastGPT调用Qwen2.5 72B模型工具失败的排错指南

## 现象
用户本地部署Qwen2.5 72B大模型，通过vllm启动OpenAI兼容API服务后，在FastGPT中进行工具调用时触发异常，报错截图与日志截图显示工具调用流程无法正常完成。用户使用的vllm启动命令包含`--port 12345`、`--tensor-parallel-size 4`等参数，模型实际路径为`/var/software/models/Qwen2.5-72B-Instruct`。

## 可能原因
结合用户的部署配置，可能的异常原因包括：
1. vllm启动命令中`--served-model-name`参数与FastGPT配置的模型名称不匹配，用户启动命令中该参数设置为`Qwen2-72B-Instruct`，与实际模型名称`Qwen2.5-72B-Instruct`不一致；
2. FastGPT中配置的vllm服务地址、端口与启动命令中的`--port 12345`不匹配；
3. vllm的工具调用相关参数配置不符合FastGPT的调用要求；
4. 本地网络或vllm服务端口存在访问限制，导致FastGPT无法正常连接模型服务。

## 排查步骤
1. 核对vllm启动命令中的`--served-model-name`参数，确认其与FastGPT中配置的模型名称完全一致；
2. 检查FastGPT中配置的vllm服务地址与端口，确保与启动命令中的`--port 12345`一致；
3. 通过curl命令调用vllm的模型列表接口（如`curl http://localhost:12345/v1/models`），验证vllm服务是否正常运行并返回正确的模型信息；
4. 确认FastGPT的工具调用配置已开启自动工具调用模式，与vllm启动的`--enable-auto-tool-choice`参数匹配；
5. 导出并查看FastGPT与vllm的完整运行日志，定位具体的报错细节。

## 解决与验证
首先优先排查模型名称匹配问题：修改vllm启动命令中的`--served-model-name`参数为`Qwen2.5-72B-Instruct`，与实际模型名称保持一致，重启vllm服务。在FastGPT中重新配置模型名称为匹配后的`Qwen2.5-72B-Instruct`，测试工具调用流程。若仍存在异常，需进一步核对服务端口的网络连通性，检查FastGPT与vllm服务的连接配置是否正确。验证方式为：直接调用vllm的聊天补全接口，传入包含工具调用的prompt，确认接口可正常返回工具调用结果，再在FastGPT中重复测试流程。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3289)
