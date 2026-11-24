---
title: 通过OneAPI将Ollama接入FastGPT部署环境的具体操作方法
slug: /zh/reference/oneapi-connect-ollama-fastgpt
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/ollama
source_type: 官方文档小节
---

# 通过OneAPI将Ollama接入FastGPT部署环境的具体操作方法

## 结论
通过OneAPI中转，可以将Ollama模型接入FastGPT部署环境。完成全流程配置后，即可在FastGPT中使用Ollama部署的模型。

## 具体怎么做
1. 拉取OneAPI镜像：执行命令 `docker pull intel/oneapi-hpckit`
2. 运行OneAPI容器并加入FastGPT网络：执行命令 `docker run -it --network [FastGPT网络] --name 容器名 intel/oneapi-hpckit /bin/bash`
3. 进入OneAPI管理页面，添加新渠道：类型选择Ollama，模型名称填写与Ollama中完全一致的模型名，代理地址填写`http://[地址]:[端口]`（无需添加`/v1`）
4. 完成渠道配置后进行测试，测试成功即渠道添加成功。若主机部署Ollama，代理地址需改为`http://[主机IP]:[端口]`
5. 生成OneAPI令牌：点击页面「令牌」选项，添加新令牌，填写名称并完成配置
6. 修改FastGPT的`docker-compose.yml`文件：注释AI Proxy的使用配置，将`OPENAI_BASE_URL`设置为`http://[地址]:[端口]/v1`（必须携带`/v1`），`KEY`填写OneAPI生成的令牌
7. 配置完成后，即可在FastGPT中添加模型并正常使用。

## 注意事项
1. 添加的Ollama模型名称必须与Ollama本地部署的模型名称完全一致，否则会出现调用失败
2. OneAPI的代理地址无需添加`/v1`，但FastGPT的`OPENAI_BASE_URL`必须携带`/v1`，这是常见配置错误点
3. OneAPI容器需运行在FastGPT的同一网络中，否则无法正常通信
4. 渠道测试未通过时，需检查模型名称、代理地址是否配置正确

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/ollama)
