---
title: 在FastGPT自托管环境中部署MinerU文档解析服务的教程
slug: /zh/deploy/fastgpt-mineru-deployment
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 在FastGPT自托管环境中部署MinerU文档解析服务的教程

MinerU是FastGPT配套的文档解析服务，用于处理上传的PDF格式文档。该服务采用pipeline模式，在Docker容器内部实现了并行化处理逻辑，会根据部署环境的GPU数量创建对应数量的进程，同时处理多份PDF数据，提升解析效率。

## 快速Docker部署步骤
1. 拉取官方镜像：
```bash
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
```
2. 创建并启动解析服务容器：
```bash
docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
```
该命令将容器的8001端口映射到宿主机的7231端口，容器名称固定为mode_pdf_minerU。

完成容器启动后，获取部署服务器的公网或内网IP地址，拼接为服务URL（格式为http://{服务器IP}:7231），将该URL接入FastGPT的配置文件中，即可完成MinerU服务的对接。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
