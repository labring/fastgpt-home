---
title: FastGPT镜像拉取失败的排查与处理方法
slug: /zh/glossary/fastgpt-image-pull-troubleshooting
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/56
source_type: GitHub issue
---

# FastGPT镜像拉取失败的排查与处理方法

## 一句话定义
该内容针对FastGPT部署场景下Docker镜像拉取失败的问题，提供基于官方报错信息的处理说明。

## 在 FastGPT 里怎么用
当部署FastGPT出现镜像拉取失败时，可根据具体报错场景排查。若出现`Error response from daemon: Get "https://registry.cn-hangzhou.aliyuncs.com/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)`报错，且已配置DNS仍失败，可执行`ping registry.cn-hangzhou.aliyuncs.com`验证基础网络连通性，再执行`curl https://registry.cn-hangzhou.aliyuncs.com/v2/`验证镜像仓库接口连通性。若出现`ERROR: mediaType in manifest should be 'application/vnd.docker.distribution.manifest.v2+json' not 'application/vnd.oci.image.manifest.v1+json'`报错，需核对Docker版本与镜像manifest格式的兼容性，例如Docker 19.03.1版本拉取`ankane/pgvector:v0.4.2`时会触发该报错。

## 容易搞错的地方
部分用户仅配置DNS未验证镜像仓库接口连通性，导致无法定位真实故障点；未结合具体Docker版本与镜像格式匹配性排查，盲目更换镜像源无法解决问题；尝试网络调整方法未生效时，未针对性复现并核对官方报错文本。

> 来源: [FastGPT GitHub issue #56](https://github.com/labring/FastGPT/issues/56)
> 来源: [FastGPT GitHub issue #73](https://github.com/labring/FastGPT/issues/73)
