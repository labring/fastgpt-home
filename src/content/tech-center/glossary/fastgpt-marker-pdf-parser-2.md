---
title: FastGPT中Marker自定义PDF解析模型的部署与使用说明
slug: /zh/glossary/fastgpt-marker-pdf-parser-2
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# FastGPT中Marker自定义PDF解析模型的部署与使用说明

## 一句话定义
Marker是适配FastGPT的自定义PDF解析模型服务，用于解析PDF文件内容。

## 在FastGPT里怎么用
参考官方提供的安装教程，地址为https://github.com/labring/FastGPT/tree/main/plugins/model/pdf-marker。快速Docker安装步骤如下：1. 拉取指定镜像：`docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2`；2. 启动容器：`docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2`。其中，`--gpus all`表示使用主机所有GPU，端口映射为主机7231端口映射至容器7232端口，容器名称为`model_pdf_v2`，环境变量`PROCESSES_PER_GPU`设置为2，用于配置每个GPU的并行处理进程数。

## 容易搞错的地方
1. 当存在同名模型时，对话界面会同时选中所有同名模型，易引发配置混淆。2. 启动容器需确保主机已配置GPU环境，未配置GPU时无法正常启动服务。3. 需使用指定版本的镜像，避免因版本不兼容导致解析异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
