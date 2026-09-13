---
title: FastGPT通过OneAPI调用本地Ollama模型报错的排错方法
slug: /zh/troubleshoot/fastgpt-oneapi-ollama-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1972
source_type: GitHub issue
---

# FastGPT通过OneAPI调用本地Ollama模型报错的排错方法

## 现象
用户在私有部署FastGPT中，通过OneAPI接入本地Ollama模型进行对话时，出现对话接口报错或返回为空的问题。OneAPI内该模型测试可正常通过，且已将模型关联至对应令牌，Ollama本地模型可独立正常运行，但FastGPT调用时仍触发报错，同时附带了OneAPI与FastGPT的启动、对话阶段日志截图。

## 可能原因
潜在原因需结合实际环境确认，包括：FastGPT配置文件中的OneAPI接入参数存在错误；FastGPT与OneAPI之间的网络连接存在异常；FastGPT调用OneAPI时的请求参数格式不符合要求；配置项存在拼写错误或遗漏内容。

## 排查步骤
1.  核对FastGPT的配置文件内容，对照issue中提供的config截图，确认OneAPI的接入地址、密钥等参数与实际部署的OneAPI一致。
2.  在FastGPT所在的运行环境中，测试能否正常访问OneAPI的接口地址，可通过基础请求工具验证连通性。
3.  检查OneAPI中已关联的模型名称，确保与FastGPT中调用的模型名称完全匹配，避免名称不匹配导致的调用失败。
4.  查看OneAPI和FastGPT的详细日志，根据日志中的具体报错提示定位问题环节。
5.  单独测试OneAPI调用Ollama模型的流程，确认OneAPI到Ollama的链路正常，排除OneAPI侧的配置问题。

## 解决与验证
根据排查步骤定位到的具体问题进行针对性修复。例如，若为配置参数错误，修正对应配置项后重启FastGPT服务；若为网络连接异常，调整网络策略确保两者可正常通信；若为模型名称不匹配，统一双方使用的模型名称。修复完成后，在FastGPT中发起对话测试，确认不再出现接口报错或返回为空的问题，同时检查OneAPI和FastGPT的日志无异常报错，验证整个调用链路正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1972)
