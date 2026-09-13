---
title: 介绍FastGPT环境中m3e-large-api的部署与使用步骤
slug: /zh/glossary/fastgpt-m3e-large-api-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1018
source_type: 官方文档
---

# 介绍FastGPT环境中m3e-large-api的部署与使用步骤

## 一句话定义
m3e-large-api是FastGPT配套使用的文本嵌入模型服务容器镜像，官方提供的镜像仓库地址为registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest。

## 在FastGPT里怎么用
通过Docker命令部署该服务，标准部署命令为docker run -itd --name m3e_api -p 6200:6008 registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest。部署完成后，服务将通过本地6200端口对外提供服务。

## 容易搞错的地方
部署时易出现端口映射参数配置错误，导致服务无法正常访问；容器名称与其他运行容器重复，引发启动冲突；使用错误的镜像地址或标签，导致镜像拉取失败。部分用户部署后未验证端口连通性，引发后续调用异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1018)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
