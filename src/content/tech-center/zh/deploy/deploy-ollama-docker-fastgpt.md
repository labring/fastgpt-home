---
title: 通过Docker安装Ollama并配置FastGPT可正常访问的服务
slug: /zh/deploy/deploy-ollama-docker-fastgpt
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama
source_type: 官方文档
---

# 通过Docker安装Ollama并配置FastGPT可正常访问的服务

使用Ollama官方Docker镜像可一键完成Ollama服务的安装与启动，该部署方式无需手动处理复杂的依赖配置。部署前需确保目标机器已安装Docker环境。执行以下命令即可完成基础的镜像拉取与服务启动：
```bash
docker pull ollama/ollama
docker run --rm -d --name ollama -p 11434:11434 ollama/ollama
```

### 适配FastGPT Docker部署的网络配置
若FastGPT同样通过Docker容器进行部署，需将Ollama容器加入FastGPT所在的容器网络，否则可能出现FastGPT无法访问Ollama服务的问题。执行以下命令即可完成同网络配置：
```bash
docker run --rm -d --name ollama --network （你的 Fastgpt 容器所在网络） -p 11434:11434 ollama/ollama
```

本次部署涉及的核心配置参数包括固定的容器名称ollama、默认映射端口11434、官方镜像源ollama/ollama。当FastGPT采用Docker部署时，需将命令中的`（你的 Fastgpt 容器所在网络）`替换为实际的FastGPT容器所属网络名称，以确保两个服务间的正常通信。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/ollama)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
