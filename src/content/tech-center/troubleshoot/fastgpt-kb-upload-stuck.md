---
title: FastGPT私有部署新建知识库上传文件进度卡住的排查与解决
slug: /zh/troubleshoot/fastgpt-kb-upload-stuck
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6319
source_type: GitHub issue
---

# FastGPT私有部署新建知识库上传文件进度卡住的排查与解决

## 现象
用户使用FastGPT v4.14.5.1私有部署版本，新建知识库上传文件时进度卡住。用户反馈插件日志运行正常，容器端口已按要求开放，同时提供了部分docker-compose配置文件，其中包含MinIO存储与向量数据库的相关配置。

## 可能原因
结合给出的配置与现象，可能的原因包括：1. 存储服务（如MinIO）的配置参数错误，或容器内外网络无法访问存储服务；2. 向量数据库的连接配置不完整或参数错误，导致服务无法正常连接；3. docker-compose配置中MongoDB、Redis的连接配置存在问题；4. 容器间网络策略限制，导致FastGPT服务无法与存储、向量数据库通信。

## 排查步骤
1.  核对docker-compose配置文件中的存储相关参数：确认`STORAGE_EXTERNAL_ENDPOINT`为服务器和客户端均可访问的非本地回环地址，`STORAGE_S3_ENDPOINT`、`STORAGE_ACCESS_KEY_ID`、`STORAGE_SECRET_ACCESS_KEY`等参数与实际存储服务配置一致。
2.  检查向量数据库配置：确认`PG_URL`中的用户名、密码、数据库地址、端口等参数正确，且向量数据库服务处于正常运行状态。
3.  进入FastGPT容器内部，执行网络连通性测试：尝试ping存储服务地址与向量数据库地址，确认网络可达。
4.  查看FastGPT核心服务的运行日志，定位上传卡住的具体报错信息。
5.  核对MongoDB与Redis的连接配置，确认`MONGODB_URI`、`REDIS_URL`参数正确，且对应服务正常运行。

## 解决与验证
根据排查结果修复对应问题：例如修正存储服务的配置参数、修复向量数据库连接信息、调整容器网络策略恢复连通性等。若docker-compose配置中的向量数据库部分未完成，需补充完整相关环境变量与持久化配置。修复完成后，重新上传文件至知识库，验证上传进度可正常完成，且上传的文件可在知识库中正常使用。

> 来源：https://github.com/labring/FastGPT/issues/6319
