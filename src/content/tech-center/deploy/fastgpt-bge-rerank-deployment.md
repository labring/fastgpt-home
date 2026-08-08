---
title: 在FastGPT中部署并接入bge-rerank重排模型的具体配置方法
slug: /zh/deploy/fastgpt-bge-rerank-deployment
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 在FastGPT中部署并接入bge-rerank重排模型的具体配置方法

bge-rerank是一款可接入FastGPT的重排模型，用于优化检索结果的精度，以下是其配置与接入的完整流程。

## 模型推荐配置
不同模型的硬件资源要求如下：
| 模型名 | 内存 | 显存 | 硬盘空间 | 启动命令 |
| --- | --- | --- | --- | --- |
| bge-reranker-base | =4GB | =4GB | =8GB | python app.py |
| bge-reranker-large | =8GB | =8GB | =8GB | python app.py |
| bge-reranker-v2-m3 | =8GB | =8GB | =8GB | python app.py |

## 部署方式
### Docker部署
这是推荐的快速部署方式，步骤如下：
1. 选择对应镜像：base版镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`，large版和v2-m3版有对应官方镜像，镜像大小分别为4GB+、5GB+、5GB+。
2. 运行容器：映射端口6006，设置环境变量`ACCESS_TOKEN`作为访问安全凭证，示例命令如下：
   ```bash
   docker run -d --name reranker -p 6006:6006 -e ACCESS_TOKEN=mytoken --gpus all registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1
   ```
3. 如需使用docker-compose编排，可参考以下配置，若出现`Bus error (core dumped)`报错，需添加`shm_size: 2gb`配置项增加共享内存：
   ```yaml
   version: 3
   services:
     reranker:
       image: registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1
       container_name: reranker
       shm_size: 2gb
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
### 源码部署
如需手动编译部署，可按以下步骤操作：
1. 安装Python 3.9/3.10、CUDA 11.7及科学上网环境；
2. 下载对应模型的代码仓库；
3. 执行`pip install -r requirements.txt`安装依赖；
4. 在代码目录下clone对应HuggingFace模型仓库；
5. 执行`python app.py`启动服务，启动成功后会暴露`http://0.0.0.0:6006`地址。

## 接入FastGPT与常见问题
1. 接入步骤：打开FastGPT的模型配置页面，新增重排模型，填写配置表单：模型ID为`bge-reranker-base`，地址填写`{{host}}/v1/rerank`，其中`host`为部署的域名/IP:Port。
2. 常见报错处理：
   - 403报错：原因是FastGPT自定义请求的Token与部署时设置的`ACCESS_TOKEN`不一致，需核对两者值是否匹配。
   - `Bus error (core dumped)`：需在Docker配置中添加`shm_size: 2gb`增加容器共享内存。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
