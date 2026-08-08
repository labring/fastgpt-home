---
title: 配置FastGPT连接各厂商对象存储的环境变量参数
slug: /zh/deploy/fastgpt-object-storage-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/object-storage
source_type: 官方文档
---

# 配置FastGPT连接各厂商对象存储的环境变量参数

FastGPT 支持 MinIO、AWS S3、Alibaba Cloud OSS、Tencent Cloud COS 和 Cloudflare R2 五种对象存储服务。文件上传默认通过 FastGPT 后端代理，下载支持两种模式：`short-proxy`（默认模式，FastGPT 校验短链并代理文件流，无需配置公网对象存储地址）和`short-redirect`（FastGPT 校验短链后 302 跳转至短时效对象存储地址，文件流量不经过 FastGPT）。使用`short-redirect`模式时，自部署 MinIO 必须配置`STORAGE_EXTERNAL_ENDPOINT`。部署前建议提前创建`STORAGE_PUBLIC_BUCKET`和`STORAGE_PRIVATE_BUCKET`，并确保 FastGPT 使用的 Access Key 对两个存储桶均有读写权限。

不同厂商的对象存储需配置专属环境变量：MinIO 可使用兼容 S3 协议的配置项，需配置内网连接地址`STORAGE_S3_ENDPOINT`、服务器和客户端均可访问的外部地址`STORAGE_EXTERNAL_ENDPOINT`，可选配置 CDN 地址`STORAGE_S3_CDN_ENDPOINT`、路径路由风格参数`STORAGE_S3_FORCE_PATH_STYLE`（MinIO 场景固定为`true`）、请求最大重试次数`STORAGE_S3_MAX_RETRIES`（默认 3 次）。AWS S3 与 MinIO 使用同一套 S3 兼容变量。阿里云 OSS 需配置`STORAGE_OSS_ENDPOINT`、`STORAGE_OSS_CNAME`、`STORAGE_OSS_SECURE`等参数，公共存储桶需设置为公开读权限。腾讯云 COS 需配置协议类型`STORAGE_COS_PROTOCOL`，可选配置全球加速参数`STORAGE_COS_USE_ACCELERATE`。

### 快速配置示例（以 MinIO 为例）
1.  提前创建名为`fastgpt-public`和`fastgpt-private`的两个存储桶。
2.  配置以下环境变量：
    ```env
    STORAGE_VENDOR = minio
    STORAGE_REGION = us-east-1
    STORAGE_ACCESS_KEY_ID = your_access_key
    STORAGE_SECRET_ACCESS_KEY = your_secret_key
    STORAGE_PUBLIC_BUCKET = fastgpt-public
    STORAGE_PRIVATE_BUCKET = fastgpt-private
    STORAGE_S3_ENDPOINT = http://fastgpt-minio:9000
    STORAGE_S3_FORCE_PATH_STYLE = true
    STORAGE_S3_MAX_RETRIES = 3
    ```
    注意：`STORAGE_EXTERNAL_ENDPOINT`需填写服务器和客户端均可访问的宿主机 IP 或域名，请勿使用`127.0.0.1`或`localhost`等本地回环地址。若使用 Sealos 的对象存储服务，需将`STORAGE_VENDOR`设置为`minio`。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/object-storage
