---
title: 解决FastGPT私有部署版Plugin容器启动失败的S3配置问题
slug: /zh/troubleshoot/fastgpt-plugin-s3-startup-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5718
source_type: GitHub issue
---

# 解决FastGPT私有部署版Plugin容器启动失败的S3配置问题

## 现象
用户在FastGPT私有部署V4.13.0版本中，按照更新日志要求为fastgpt和fastgpt-plugin添加S3相关环境变量，并为fastgpt-plugin配置了与fastgpt一致的MONGODB_URI、REDIS_URL后，fastgpt-plugin容器无法启动。容器日志显示：先依次检查`fastgpt-tool`、`fastgpt-plugin`存储桶，尝试连接MongoDB，随后尝试创建`fastgpt-plugin`存储桶失败，日志抛出`Failed to create bucket: fastgpt-plugin`错误，并伴随MongoDB连接缓冲超时的相关代码报错。

## 可能原因
结合配置操作与日志信息，可能的原因包括：
1. fastgpt-plugin的S3相关环境变量配置不完整或参数错误；
2. fastgpt-plugin的MONGODB_URI或REDIS_URL配置有误，导致MongoDB连接超时，无法完成存储桶创建流程；
3. 当前环境无权限在配置的S3服务中创建`fastgpt-plugin`存储桶。

## 排查步骤
1. 核对fastgpt-plugin的环境变量配置，确认已添加所有S3相关环境变量，且MONGODB_URI、REDIS_URL与fastgpt服务的配置完全一致。
2. 查看fastgpt-plugin容器的完整日志，提取`Failed to create bucket`和MongoDB连接相关的报错细节。
3. 验证当前环境与配置的S3服务、MongoDB、Redis的连通性，确认服务可正常访问。
4. 检查S3服务的权限配置，确认当前账号拥有创建存储桶的权限。

## 解决与验证
首先补全fastgpt-plugin的S3环境变量配置，确保参数与fastgpt服务的S3配置完全匹配。随后修正MONGODB_URI或REDIS_URL的配置错误，确保fastgpt-plugin可以正常连接到MongoDB和Redis服务。重新启动fastgpt-plugin容器后，查看日志是否不再出现`Failed to create bucket: fastgpt-plugin`和MongoDB连接超时的报错。最后确认S3服务中成功创建`fastgpt-plugin`存储桶，且plugin服务运行正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5718)
