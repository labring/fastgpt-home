---
title: 解决FastGPT配置Ollama嵌入模型后索引失败报404的问题
slug: /zh/troubleshoot/fastgpt-ollama-embedding-model-not-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1244
source_type: GitHub issue
---

# 解决FastGPT配置Ollama嵌入模型后索引失败报404的问题

## 现象
用户使用FastGPT v4.7私有部署版本，配置Ollama嵌入模型后，上传的文件一直处于索引中状态，Ollama日志返回404找不到对应模型。同时配置的Chat Qwen模型可正常使用，单独通过聊天应用调用Qwen模型无异常。

## 可能原因
最核心的可能原因是FastGPT中配置的Ollama嵌入模型名称与Ollama实际加载的模型名称不一致，导致Ollama无法匹配到对应模型返回404错误。此外也可能存在Ollama服务未正常加载目标嵌入模型、网络访问异常等情况，但根据现有信息，模型名称配置错误是最常见的诱因。

## 排查步骤
1.  进入FastGPT的知识库配置页面，查看当前配置的Ollama嵌入模型的名称参数。
2.  登录Ollama服务所在的服务器，执行`ollama list`命令，查看已加载的模型的完整名称。
3.  对比FastGPT配置的模型名称和Ollama返回的模型名称，确认是否一致。
4.  检查FastGPT中配置的Ollama服务地址是否正确，确保可以正常访问Ollama接口。
5.  查看Ollama的实时日志，确认调用嵌入模型时的具体报错信息，验证是否为模型名称不匹配导致的404错误。

## 解决与验证
如果排查发现模型名称不匹配，将FastGPT中配置的嵌入模型名称修改为Ollama实际加载的完整模型名称，保存配置后重新上传文件进行索引。验证方式为：上传新的文件，查看索引是否能正常完成，同时确认Ollama日志不再报404错误。若模型名称配置正确但仍存在问题，需按实际环境确认Ollama服务是否正常加载目标模型，以及FastGPT与Ollama服务的网络连通性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1244)
