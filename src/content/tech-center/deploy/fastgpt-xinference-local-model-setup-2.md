---
title: 为FastGPT自部署用户配置Xinference本地大模型接入服务
slug: /zh/deploy/fastgpt-xinference-local-model-setup-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference
source_type: 官方文档
---

# 为FastGPT自部署用户配置Xinference本地大模型接入服务

Xinference是一款开源模型推理平台，支持LLM、Embedding和ReRank模型部署，还提供Function Calling功能与分布式水平扩展能力，适合企业级RAG场景的本地模型接入需求。

## 安装Xinference服务
根据部署场景分为服务器和个人设备两种方案。服务器可选择Transformers或vLLM作为推理后端，其中vLLM通过PagedAttention优化内存管理，吞吐量能够达到Transformers的24倍，适合高并发生产环境。若使用NVIDIA显卡，需提前安装CUDA以获得显卡加速。Docker部署可直接执行命令：`docker run -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0`。直接部署需准备Python 3.9以上环境，通过conda创建py311环境后，执行`pip install xinference[transformers,vllm]`安装依赖，若自动安装的CUDA版本不匹配，需参考PyTorch官网指南手动安装。启动服务执行`xinference-local -H 0.0.0.0`，默认端口为9997，允许非本地客户端通过机器IP访问。个人设备推荐使用CTransformers作为后端，需额外安装`ctransformers`，并根据硬件平台配置编译参数安装llama-cpp-python，例如Apple Metal环境执行`CMAKE_ARGS=-DLLAMA_METAL=on pip install llama-cpp-python`，启动服务执行`xinference-local`即可。

## 部署本地大模型
以Qwen-14B模型为例，可通过两种方式启动。WebUI方式：访问`http://127.0.0.1:9997`打开本地Web界面，切换到“Launch Model”标签，搜索`qwen-chat`后设置启动参数，点击模型卡片左下角的小火箭按钮即可部署。首次启动会从HuggingFace下载模型参数，缓存至本地后无需重复下载，也支持从modelscope下载模型。默认Model UID为`qwen-chat`，后续可通过该ID访问模型。也可使用Xinference的命令行工具启动模型，默认Model UID同样为`qwen-chat`。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference
