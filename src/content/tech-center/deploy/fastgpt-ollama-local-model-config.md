---
title: 在FastGPT中通过Ollama接入本地大模型的完整配置流程
slug: /zh/deploy/fastgpt-ollama-local-model-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# 在FastGPT中通过Ollama接入本地大模型的完整配置流程

Ollama是开源的AI大模型部署工具，专注于简化大语言模型的下载、部署与使用。FastGPT支持通过Ollama接入本地部署的大模型，需根据部署方式注意不同的配置细节：若使用Docker部署Ollama，必须确保其与FastGPT容器处于同一网络，否则FastGPT无法访问Ollama服务；若采用主机本地安装Ollama，则需配置Ollama监听0.0.0.0，否则容器内的FastGPT无法与宿主机的Ollama服务通信。

## 详细配置步骤
1.  安装并启动Ollama：
    - Docker部署（推荐）：先拉取官方镜像`docker pull ollama/ollama`，再启动容器。若FastGPT在Docker中部署，需指定与FastGPT相同的网络：`docker run --rm -d --name ollama --network 你的Fastgpt容器所在网络 -p 11434:11434 ollama/ollama`；若为单机部署可直接执行`docker run --rm -d --name ollama -p 11434:11434 ollama/ollama`。
    - 主机安装：适配不同系统的安装命令：Linux执行`curl https://ollama.com/install.sh | sh`后启动`ollama serve`；MacOS通过`brew install ollama`安装后启动`ollama serve`；Windows从官方网站下载安装程序后启动`ollama serve`。若为本地主机安装，需配置Ollama监听0.0.0.0：Linux编辑systemd服务文件添加`Environment=OLLAMA_HOST=0.0.0.0`后重载重启；Mac执行`launchctl setenv ollama_host 0.0.0.0`后重启应用；Windows通过系统环境变量新建`OLLAMA_HOST`为`0.0.0.0`后重启服务。
2.  拉取本地模型：Docker部署的Ollama需先进入容器`docker exec -it Ollama容器名 /bin/sh`，再执行`ollama pull 模型名`拉取所需模型。
3.  测试通信：进入FastGPT容器`docker exec -it FastGPT所在的容器名 /bin/sh`，执行`curl http://[容器名或主机IP]:11434`，若返回Ollama服务信息则通信正常。
4.  接入FastGPT：在FastGPT后台点击「账号-模型提供商-模型配置-新增模型」，模型ID需与Ollama中模型名称一致；再点击「账号-模型渠道-新增渠道」，选择Ollama渠道，填入代理地址（容器部署用`http://容器名:11434`，主机安装用`http://主机IP:11434`，主机IP不可为localhost），添加已拉取的模型。

需注意的边界与易错点：同一个模型无法多次添加，系统会保留最后一次设置的别名；若AI Proxy接入失败，需检查Ollama是否监听0.0.0.0或容器网络是否一致。若使用OneAPI接入，需先拉取intel/oneapi-hpckit镜像并在FastGPT容器的网络中运行，具体配置需参考官方完整流程。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
