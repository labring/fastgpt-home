---
title: 解决FastGPT部署中sandbox服务镜像未配置的问题
slug: /zh/troubleshoot/fastgpt-sandbox-missing-image
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4723
source_type: GitHub issue
---

# 解决FastGPT部署中sandbox服务镜像未配置的问题

## 现象
在使用提供的docker-compose.yaml部署FastGPT时，sandbox服务无法正常启动。该服务的image配置项未填写具体镜像地址，仅保留了`image:` 字段，Docker Compose无法识别要拉取的镜像，导致镜像拉取失败，容器启动失败。

## 可能原因
用户的docker-compose.yaml文件中，sandbox服务的image配置项未指定具体的镜像地址，仅保留了空的字段，导致Docker无法获取镜像信息，无法完成sandbox服务的部署启动。

## 排查步骤
1. 打开部署使用的docker-compose.yaml文件，找到sandbox服务的配置段落
2. 检查image字段后的内容，确认是否填写了完整的镜像地址
3. 核对官方推荐的sandbox镜像格式，确认镜像地址的正确性
4. 执行`docker-compose config`命令验证配置文件的合法性
5. 查看sandbox容器的日志，确认具体的启动失败原因

## 解决与验证
解决方法是补全sandbox服务的image配置，使用官方提供的镜像地址，例如`ghcr.io/labring/fastgpt-sandbox:v4.9.7-fix`。验证步骤如下：
1. 保存修改后的docker-compose.yaml文件
2. 执行`docker-compose up -d sandbox`命令重新启动sandbox服务
3. 使用`docker logs sandbox`命令查看容器日志，确认镜像拉取成功且服务正常启动
4. 检查FastGPT整体服务的运行状态，确认功能恢复正常

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4723)
