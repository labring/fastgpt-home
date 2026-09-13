---
title: 说明FastGPT自定义模型的Docker部署与文件配置
slug: /zh/glossary/fastgpt-custom-model-docker-deploy
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 说明FastGPT自定义模型的Docker部署与文件配置

## 一句话定义
Dockerfile是FastGPT自定义模型部署场景中，用于构建可运行容器镜像的配置文件，整合了模型运行所需的环境依赖与启动逻辑。

## 在 FastGPT 里怎么用
针对不同的自定义模型，部署方式分为两类。第一类为自定义重排序模型，需从HuggingFace仓库克隆目标模型（如bge-reranker-base、bge-reranker-large、bge-reranker-v2-m3），将模型文件存放至指定目录，确保目录下包含app.py、Dockerfile、requirements.txt三个核心文件。第二类为PDF解析模型Marker，可通过官方提供的快速Docker命令完成部署：首先执行`docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2`拉取官方镜像，随后执行`docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2`启动容器。

## 容易搞错的地方
常见错误包括三类。第一类为端口映射配置错误，Marker部署命令中使用`-p 7231:7232`，易混淆宿主机端口与容器端口，导致服务无法正常访问。第二类为模型目录结构不完整，若自定义重排序模型的目录遗漏app.py、Dockerfile或requirements.txt任意文件，将导致镜像构建失败。第三类为GPU资源配置缺失，未添加`--gpus all`参数启动容器，将导致无法调用GPU资源，降低模型运行效率。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
