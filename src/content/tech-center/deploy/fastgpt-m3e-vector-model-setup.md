---
title: 为FastGPT部署、配置并接入M3E私有化向量模型
slug: /zh/deploy/fastgpt-m3e-vector-model-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e
source_type: 官方文档
---

# 为FastGPT部署、配置并接入M3E私有化向量模型

## 背景说明
FastGPT 默认使用 OpenAI 的 embedding 向量模型，私有部署场景下可替换为 M3E 向量模型。M3E 属于轻量小模型，资源占用较低，支持 CPU 环境运行，本次部署基于指定官方镜像完成。

## 部署与接入步骤
1.  **部署镜像**：使用指定镜像部署服务，官方镜像地址为 `stawky/m3e-large-api:latest`，国内加速镜像地址为 `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest`，服务端口为 6008。可通过环境变量设置安全凭证 `sk-key`，默认值为 `sk-aaabbbcccdddeeefffggghhhiiijjjkkk`。
2.  **接入 One API**：在 One API 中添加新渠道，配置自定义模型标识为 `m3e`。可使用以下 curl 命令测试服务连通性：
    ```bash
    curl --location --request POST https://domain/v1/embeddings \
    --header "Authorization: Bearer xxxx" \
    --header "Content-Type: application/json" \
    --data-raw '{"model": "m3e", "input": ["laf是什么"]}'
    ```
    其中 `Authorization` 字段需替换为配置的 `sk-key`，`domain` 为服务部署的域名或 IP 地址。

## FastGPT 配置与使用注意
修改 FastGPT 的 `config.json` 配置文件，在 `vectorModels` 数组中添加 M3E 模型配置：
```json
"vectorModels": [
  {
    "model": "text-embedding-ada-002",
    "name": "Embedding-2",
    "price": 0.2,
    "defaultToken": 500,
    "maxToken": 3000
  },
  {
    "model": "m3e",
    "name": "M3E（测试使用）",
    "price": 0.1,
    "defaultToken": 500,
    "maxToken": 1800
  }
]
```
完成配置后，创建知识库时可选择 M3E 模型，需注意以下限制：知识库一旦选择向量模型后无法修改；应用仅能绑定使用同一向量模型的知识库；不同向量模型的相似度计算逻辑存在差异，需自行测试调整相似度阈值。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e)
