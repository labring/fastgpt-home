---
title: FastGPT 4.14.5版本存储桶环境变量更新配置方法
slug: /zh/reference/fastgpt-4145-storage-env-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4145
source_type: 官方文档小节
---

# FastGPT 4.14.5版本存储桶环境变量更新配置方法

## 结论
FastGPT 4.14.5版本新增了原生OSS和COS存储支持，需调整存储桶相关环境变量的命名格式。需移除旧版以S3为前缀的环境变量，替换为新增的STORAGE_*系列标准变量。

## 具体怎么做
1. 移除所有旧版S3开头的环境变量，包括S3_EXTERNAL_BASE_URL、S3_ENDPOINT、S3_PORT、S3_USE_SSL、S3_ACCESS_KEY、S3_SECRET_KEY、S3_PUBLIC_BUCKET、S3_PRIVATE_BUCKET。
2. 配置新增的STORAGE_*系列环境变量，参数示例如下：
```
STORAGE_VENDOR=minio
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY_ID=minioadmin
STORAGE_SECRET_ACCESS_KEY=minioadmin
STORAGE_PUBLIC_BUCKET=fastgpt-public
STORAGE_PRIVATE_BUCKET=fastgpt-private
STORAGE_EXTERNAL_ENDPOINT=http://192.168.0.2:9000
STORAGE_S3_ENDPOINT=http://fastgpt-minio:9000
```
其他存储厂商的配置可参考对象存储配置问题。

## 注意事项
配置STORAGE_EXTERNAL_ENDPOINT时，需使用服务器和客户端均可访问的存储桶地址，不得使用127.0.0.1或localhost等本地回环地址。STORAGE_EXTERNAL_ENDPOINT与STORAGE_S3_ENDPOINT需遵循协议://域名(IP):端口的格式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4145)
