---
title: 使用Docker部署适配FastGPT所需的BGE重排序模型服务
slug: /zh/reference/docker-deploy-bge-rerank-fastgpt
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/bge-rerank
source_type: 官方文档小节
---

# 使用Docker部署适配FastGPT所需的BGE重排序模型服务

## 结论
可通过Docker快速部署适配FastGPT的BGE重排序模型服务，官方提供多个规格的镜像与标准部署配置。部署后可通过指定端口与安全凭证调用该服务。

## 具体怎么做
1. 选择对应镜像：
   - base版：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`（4GB+）
   - large版：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-large:v0.1`（5GB+）
   - v2-m3版：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-v2-m3:v0.1`（5GB+）
2. 配置端口映射为`6006:6006`，设置环境变量`ACCESS_TOKEN`为自定义访问凭证，请求时需携带`Authorization: Bearer ${ACCESS_TOKEN}`头信息。
3. 执行Docker运行命令（以base版、token为mytoken为例）：
   ```bash
   docker run -d --name reranker -p 6006:6006 -e ACCESS_TOKEN=mytoken --gpus all registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1
   ```
4. 或使用docker-compose部署，示例配置：
   ```yaml
   version: "3"
   services:
     reranker:
       image: registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1
       container_name: reranker
       deploy:
         resources:
           reservations:
             devices:
               - driver: nvidia
                 count: all
                 capabilities: [gpu]
       ports:
         - 6006:6006
       environment:
         - ACCESS_TOKEN=mytoken
   ```

## 注意事项
1. 宿主机未安装NVIDIA GPU驱动时，需移除docker run命令的`--gpus all`参数，或隐藏docker-compose配置中的`deploy`块。
2. 端口6006需未被其他进程占用，避免启动冲突。
3. 根据服务器存储空间选择对应规格的镜像，防止磁盘空间不足。
4. 妥善保管`ACCESS_TOKEN`，防止未授权访问服务。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/bge-rerank)
