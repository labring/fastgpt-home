---
title: FastGPT私有部署安装插件时S3存储桶连接失败排查与解决
slug: /zh/troubleshoot/fastgpt-plugin-s3-connection-refused
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6262
source_type: GitHub issue
---

# FastGPT私有部署安装插件时S3存储桶连接失败排查与解决

## 现象
FastGPT私有部署4.14.5版本中，所有容器可正常启动，但安装插件时fastgpt-plugin容器出现报错，具体日志为：
```
[Info] 2026-01-13 21:57:52: Failed to ensure bucket "fastgpt-public" exists: {"error":{"code":"ECONNREFUSED","$metadata":{"attempts":3,"totalRetryDelay":110}}}
[Info] 2026-01-13 21:57:52: Failed to ensure bucket "fastgpt-private" exists: {"error":{"code":"ECONNREFUSED","$metadata":{"attempts":3,"totalRetryDelay":244}}}
```
同时MongoDB与Redis连接正常，且已配置S3_EXTERNAL_BASE_URL为http://IPV4:9000并确认可公网访问，但问题未解决。

## 可能原因
1. 插件容器无法解析S3_ENDPOINT配置的域名/地址，导致连接被拒绝；
2. S3_ENDPOINT配置的地址与存储服务的实际内部/外部访问地址不匹配；
3. 容器网络策略限制了插件容器访问存储服务的9000端口；
4. 存储服务的访问密钥（S3_ACCESS_KEY、S3_SECRET_KEY）配置错误（需按实际环境确认）；
5. 配置的存储桶名称不符合存储服务的命名要求（需按实际环境确认）。

## 排查步骤
1. 进入fastgpt-plugin容器内部，执行`curl http://IPV4:9000`命令，测试容器内是否可正常访问存储服务地址；
2. 查看配置文件中的S3_ENDPOINT参数，确认其值是否为存储服务可被插件容器访问的正确地址；
3. 检查Docker网络配置，确认插件容器与存储服务容器是否在同一网络，或是否开放了9000端口的访问权限；
4. 核对配置文件中的S3_ACCESS_KEY与S3_SECRET_KEY是否与存储服务的密钥一致；
5. 确认S3_PUBLIC_BUCKET、S3_PRIVATE_BUCKET的名称符合存储服务的命名规则。

## 解决与验证
若排查发现S3_ENDPOINT配置为容器名（如fastgpt-minio）但插件容器与存储服务容器不在同一网络，可将S3_ENDPOINT修改为宿主机IP:端口（与S3_EXTERNAL_BASE_URL保持一致），或调整容器网络使两者处于同一网络中。修改配置后重启fastgpt-plugin容器，重新尝试安装插件，查看容器日志中是否仍出现ECONNREFUSED相关报错。若日志中无存储桶连接失败的报错，则问题解决。

> 来源：[FastGPT GitHub Issue #6262](https://github.com/labring/FastGPT/issues/6262)
