---
title: 为FastGPT部署并接入bge-rerank重排模型的配置方法
slug: /zh/deploy/fastgpt-bge-rerank-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 为FastGPT部署并接入bge-rerank重排模型的配置方法

## 模型资源推荐配置
列出不同bge-rerank系列模型的资源需求：
| 模型名                  | 所需内存 | 所需显存 | 硬盘占用 | 启动命令       |
|-------------------------|----------|----------|----------|----------------|
| bge-reranker-base       | 4GB      | 4GB      | 8GB      | python app.py  |
| bge-reranker-large      | 8GB      | 8GB      | 8GB      | python app.py  |
| bge-reranker-v2-m3      | 8GB      | 8GB      | 8GB      | python app.py  |

## 部署方式
支持源码部署和Docker部署两种方式：
### 源码部署
1. 安装依赖环境：Python 3.9/3.10、CUDA 11.7及科学上网环境；
2. 下载对应模型的代码仓库；
3. 执行`pip install -r requirements.txt`安装项目依赖；
4. 克隆对应HuggingFace模型到代码目录，确保目录包含app.py、Dockerfile、requirements.txt等文件；
5. 运行`python app.py`启动服务，启动成功后访问地址为`http://0.0.0.0:6006`。

### Docker部署
使用官方预构建镜像部署，各模型对应镜像地址如下：
- bge-reranker-base：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`（镜像大小4GB+）
- bge-reranker-large：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-large:v0.1`（镜像大小5GB+）
- bge-reranker-v2-m3：`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-v2-m3:v0.1`（镜像大小5GB+）
部署时需映射端口6006，并配置环境变量`ACCESS_TOKEN`作为访问安全凭证，请求时需携带`Authorization: Bearer ${ACCESS_TOKEN}`。
运行示例：
```bash
docker run -d --name reranker -p 6006:6006 -e ACCESS_TOKEN=mytoken --gpus all registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1
```
Docker Compose示例：
```yaml
version: 3
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
    shm_size: 2gb
```
常见报错处理：
1. 403报错：FastGPT中自定义请求Token与环境变量的ACCESS_TOKEN不一致；
2. Docker运行`Bus error (core dumped)`：需在配置中添加`shm_size: 2gb`增加容器共享内存。

## 接入FastGPT配置
打开FastGPT的模型配置页面，新增重排模型，填写以下配置项：
- 模型ID：填写对应模型名，如`bge-reranker-base`
- 请求地址：`{{host}}/v1/rerank`，其中`{{host}}`替换为部署服务的域名或IP:Port

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank)
