---
title: 解决FastGPT V4.13.2升级后插件消失与显示异常的问题
slug: /zh/troubleshoot/fastgpt-plugin-display-error-v4132
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5838
source_type: GitHub issue
---

# 解决FastGPT V4.13.2升级后插件消失与显示异常的问题

## 现象
升级至FastGPT V4.13.2私有部署版本后，插件页面仅显示一个插件，其余插件消失。同时fastgpt-plugin的启动日志显示，其请求Minio的地址为127.0.0.1:9000，但实际配置的Minio相关环境变量为S3_CUSTOM_ENDPOINT=http://192.168.31.91:9000、S3_ENDPOINT=192.168.31.91，且已配置S3_PUBLIC_BUCKET=fastgpt-public、S3_PRIVATE_BUCKET=fastgpt-private。

## 可能原因
fastgpt-plugin未正确读取配置的S3相关环境变量，默认使用了127.0.0.1:9000作为Minio请求地址，导致无法正常连接外部Minio服务，进而无法加载全部插件。

## 排查步骤
1. 检查fastgpt与fastgpt-plugin容器的环境变量配置，确认已添加S3_CUSTOM_ENDPOINT、S3_ENDPOINT、S3_PUBLIC_BUCKET、S3_PRIVATE_BUCKET参数。
2. 查看fastgpt-plugin的启动日志，确认Minio请求地址是否与配置的S3地址一致。
3. 验证容器网络是否可以正常访问配置的Minio服务地址。

## 解决与验证
确保fastgpt-plugin容器加载了与fastgpt服务一致的S3相关环境变量，重启fastgpt-plugin容器使配置生效。验证操作如下：
1. 重启fastgpt-plugin容器，确认环境变量已正确加载。
2. 查看fastgpt-plugin的启动日志，确认Minio请求地址变为配置的192.168.31.91:9000。
3. 刷新插件页面，确认所有插件正常显示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5838)
