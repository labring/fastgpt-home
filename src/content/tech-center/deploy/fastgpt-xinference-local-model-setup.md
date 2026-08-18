---
title: 为FastGPT配置Xinference以接入本地大模型的完整步骤
slug: /zh/deploy/fastgpt-xinference-local-model-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference
source_type: 官方文档
---

# 为FastGPT配置Xinference以接入本地大模型的完整步骤

## Xinference概述与适配场景
Xinference是开源模型推理平台，支持部署LLM、Embedding和ReRank模型，可用于企业级RAG构建，还支持Function Calling功能与分布式水平扩展。根据部署环境不同，可选择不同推理后端：服务器环境可使用Transformers或vLLM作为后端；个人设备推荐使用CTransformers后端，依托GGML实现模型量化以适配消费级硬件。

## Xinference安装与服务启动
根据部署方式选择对应安装命令：使用Docker部署时，需确保机器已安装Docker，执行命令`docker run -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0`即可一键启动服务。若使用直接部署方式，需先准备3.9以上版本的Python环境，通过conda创建3.11环境的命令为`conda create --name py311 python=3.11`，激活环境后执行`pip install xinference[transformers,vllm]`同时安装双后端，安装过程中自动安装的PyTorch CUDA版本若不匹配，需参考PyTorch官网指南手动安装。最后执行`xinference-local -H 0.0.0.0`启动服务，默认端口为9997，配置参数后可允许非本地客户端访问。个人设备场景下，需执行`pip install xinference`、`pip install ctransformers`，再根据硬件平台执行对应编译命令安装llama-cpp-python：Apple Metal平台为`CMAKE_ARGS=-DLLAMA_METAL=on pip install llama-cpp-python`，Nvidia GPU平台为`CMAKE_ARGS=-DLLAMA_CUBLAS=on pip install llama-cpp-python`，AMD GPU平台为`CMAKE_ARGS=-DLLAMA_HIPBLAS=on pip install llama-cpp-python`，最后执行`xinference-local`启动服务。

## 模型部署与FastGPT对接
启动服务后，在浏览器访问`http://127.0.0.1:9997`进入WebUI，打开"Launch Model"标签，搜索目标模型（以Qwen-14B为例，搜索`qwen-chat`），配置启动参数后点击模型卡片左下方的小火箭按钮即可部署模型。首次启动模型时，会从HuggingFace下载模型参数，后续启动将复用本地缓存文件，默认Model UID为`qwen-chat`，后续可通过该ID访问模型，FastGPT可通过该UID对接已部署的本地模型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference)
