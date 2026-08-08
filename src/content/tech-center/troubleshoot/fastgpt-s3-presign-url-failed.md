---
title: 解决FastGPT知识库上传文件时预签名URL创建失败问题
slug: /zh/troubleshoot/fastgpt-s3-presign-url-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6181
source_type: GitHub issue
---

# 解决FastGPT知识库上传文件时预签名URL创建失败问题

## 现象
使用FastGPT私有部署v4.14.3版本时，用户在知识库中上传文件触发报错。日志显示核心错误为`Failed to create post presigned url`，具体错误堆栈为`AggregateError [ECONNREFUSED]`，对应异常接口为`/api/core/dataset/presignDatasetFilePostUrl`，同时存在`System unexpected error: /api/core/dataset/presignDatasetFilePostUrl`的系统错误提示。日志中同时显示`S3 init success: fastgpt-private`，但上传流程无法正常生成预签名URL。用户确认宿主机的`http://localhost:9000`可以正常打开并登录S3服务。

## 可能原因
1.  FastGPT容器内部无法通过配置的`S3_ENDPOINT`和`S3_PORT`连接到S3服务，触发`ECONNREFUSED`连接被拒绝错误；
2.  配置的`S3_EXTERNAL_BASE_URL`未适配容器网络环境，容器内无法通过该地址访问S3服务；
3.  FastGPT容器与S3服务未处于同一Docker网络，导致容器内无法解析或连接到S3服务地址。

## 排查步骤
1.  查看FastGPT容器的运行日志，确认是否存在`Failed to create post presigned url`、`ECONNREFUSED`报错，以及对应接口`/api/core/dataset/presignDatasetFilePostUrl`的异常信息。
2.  核对Docker Compose配置中的S3相关参数：确认`S3_ENDPOINT`、`S3_PORT`、`S3_ACCESS_KEY`、`S3_SECRET_KEY`的配置与实际S3服务一致，容器内网络需使用可解析的服务名或内部地址，而非宿主机的`localhost`。
3.  进入FastGPT容器内部，执行`telnet ${S3_ENDPOINT} ${S3_PORT}`或`curl http://${S3_ENDPOINT}:${S3_PORT}`命令，验证容器是否可以正常连接到S3服务。
4.  检查FastGPT容器与S3服务是否处于同一Docker网络，若不在同一网络，需调整容器配置或加入同一网络。
5.  确认`S3_EXTERNAL_BASE_URL`的配置是否符合实际访问场景，容器内访问S3服务需使用内部网络地址，而非宿主机的`localhost`。

## 解决与验证
根据排查结果调整对应配置：若为容器网络连接问题，将`S3_ENDPOINT`修改为可被FastGPT容器解析的S3服务地址；若为`S3_EXTERNAL_BASE_URL`配置问题，需按实际环境调整为正确的访问地址。修改配置后重启FastGPT服务，再次尝试上传知识库文件，验证日志中不再出现`Failed to create post presigned url`报错，且文件可以正常上传并进入处理流程。

> 来源：https://github.com/labring/FastGPT/issues/6181
