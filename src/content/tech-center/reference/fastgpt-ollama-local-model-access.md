---
title: 在FastGPT中配置Ollama接入本地大模型的操作步骤
slug: /zh/reference/fastgpt-ollama-local-model-access
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/ollama
source_type: 官方文档小节
---

# 在FastGPT中配置Ollama接入本地大模型的操作步骤

## 结论
FastGPT支持通过Ollama接入本地部署的大模型。Ollama是一款专注于简化大语言模型部署与使用的开源工具，可一键下载和运行各类大语言模型，降低本地大模型的使用门槛。

## 具体怎么做
1. 部署Ollama服务，按照Ollama的官方指引完成本地大模型的下载与运行，确保模型正常加载完成。
2. 进入FastGPT的模型配置环节，找到Ollama接入本地模型的对应配置入口，按照页面指引完成相关设置，关联已部署的本地模型。

## 注意事项
1. 需确保Ollama服务处于正常运行状态，本地大模型已成功加载，无启动类报错信息。
2. 需保证FastGPT所在运行环境与Ollama服务的网络连接通畅，避免出现无法访问本地模型服务的问题。
3. 仅支持Ollama部署的本地大模型接入FastGPT，不支持其他部署方式的本地模型。
4. 若遇到接入异常问题，可参考FastGPT官方文档的模型问题排查流程进行定位解决。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/ollama)
