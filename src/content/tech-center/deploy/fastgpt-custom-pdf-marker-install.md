---
title: FastGPT自定义PDF解析服务的Marker模型安装方法
slug: /zh/deploy/fastgpt-custom-pdf-marker-install
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# FastGPT自定义PDF解析服务的Marker模型安装方法

Marker模型是FastGPT自定义PDF解析服务的配套组件，其封装的API已适配FastGPT自定义解析服务，可通过官方提供的快速Docker方式完成安装。
### 快速Docker安装
执行以下命令完成镜像拉取与容器启动：
```dockerfile
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
```
以下是命令中各参数的说明：
1.  `docker pull` 命令用于拉取指定的Marker模型镜像，镜像版本为v0.2，镜像仓库地址为crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images。
2.  `docker run` 命令用于启动容器，其中`--gpus all` 表示启用宿主机所有可用的GPU资源，`-itd` 参数表示以交互式、后台守护模式运行容器，`-p 7231:7232` 将容器内部的7232端口映射到宿主机的7231端口，`--name model_pdf_v2` 指定容器的名称为model_pdf_v2，`-e PROCESSES_PER_GPU="2"` 设置每个GPU可运行的处理进程数为2。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
