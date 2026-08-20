---
title: 指导FastGPT通过Ollama接入本地部署的大语言模型
slug: /zh/deploy/fastgpt-ollama-local-model-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# 指导FastGPT通过Ollama接入本地部署的大语言模型

## 安装与配置Ollama服务
Ollama是简化大语言模型部署的开源工具，支持两种安装方式：Docker部署（推荐）和主机安装。Docker部署需确保机器已安装Docker，基础启动命令为`docker run --rm -d --name ollama -p 11434:11434 ollama/ollama`；若FastGPT同样部署在Docker中，需将Ollama加入同一网络，命令为`docker run --rm -d --name ollama --network [你的Fastgpt容器所在网络] -p 11434:11434 ollama/ollama`。主机安装分三系统：MacOS已安装Homebrew时执行`brew install ollama`，再运行`ollama serve`启动服务；Linux执行`curl https://ollama.com/install.sh | sh`后执行`ollama serve`；Windows从官网下载安装包完成安装后，在命令行执行`ollama serve`启动服务。若采用主机安装，需配置Ollama监听0.0.0.0：Linux编辑systemd服务文件添加`Environment=OLLAMA_HOST=0.0.0.0`，执行`sudo systemctl daemon-reload`和`sudo systemctl restart ollama`生效；MacOS执行`launchctl setenv ollama_host 0.0.0.0`后重启应用；Windows新建系统变量`OLLAMA_HOST=0.0.0.0`后重启服务。

## 快速配置与接入步骤
1. 拉取模型镜像：进入Ollama容器执行`docker exec -it ollama /bin/sh ollama pull [模型名]`，完成本地模型拉取。
2. 测试通信：进入FastGPT所在容器执行`docker exec -it [FastGPT容器名] /bin/sh curl http://[对应地址]:11434`，容器部署时代理地址为`http://ollama:11434`，主机安装时为`http://[主机IP]:11434`（不可使用localhost），返回Ollama服务信息则通信正常。
3. 配置FastGPT渠道：在FastGPT依次点击「账号-模型提供商-模型配置-新增模型」，确保模型ID与OneAPI中模型名称一致；再点击「账号-模型提供商-模型渠道-新增渠道」，选择Ollama类型，填入对应代理地址，添加已拉取的模型并设置别名。创建应用时即可选择该模型。

## 常见问题排查
若FastGPT无法访问Ollama，需优先排查两点：一是两者是否处于同一Docker网络；二是主机安装的Ollama是否已配置监听0.0.0.0，避免仅监听localhost导致无法被容器访问。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama)
