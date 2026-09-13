---
title: 说明FastGPT中BGE重排序模型的部署、获取与使用步骤
slug: /zh/glossary/fastgpt-bge-rerank-models
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 说明FastGPT中BGE重排序模型的部署、获取与使用步骤

## 一句话定义
BGE重排序模型是FastGPT支持的文本重排序模型，提供base、large、v2-m3三个官方版本。

## 在FastGPT里怎么用
在FastGPT源码部署流程中，需先下载对应版本的模型代码，再克隆对应的模型文件。三个版本的代码仓库地址分别为：bge-reranker-base对应https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-base，bge-reranker-large对应https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-large，bge-reranker-v2-m3对应https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-v2-m3。对应的Hugging Face模型仓库地址分别为https://huggingface.co/BAAI/bge-reranker-base、https://huggingface.co/BAAI/bge-reranker-large、https://huggingface.co/BAAI/bge-reranker-v2-m3。克隆模型后，目录下需包含app.py、Dockerfile、requirements.txt文件。

## 容易搞错的地方
易混淆代码仓库与模型仓库的对应关系，错误搭配不匹配的代码和模型版本。未在指定代码目录下克隆模型文件，将导致部署流程无法正常读取模型资源。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
