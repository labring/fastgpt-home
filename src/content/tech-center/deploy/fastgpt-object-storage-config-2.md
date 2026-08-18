---
title: 配置FastGPT自部署的各厂商对象存储连接与访问参数
slug: /zh/deploy/fastgpt-object-storage-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/object-storage
source_type: 官方文档
---

# 配置FastGPT自部署的各厂商对象存储连接与访问参数

## 配置前提与基础规则
FastGPT支持MinIO、AWS S3、阿里云OSS、腾讯云COS和Cloudflare R2五种对象存储服务。自部署前，建议提前创建STORAGE_PUBLIC_BUCKET和STORAGE_PRIVATE_BUCKET两个存储桶，并确保FastGPT使用的Access Key对两个桶均有读写权限。文件上传固定通过FastGPT后端代理，下载地址默认使用FastGPT短链，平台提供两种下载模式：short-proxy模式下，FastGPT校验短链并代理文件流，无需配置公网对象存储地址；short-redirect模式下，FastGPT校验短链后302跳转至短时效对象存储/CDN地址，文件流量不经过FastGPT，使用该模式时必须配置STORAGE_EXTERNAL_ENDPOINT，且该变量不会自动改变默认下载模式。若配置STORAGE_S3_CDN_ENDPOINT，必须同时配置STORAGE_EXTERNAL_ENDPOINT，且上传仍通过FastGPT后端代理，不会使用CDN。

## 各厂商配置要点
不同厂商的配置参数存在差异：MinIO与AWS S3使用同一套S3兼容变量，需配置STORAGE_S3_ENDPOINT（内网连接地址，可使用容器ID连接）、STORAGE_EXTERNAL_ENDPOINT（服务器和客户端均可访问的公网地址，请勿使用127.0.0.1或localhost等本地回环地址）；阿里云OSS需配置STORAGE_OSS_ENDPOINT、STORAGE_OSS_CNAME、STORAGE_OSS_SECURE等参数，公共存储桶需设置为公开读权限，私有存储桶保持私有；腾讯云COS需配置STORAGE_COS_PROTOCOL（可选https:或http:，自定义域名未上传证书时请勿使用https:）、STORAGE_COS_USE_ACCELERATE（可选，是否启用全球加速域名）等参数。部分参数为可选，如STORAGE_S3_MAX_RETRIES默认值为3次，可按需调整请求最大尝试次数。

## 快速配置示例
以MinIO为例的完整配置步骤如下：
1. 提前创建名为fastgpt-public和fastgpt-private的两个存储桶；
2. 配置以下环境变量：
```
STORAGE_VENDOR = minio
STORAGE_REGION = us-east-1
STORAGE_ACCESS_KEY_ID = your_access_key
STORAGE_SECRET_ACCESS_KEY = your_secret_key
STORAGE_PUBLIC_BUCKET = fastgpt-public
STORAGE_PRIVATE_BUCKET = fastgpt-private
STORAGE_S3_ENDPOINT = http://127.0.0.1:9000
STORAGE_S3_FORCE_PATH_STYLE = true
STORAGE_S3_MAX_RETRIES = 3
```
如果使用Sealos的对象存储服务，只需将STORAGE_VENDOR填写为minio即可。若需使用AWS S3，只需修改STORAGE_VENDOR为aws-s3，并调整STORAGE_S3_ENDPOINT为对应区域的S3地址即可。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/object-storage)
