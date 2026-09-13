---
title: 介绍FastGPT源码部署中下载BGE重排序模型的操作步骤
slug: /zh/deploy/fastgpt-bge-rerank-download
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 介绍FastGPT源码部署中下载BGE重排序模型的操作步骤

## 可用BGE重排序模型仓库
FastGPT源码部署环节中，可使用的BGE重排序模型共有三个，对应的Hugging Face仓库地址如下：
1. https://huggingface.co/BAAI/bge-reranker-base
2. https://huggingface.co/BAAI/bge-reranker-large
3. https://huggingface.co/BAAI/bge-reranker-v2-m3

## 模型下载操作步骤
在指定的代码目录下，执行git clone命令即可下载目标BGE重排序模型。用户可根据实际需求选择对应的仓库地址执行克隆操作。例如，若需下载base版本的模型，可执行命令`git clone https://huggingface.co/BAAI/bge-reranker-base`；若需下载large版本的模型，可执行命令`git clone https://huggingface.co/BAAI/bge-reranker-large`；若需下载v2-m3版本的模型，可执行命令`git clone https://huggingface.co/BAAI/bge-reranker-v2-m3`。克隆操作完成后，将生成与模型名称一致的目录，以base版本为例，将生成名为bge-reranker-base的目录。

## 克隆后的目录结构
克隆任意一个BGE重排序模型后，将生成与模型名称一致的目录，目录内包含三个固定文件。以base版本为例，完整的目录结构如下：
```
bge-reranker-base/
app.py
Dockerfile
requirements.txt
```
该目录结构适用于所有三款BGE重排序模型。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
