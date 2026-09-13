---
title: 解决FastGPT Docker Compose部署的镜像与版本配置错误
slug: /zh/troubleshoot/fastgpt-docker-deploy-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1797
source_type: GitHub issue
---

# 解决FastGPT Docker Compose部署的镜像与版本配置错误

## 现象
使用Docker Compose部署FastGPT时，执行`docker-compose up -d`命令后出现报错：`error pulling image configuration: Get https://production.cloudflare.docker.com/registry-v2/docker/registry/v2/blobs/sha256/6e/6e0cb183450e70e379cc6133339f795e9dbfe9a7e31534891797a8352f3ba910/data?verify=1718698193-qkdL3eh1xUGTWbY4QMcdFMedwgg%3D: dial tcp 157.240.1.50:443: i/o timeout`。部分用户尝试配置阿里云镜像加速后仍未解决问题，同时发现部署文档中pgvector版本配置存在错误。

## 可能原因
1. Docker拉取镜像时与默认镜像源的网络连接超时，导致镜像拉取失败。
2. 部署文档中pgvector的版本配置格式错误，未正确添加版本前缀`v`。

## 排查步骤
1. 查看`docker-compose up -d`执行后的完整报错日志，确认是否存在镜像拉取配置超时的错误信息。
2. 检查Docker镜像加速配置文件`/etc/docker/daemon.json`，确认其中的镜像源配置是否正确。
3. 核对部署文档中pgvector的版本配置项，确认版本格式是否符合要求。

## 解决与验证
1. 配置Docker镜像加速：编辑`/etc/docker/daemon.json`文件，添加或修改镜像源为阿里云镜像地址，格式为`https://xxxx.mirror.aliyuncs.com`（`xxxx`需替换为实际的阿里云镜像加速地址）。
2. 重启Docker服务使配置生效：执行`systemctl restart docker`命令。
3. 修正pgvector版本配置：将部署配置中的pgvector版本项从`pgvector:0.7.0`调整为`pgvector:v0.7.0`。
4. 重新执行`docker-compose up -d`命令，验证镜像拉取和部署流程是否正常完成。

> 来源: [FastGPT GitHub issue #1797](https://github.com/labring/FastGPT/issues/1797)
