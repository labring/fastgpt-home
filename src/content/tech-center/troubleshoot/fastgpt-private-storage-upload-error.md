---
title: 解决FastGPT私有部署4.14.5版本存储配置上传失败问题
slug: /zh/troubleshoot/fastgpt-private-storage-upload-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6229
source_type: GitHub issue
---

# 解决FastGPT私有部署4.14.5版本存储配置上传失败问题

## 现象
用户升级FastGPT私有部署4.14.5版本后，在deploy/docker/cn/docker-compose.pg.yml中配置STORAGE_S3_ENDPOINT为容器内部地址http://fastgpt-minio:9000，前端对话窗口无法上传文件。浏览器网络请求显示访问目标为http://fastgpt-minio:9000，无法解析该地址；同时配置了STORAGE_EXTERNAL_ENDPOINT为宿主机地址http://192.168.1.1:9000，可正常访问Minio服务。

## 可能原因
容器内部的域名（如fastgpt-minio）仅在Docker内部网络中有效，浏览器作为外部客户端无法直接解析该域名。用户将STORAGE_S3_ENDPOINT配置为内部地址，但该地址会被前端或外部客户端用于访问存储服务，导致无法正常解析请求。

## 排查步骤
1. 确认当前使用的是FastGPT 4.14.5私有部署版本，查看deploy/docker/cn/docker-compose.pg.yml中的存储相关配置项。
2. 检查STORAGE_S3_ENDPOINT和STORAGE_EXTERNAL_ENDPOINT的配置值，明确两者的使用场景差异。
3. 通过浏览器开发者工具查看上传文件时的网络请求目标地址，确认是否为容器内部域名。
4. 验证容器内部域名是否仅在Docker网络内可用，外部环境无法直接解析。

## 解决与验证
解决方法：将STORAGE_S3_ENDPOINT配置为Docker网络内部的存储服务地址（供后端服务内部调用），将STORAGE_EXTERNAL_ENDPOINT配置为外部可访问的宿主机或公网地址（供前端或外部客户端访问存储资源）。
验证步骤：
1. 修改docker-compose.yml文件，确保两个存储配置项符合上述要求。
2. 重启FastGPT服务及关联的存储服务。
3. 进入前端对话窗口尝试上传文件，确认上传流程正常。
4. 通过浏览器开发者工具查看网络请求地址，确认请求地址为STORAGE_EXTERNAL_ENDPOINT配置的外部可访问地址，且可正常访问。

> 来源：[FastGPT GitHub Issue #6229](https://github.com/labring/FastGPT/issues/6229)
