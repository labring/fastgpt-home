---
title: FastGPT私有部署存储桶连接与上传问题排查方法
slug: /zh/deploy/s3-storage-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/s3-issues
source_type: 官方文档
---

# FastGPT私有部署存储桶连接与上传问题排查方法

## 存储桶常见故障概述
私有部署FastGPT时，对象存储用于存储对话文件、知识库文件等附件内容，一旦出现存储桶相关故障，会影响这些核心功能的使用。本文档用于排查该场景下的两类高频存储桶问题：存储桶连接失败、文件上传报错。当系统日志出现ERR等级的`Failed to ensure external public/private bucket exists`时，会直接导致无法连接对象存储服务，需优先排查该类问题。若错误栈显示`error: Error: getaddrinfo ENOTFOUND`，则大概率是`STORAGE_S3_FORCE_PATH_STYLE`配置项出现错误。

## 存储桶连接失败的修复步骤
当遇到存储桶连接失败且错误栈包含`getaddrinfo ENOTFOUND`相关内容时，核心解决方案是将`STORAGE_S3_FORCE_PATH_STYLE`选项开启为`true`。该配置项用于控制对象存储客户端的访问路径风格，若未正确开启，客户端将无法正确定位目标存储服务。需注意，该配置的启用需结合实际使用的存储服务规则调整，并非所有场景都需要开启该选项。

## 文件上传报错的配置修复
上传对话文件或知识库文件时，若出现`SignatureDoesNotMatched`签名不一致的报错，大部分场景由Nginx反向代理的配置错误导致。Nginx在转发请求时未透传必要的请求头（如Headers、Host），会引发签名校验失败。具体修复步骤为：在Nginx的转发配置中添加`proxy_set_header Host $http_host`，请勿使用`$host`内置变量，因为`$host`会自动移除请求中的端口信息，导致签名校验无法通过。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/s3-issues)
