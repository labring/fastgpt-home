---
title: 在FastGPT中为私有部署配置并接入M3E向量模型
slug: /zh/deploy/fastgpt-m3e-embedding-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e
source_type: 官方文档
---

# 在FastGPT中为私有部署配置并接入M3E向量模型

## 功能说明
FastGPT 默认使用 OpenAI 官方的 embedding 向量模型，若需进行私有部署，可替换为 M3E 向量模型。M3E 属于轻量小模型，资源占用较低，支持 CPU 环境运行，本教程基于社区提供的镜像完成接入配置。

## 完整配置步骤
1.  **部署镜像**：使用指定镜像 `stawky/m3e-large-api:latest`，国内镜像地址为 `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest`，容器端口映射为 6008。可通过环境变量设置安全凭证 `sk-key`，默认值为 `sk-aaabbbcccdddeeefffggghhhiiijjjkkk`。
2.  **接入 One API**：在 One API 中添加新渠道，使用以下测试 curl 命令验证连接：
    ```bash
    curl --location --request POST https://domain/v1/embeddings \
    --header "Authorization: Bearer xxxx" \
    --header "Content-Type: application/json" \
    --data-raw '{"model": "m3e", "input": ["laf是什么"]}'
    ```
    其中 `Authorization` 字段值为设置的 `sk-key`，`model` 需与 One API 中填写的自定义模型名一致。
3.  **配置 FastGPT**：修改本地的 `config.json` 配置文件，在 `vectorModels` 数组中添加 M3E 模型配置，示例如下：
    ```json
    "vectorModels": [
      { "model": "text-embedding-ada-002", "name": "Embedding-2", "price": 0.2, "defaultToken": 500, "maxToken": 3000 },
      { "model": "m3e", "name": "M3E（测试使用）", "price": 0.1, "defaultToken": 500, "maxToken": 1800 }
    ]
    ```
4.  **测试使用**：创建知识库时选择 M3E 模型，完成配置后导入数据并进行搜索测试，再将知识库绑定至对应应用。

## 使用边界与注意事项
创建知识库并选择 M3E 模型后，无法再修改该知识库的向量模型。应用仅能绑定使用同一向量模型的知识库，不可跨模型绑定。不同向量模型的相似度计算逻辑存在差异，需自行测试调整相似度阈值，以适配实际业务需求。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e
