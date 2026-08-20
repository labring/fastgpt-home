---
title: FastGPT私有部署存储桶连接与上传问题排查
slug: /zh/deploy/fastgpt-s3-bucket-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/s3-issues
source_type: 官方文档
---

# FastGPT私有部署存储桶连接与上传问题排查

## 存储桶连接失败排查
FastGPT私有部署过程中，若日志出现ERR等级的"Failed to ensure external public/private bucket exists"报错，且无法正常连接对象存储，可优先查看错误栈是否包含"getaddrinfo ENOTFOUND"提示。该问题的核心诱因是`STORAGE_S3_FORCE_PATH_STYLE`配置错误，该参数用于控制对象存储客户端的访问路径样式，未正确开启时，客户端无法定位到目标存储服务，导致连接失败。

## 上传文件报错排查
当尝试上传对话文件或知识库文件时，若返回"SignatureDoesNotMatched"签名不一致的报错，绝大多数场景是Nginx反向代理的配置存在疏漏。Nginx在转发请求时，若未透传必要的请求头信息，会导致对象存储服务校验签名失败，无法完成文件上传操作。

## 可直接执行的配置修复步骤
针对存储桶连接失败问题，需在FastGPT的环境变量配置中添加`STORAGE_S3_FORCE_PATH_STYLE=true`，开启路径样式访问模式，确保客户端可以正确识别并连接目标存储服务。
针对上传文件报错问题，需在Nginx的反向代理配置块中添加`proxy_set_header Host $http_host;`，注意不要使用`$host`内置变量，因为该变量会自动移除请求中的端口信息，导致签名校验不匹配。完成配置后重启Nginx服务即可使修改生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/s3-issues)
