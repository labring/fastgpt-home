---
title: FastGPT自定义PDF解析服务部署与接入指南
slug: /zh/glossary/fastgpt-custom-pdf-parser
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# FastGPT自定义PDF解析服务部署与接入指南

## 一句话定义
FastGPT自定义PDF解析服务是适配FastGPT的第三方PDF解析服务，支持通过Docker部署，用于处理上传的PDF文件，包含Marker与MinerU两种实现方式。

## 在 FastGPT 里怎么用
部署分为两种实现方式，均通过Docker完成：
1.  Marker部署：拉取镜像命令为：
```dockerfile
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
```
运行容器需指定GPU参数、端口映射与进程数参数，命令为：
```dockerfile
docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
```
2.  MinerU部署：拉取镜像命令为：
```dockerfile
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
```
运行容器命令为：
```dockerfile
docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
```
部署完成后，将服务的URL地址接入FastGPT配置文件即可。其中运行Marker容器时，PROCESSES_PER_GPU参数配置单GPU可同时处理的进程数为2；MinerU采用pipeline模式，内部会根据GPU数量自动创建并行进程，无需手动配置进程数参数。

## 容易搞错的地方
两种服务的端口映射与容器命名存在差异，需注意区分：Marker容器内端口为7232，需映射至宿主机7231，MinerU容器内端口为8001，映射至宿主机7231时需注意端口冲突；容器名称需严格按照配置，Marker容器名为model_pdf_v2，MinerU容器名为mode_pdf_minerU。部署时必须添加`--gpus all`参数，否则无法启用GPU加速；MinerU采用pipeline模式，内部会根据GPU数量自动创建并行进程，无需手动配置进程数参数。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
