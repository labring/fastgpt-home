---
title: 解决FastGPT对接本地部署类OpenAI API的配置与连接问题
slug: /zh/troubleshoot/fastgpt-local-openai-api-setup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/363
source_type: GitHub issue
---

# 解决FastGPT对接本地部署类OpenAI API的配置与连接问题

## 现象
用户在使用FastGPT对接本地部署的LLM服务时，缺少官方教程指导，无法完成配置连接。例如部分用户通过端口转发部署本地类OpenAI API服务后，无法在FastGPT中正常调用。部分成功部署该类服务的用户，希望将相关流程补充到官方文档中。

## 可能原因
用户不清楚Docker部署的FastGPT容器如何访问宿主机上的LLM服务端口，无法正确配置基础API地址，导致无法调用本地部署的LLM服务。

## 排查步骤
1. 确认本地部署的LLM服务已正常启动，监听指定端口，且提供类OpenAI的API接口。
2. 确认FastGPT的部署环境为Docker容器，且使用对应后端的Docker引擎，例如WSL2后端。
3. 检查FastGPT的环境变量配置，确认OPENAI_BASE_URL的格式是否符合要求。
4. 验证容器是否可以访问宿主机的LLM服务端口，无需额外端口映射或防火墙调整。

## 解决与验证
在Docker部署FastGPT时，修改OPENAI_BASE_URL环境变量为`http://host.docker.internal:5051/v1`。其中`host.docker.internal`是Docker内置的宿主机访问地址，无需额外配置端口映射或防火墙规则。完成配置启动容器后，在FastGPT平台中测试调用LLM服务，若可正常生成内容，则配置成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/363)
