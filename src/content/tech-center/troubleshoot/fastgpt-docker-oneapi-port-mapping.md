---
title: 解决Docker部署FastGPT后OneAPI无端口映射无法访问的问题
slug: /zh/troubleshoot/fastgpt-docker-oneapi-port-mapping
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3792
source_type: GitHub issue
---

# 解决Docker部署FastGPT后OneAPI无端口映射无法访问的问题

## 现象
用Docker部署FastGPT后，可正常登录FastGPT，但OneAPI无法访问。执行docker ps命令，发现OneAPI未映射端口。修改过docker-compose.yml中的FE_DOMAIN参数与OPENAI_BASE_URL=http://host.docker.internal:3001/v1参数，尝试OneAPI的v0.6.6、v0.6.10版本均无效。

## 可能原因
需按实际环境确认，常见关联因素包括docker-compose.yml中未配置OneAPI的端口映射项，环境变量配置未正确生效，容器启动参数缺失等。

## 排查步骤
1. 执行docker ps命令，查看OneAPI容器的端口映射状态，确认是否存在端口映射配置。
2. 打开docker-compose.yml文件，检查OneAPI服务的配置项，确认是否添加了端口映射参数。
3. 检查docker-compose.yml中OneAPI服务的环境变量配置，核对FE_DOMAIN、OPENAI_BASE_URL等参数的格式与值。
4. 核对当前使用的OneAPI版本，确认版本是否符合部署要求。

## 解决与验证
在docker-compose.yml的OneAPI服务块中添加端口映射配置，例如`ports: - "3001:3001"`。保存配置后，执行docker compose up -d命令重启相关服务。执行docker ps命令，确认OneAPI容器已正确映射端口。访问OneAPI接口验证可正常访问，同时确认FastGPT的相关配置参数生效。

> 来源: [FastGPT GitHub issue #3792](https://github.com/labring/FastGPT/issues/3792)
