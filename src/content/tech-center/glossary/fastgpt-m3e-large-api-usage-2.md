---
title: 说明FastGPT中m3e-large-api的部署与使用要点
slug: /zh/glossary/fastgpt-m3e-large-api-usage-2
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1018
source_type: 官方文档
---

# 说明FastGPT中m3e-large-api的部署与使用要点

## 一句话定义
m3e-large-api是FastGPT官方提供的docker镜像，用于部署模型推理相关的服务。

## 在FastGPT里怎么用
部署该服务需使用官方提供的镜像地址：registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest。执行部署时需指定容器名称为m3e_api，将主机端口6200映射至容器内部端口6008，完整部署命令为docker run -itd --name m3e_api -p 6200:6008 registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest，执行该命令即可完成容器的后台启动与部署。

## 容易搞错的地方
部分部署场景下会出现AI响应延迟过高的问题，表现为单次提问响应时间超过50秒，且仅单人操作时即会出现该情况。此时需检查相关部署配置与环境参数，排查适配问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1018)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
