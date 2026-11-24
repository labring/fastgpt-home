---
title: 配置FastGPT应用与管理端共享的对象存储环境变量
slug: /zh/deploy/fastgpt-app-admin-object-storage-config
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# 配置FastGPT应用与管理端共享的对象存储环境变量

## 对象存储环境变量总览
这部分内容用于配置FastGPT应用与管理端共享的对象存储相关环境变量，统一管理文件存储的基础参数。通用基础参数包括：STORAGE_VENDOR，定义对象存储类型，可选minio、aws-s3、r2、cos、oss，默认值为minio；STORAGE_PUBLIC_BUCKET为公开文件存储桶，默认值为fastgpt-public；STORAGE_PRIVATE_BUCKET为私有文件存储桶，默认值为fastgpt-private；STORAGE_REGION为对象存储区域，默认值为us-east-1；STORAGE_EXTERNAL_ENDPOINT为外部可访问的对象存储地址，用于浏览器或外部服务访问，默认值为空。

## 快速配置步骤
1.  确定对象存储类型，将STORAGE_VENDOR设置为对应的值。
2.  配置访问凭证：设置STORAGE_ACCESS_KEY_ID和STORAGE_SECRET_ACCESS_KEY，默认值为minioadmin和minioadmin，生产环境需替换为实际凭证。
3.  配置存储端点：根据所选存储类型设置对应端点参数。例如使用MinIO时，默认STORAGE_S3_ENDPOINT为http://localhost:9000，若部署在其他地址需修改该参数。
4.  调整存储桶名称：若无需使用默认值，可修改STORAGE_PUBLIC_BUCKET和STORAGE_PRIVATE_BUCKET为自定义桶名。
5.  配置下载模式：设置STORAGE_DOWNLOAD_URL_MODE，可选short-proxy或short-redirect，默认值为short-proxy。若使用short-redirect模式，可通过STORAGE_DOWNLOAD_REDIRECT_TTL_SECONDS调整临时下载地址的有效时间，单位为秒，默认值为300。
6.  补充特定存储类型配置：根据所选存储类型，配置对应专属参数。例如当STORAGE_VENDOR设置为r2时，需必填STORAGE_R2_PUBLIC_ENDPOINT；配置S3/MinIO强制路径访问时，可设置STORAGE_S3_FORCE_PATH_STYLE为true。

## 高级配置补充
部分扩展参数可根据需求配置：STORAGE_S3_CDN_ENDPOINT为临时下载地址使用的CDN地址，配置时需同时配置STORAGE_EXTERNAL_ENDPOINT；STORAGE_S3_MAX_RETRIES为S3客户端的最大重试次数，默认值为3；STORAGE_PUBLIC_ACCESS_EXTRA_SUB_PATH为公开文件访问路径的额外子路径，默认值为空。针对不同存储类型，还可配置专属参数，例如配置协议、加速域名、CNAME、内网访问等相关参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
